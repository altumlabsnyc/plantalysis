import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "./Constants";
// import { v4 as uuidv4 } from "uuid";
import {
  UserType,
  userData,
  govUser,
  labUser,
  eduUser,
  prodUser,
  LabOrder,
  Brand,
  Batch,
  Analysis,
  ForApproval,
  labOrderInputs,
  MoleculePredict,
} from "./UserTypes";
import { Database } from "../types/supabase";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

import { v4 as uuidv4 } from "uuid";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

async function getUserType(): Promise<UserType | null> {
  const user = await supabase.auth.getUser();
  const id: string = user.data.user?.id ? user.data.user.id : "";
  if (id == "") {
    throw new Error("User ID cannot be undefined");
  }
  const response = await supabase.from("user").select("user_type").eq("id", id);

  const data = response.data;
  if (data && data.length > 0) {
    const userType = data[0].user_type;
    if (userType != null) {
      return userType;
    }
  }
  throw new Error("No user type found");
}

async function insertUser(userData: userData): Promise<void> {
  const { data, error } = await supabase.from("user").insert([userData]);
  if (error) {
  }
}

export async function getUserInfo(): Promise<userData> {
  const user = await supabase.auth.getUser();
  const id: string = user.data.user?.id ? user.data.user.id : "";
  if (id == "") {
    throw new Error("User ID cannot be undefined");
  }
  const response = await supabase.from("user").select("*").eq("id", id);

  const data = response.data;
  if (data && data.length > 0) {
    const userInfo = data[0];
    if (userInfo != null) {
      return userInfo;
    }
  }
  throw new Error("No user type found");
}

export async function handlePlaceLabOrder(
  labOrder: LabOrder,
  brandName: string | null
): Promise<void> {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (userId) {
    // labOrder.lab_user_id = userId;
    const orderId = uuidv4();
    labOrder.id = orderId;

    if (brandName == null) {
      throw new Error("Please provide a brand name");
    }

    const brandId = await getBrandId(brandName, userId);
    const batchId = await createNewBatch(brandId);
    labOrder.batch_id = batchId;
    const { data, error } = await supabase.from("lab_order").insert(labOrder);
  }

  async function getBrandId(
    brandName: string,
    prodId: string
  ): Promise<string> {
    const { data, error } = await supabase
      .from("brand")
      .select("id")
      .eq("name", brandName)
      .single();
    if (data) {
      return data.id;
    } else {
      const newBrandId = uuidv4();
      const newBrand: Brand = {
        id: newBrandId,
        name: brandName,
        producer_user_id: prodId,
        image_path: null,
        serving_size: null,
      };
      return newBrandId;
    }
  }
}

async function createNewBatch(brandId: string): Promise<string> {
  const batchId = uuidv4();
  const newBatch: Batch = {
    brand_id: brandId,
    facility_id: null, //TODO what should this be?
    weight: null,
    id: batchId,
  };
  await supabase.from("batch").insert(newBatch);
  return batchId;
}

export async function fetchUnclaimedOrders(): Promise<Array<LabOrder>> {
  const allOrders = (await supabase.from("lab_order").select("*")).data;
  if (allOrders) {
    const unclaimedOrders = allOrders.filter(
      (order) => order.lab_user_id == null
    );
    return unclaimedOrders;
  }
  return [];
}

export async function fetchClaimedOrders(): Promise<Array<LabOrder>> {
  const labUserId = (await supabase.auth.getUser()).data.user?.id;
  const allOrders = (
    await supabase.from("lab_order").select("*").eq("lab_user_id", labUserId)
  ).data;
  if (allOrders) {
    return allOrders;
  }
  return [];
}

export async function fetchAnalyzedOrders(): Promise<Array<ForApproval>> {
  const forApproval: Array<ForApproval> = [];
  const allAnalyzed = await (
    await supabase.from("analysis").select("*").eq("regulator_approved", false)
  ).data;
  if (allAnalyzed) {
    for (const analysis of allAnalyzed) {
      const analysisId = analysis.id;
      const labOrderId = analysis.lab_order_id;
      const correspondingOrder = await supabase
        .from("lab_order")
        .select("*")
        .eq("id", labOrderId)
        .single();
      const correspondingMolecules = await supabase
        .from("molecule_prediction")
        .select("*")
        .eq("analysis_id", analysisId);

      if (correspondingMolecules && correspondingOrder) {
        // const labName = (
        //   await supabase
        //     .from("lab_user")
        //     .select("legal_name")
        //     .eq("id", correspondingOrder.data?.lab_user_id)
        //     .single()
        // ).data; // uncomment once RLS is set
        const labName = correspondingOrder.data
          ? correspondingOrder.data.lab_user_id
          : "temp lab name";

        const { data: brandId } = await supabase
          .from("batch")
          .select("brand_id")
          .eq("id", correspondingOrder.data?.batch_id)
          .single();
        const brandNameData = await supabase
          .from("brand")
          .select("name")
          .eq("id", brandId?.brand_id)
          .single();
        const brandName = brandNameData.data;
        if (brandName) {
          const newApproved: ForApproval = {
            lab_name: labName,
            brand_name: brandName.name,
            pass: true,
            molecules: correspondingMolecules.data,
            sku: "qr.plantalysis.com/" + labOrderId,
            analysis_id: analysisId,
          };
          forApproval.push(newApproved);
        }
      }
    }
  }
  return forApproval;
}

export async function claimNewOrders(orderIds: Array<string>): Promise<void> {
  const userId = (await supabase.auth.getUser()).data.user?.id;

  if (userId) {
    for (const orderId of orderIds) {
      const { data, error } = await supabase
        .from("lab_order")
        .update({ lab_user_id: userId })
        .eq("id", orderId)
        .select();
      console.log({ data: data, error: error });
    }
  }
}

export async function approveOrders(analysisIds: Array<string>): Promise<void> {
  for (const analysisId of analysisIds) {
    await supabase
      .from("analysis")
      .update({ regulator_approved: true })
      .eq("id", analysisId);
  }
}

export async function fetchProducerOrders(): Promise<Array<LabOrder>> {
  const allLabOrders: Array<LabOrder> = [];
  const userId = (await supabase.auth.getUser()).data.user?.id;

  const brandIds = (
    await supabase.from("brand").select("id").eq("producer_user_id", userId)
  ).data;
  let allBatchIds: Array<string> = [];
  if (brandIds) {
    for (const brandId of brandIds) {
      // const batchIdsOfBrand = (
      //   await supabase.from("batch").select("id").eq("brand_id", brandId)
      // ).data;
      const response = await supabase.from("batch").select("*");
      if (response.data) {
        for (const batch of response.data) {
          if (batch.brand_id == brandId.id) {
            allBatchIds.push(batch.id);
          }
        }
      }
    }

    for (const batchId of allBatchIds) {
      const labOrders: LabOrder[] | null = (
        await supabase.from("lab_order").select("*").eq("batch_id", batchId)
      ).data;
      if (labOrders && labOrders[0]) {
        allLabOrders.push(labOrders[0]);
      }
    }
  }
  return allLabOrders;
}

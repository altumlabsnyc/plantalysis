import { Batch, Facility, LabOrder } from '@/types/supabaseAlias'
import { supabase } from '@/utils/supabase'
import { User } from '@supabase/supabase-js'
import toast from 'react-hot-toast'
import useSWR from 'swr'

export enum LabOrdersRequested {
  claimedByALab = 'claimed',
  unClaimedByLab = 'unclaimed',
  ofAProducer = 'ofProducer',
  allOrders = 'all',
}

/**
 * SWR hook that fetches all lab orders from Supabase. Returns all lab order details.
 *
 * @param user supabase user object
 * @returns {data, error, isLoading} data is null if user is null, otherwise it is
 * an object with userDetails and roleDetails. error is the error object from SWR.
 */
export default function useLabOrders(
  user: User | null,
  requested: LabOrdersRequested,
) {
  const fetcher = async () => {
    const { data: data, error: error } = await supabase
      .from('lab_order')
      .select('*')

    if (error) {
      console.log(error)
      toast.error('Error fetching orders. Please contact Altum Labs Support.')
      throw new Error('error retrieving lab_order data')
    }

    if (!data) {
      throw new Error('no data returned by fetch to lab_orders')
    }

    return data
  }

  const { data, error, isLoading } = useSWR(
    user ? `/api/lab_order/${requested}/${user.id}` : null,
    fetcher,
  )
  let fetchingFunction = (
    allOrders: LabOrder[] | undefined,
    user: User | null,
  ): LabOrder[] => {
    return allOrders ? allOrders : []
  }

  switch (requested) {
    case LabOrdersRequested.allOrders:
      fetchingFunction = getAllOrders
      break
    case LabOrdersRequested.claimedByALab:
      fetchingFunction = getUserClaimedOrders
      break
    case LabOrdersRequested.unClaimedByLab:
      fetchingFunction = getUnClaimedOrders
      break
    case LabOrdersRequested.ofAProducer:
      fetchingFunction = getProducerOrders
      break
    default:
      throw new Error('Please provide a valid type of fetch for lab orders')
  }

  const filteredData = fetchingFunction(data, user)

  return {
    data: filteredData as LabOrder[] | null,
    error,
    isLoading,
  }
}

export type LabRequest = LabOrder & {
  batch: Batch
  facility: Facility | null
}

//HELPERS FOR LAB_ORDERS FETCHING
export function useLabOrderRequests(user: User | null) {
  const fetcher = async () => {
    let ordersData = null

    const { data, error: ordersError } = await supabase
      .from('lab_order')
      .select(
        `
        *,
        batch (
          *,
          producer_facility ( * )
        )
        `,
      )
      .is('lab_user_id', null)

    if (data != null) {
      ordersData = data.map((order) => ({
        ...order,
        batch: order.batch,
        facility: order.batch?.producer_facility,
      })) as LabRequest[]
    }

    if (ordersError) {
      toast.error('Error fetching orders. Please contact Altum support.')
      console.log(ordersError)
    }

    if (!ordersData) {
      return null
    }

    // Return the combined data
    return ordersData
  }

  const { data, error, isLoading, mutate } = useSWR(
    user ? '/api/lab_orders/' : null,
    fetcher,
  )

  return {
    data: data as LabRequest[] | null,
    error,
    isLoading,
    mutate,
  }
}

/**
 * Fetches claimed orders by a specific lab user
 * @param allOrders : all lab_orders in file
 * @param user expects user.user_type to be "lab"
 *
 * @returns the list of the lab orders that belong to that specific user
 */

export function getUserClaimedOrders(
  allOrders: LabOrder[] | undefined,
  user: User | null,
): Array<LabOrder> {
  if (allOrders) {
    const claimedOrders = allOrders.filter((order) => {
      return order.lab_user_id === user?.id
    })
    return claimedOrders
  }
  return []
}

/**
 * Fetches unclaimed orders
 * @param allOrders : all lab_orders in file
 *
 * @returns the list of the lab orders that dont have an assigned lab user
 */
export function getUnClaimedOrders(
  allOrders: LabOrder[] | undefined,
  user: User | null,
): Array<LabOrder> {
  if (allOrders) {
    const unclaimedOrders = allOrders.filter((order) => {
      return order.lab_user_id === null
    })
    return unclaimedOrders
  }
  return []
}

export function getAllOrders(
  allOrders: LabOrder[] | undefined,
  user: User | null,
): Array<LabOrder> {
  return allOrders ? allOrders : []
}

export function getProducerOrders(
  allOrders: LabOrder[] | undefined,
  user: User | null,
): Array<LabOrder> {
  // todo: UPDATE THIS FUNCTION
  return allOrders ? allOrders : []
}

export interface ProducerLabOrderDetails {
  id: string
  order_time: string
  location: string | null
  lab_user_id: string | null
  analysis_id: string | null
  analysis_approved: boolean | null
}

export function useProducerPlacedOrders(user: User | null) {
  const fetcher = async () => {
    let ordersError: any,
      ordersData: Array<ProducerLabOrderDetails> | null | undefined

    const ordersFetchPromise = supabase
      .from('lab_order')
      .select(
        `
      *,
      batch!inner (
        *,
        producer_user_id,
        producer_facility ( *,
          address ( * )
        )
      )
      `,
      )
      .eq('batch.producer_user_id', user?.id)

      .then(({ data, error }) => {
        console.log('data', data)
        ordersData = data?.map((order) => {
          const orderData: ProducerLabOrderDetails = {
            id: order.id,
            lab_user_id: order.lab_user_id,
            order_time: order.order_time,
            location: order.batch?.producer_facility?.address?.line_1 || '',
            analysis_approved: null,
            analysis_id: null,
          }
          return orderData
        })

        ordersError = error
      })

    await ordersFetchPromise

    if (ordersError) {
      console.log(ordersError)
      toast.error('Error fetching orders. Please contact Altum Labs Support.')
    }

    if (!ordersData) {
      return null
    }

    // Return the combined data
    return ordersData
  }

  const { data, error, isLoading } = useSWR(
    user ? `/api/lab_orders/${user.id}` : null,
    fetcher,
  )

  return {
    data: data as ProducerLabOrderDetails[] | null,
    error,
    isLoading,
  }
}

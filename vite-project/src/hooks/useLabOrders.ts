import {
  Address,
  Batch,
  Facility,
  LabOrder,
  Test,
  TestRequirement,
} from '@/types/supabaseAlias'
import { supabase } from '@/utils/supabase'
import { User } from '@supabase/supabase-js'
import toast from 'react-hot-toast'
import useSWR from 'swr'



/**
 * type to represent the data of a lab order that labs need to see when they are claiming an order
 */
export type LabRequest = LabOrder & {
  batch: Batch
  producer_facility:
    | (Facility & {
        address: Address
      })
    | null
  tests: (Test & {
    test_requirements: TestRequirement[]
  })[]
}

/**
 * SWR hook to fetch all the lab orders that have not been claimed by a lab in the state of 
 * the lab user calling the function
 * 
 * @param user the lab user calling the function
 * @param state the state of the lab user calling the function
 * @returns an array of LabOrderRequests with all the orders in state that are yet to be claimed by a lab
 * @throws an error if the user calling the function is not a lab
 */
export function useUnclaimedLabOrderRequests(user: User | null, state?: string) {
  const fetcher = async () => {
    let ordersData = null

    const { data, error: ordersError } = await supabase
      .from('lab_order')
      .select(
        `
        *,
        batch!inner (
          *,
          producer_facility!inner ( *,
            address!inner ( * )
          )
        ),
        lab_order_on_test ( *,
          test ( *,
            test_requirements:test_requirement ( * ) 
          )
        )
        `,
      )
      .is('lab_facility_id', null)
      .eq('batch.producer_facility.address.state_code', state || 'NY')

    console.log(data)

    if (data != null) {
      ordersData = data.map((order) => ({
        ...order,
        batch: order.batch,
        producer_facility: order.batch?.producer_facility,
        tests: order.lab_order_on_test.map((test) => test.test),
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
    user ? `/api/lab_orders/${state}` : null,
    fetcher,
    {
      refreshInterval: 1000,
    },
  )

  return {
    data: data as LabRequest[] | null,
    error,
    isLoading,
    mutate,
  }
}

/**
 * Type representing the information a lab needs to see about an order once
 * they have claimed it
 */
export type ClaimedOrderTableRow = {
  id: string
  analysis_id: string | null
  facility_name: string | null
}


/**
 * SWR hook that fetches the lab orders as ClaimedOrderTableRow of
 * a given user
 * @param user the lab user calling the function
 * @returns an Array of ClaimedOrderTableRow
 */
export function useLabClaimedOrders(user: User | null) {
  const fetcher = async () => {
    let orderError: any
    const { data, error } = await supabase
      .from('lab_order')
      .select(
        `
    *,
    lab_facility!inner(
      name,
      lab_user_id
    )`,
      )
      .eq('lab_facility.lab_user_id', user?.id)

    if (data) {
      orderError = error
    } else {
      toast.error(
        'Unable to fetch lab orders of this lab. Please contact Altum Labs support',
      )
      throw new Error('Cannot fetch lab orders of this user')
    }

    if (orderError) {
      console.log(orderError)
      toast.error('error fetching user orders')
      throw new Error('error fetching user orders')
    }

    //@ts-ignore
    if (!data) {
      return null
    }

    const claimedOrders: ClaimedOrderTableRow[] = data.map(
      ({ analysis_id, id, lab_facility }) => ({
        analysis_id,
        id,
        facility_name: lab_facility?.name || null,
      }),
    )
    // Return the combined data
    return claimedOrders
  }

  const { data, error, isLoading } = useSWR(
    user ? `/api/lab_orders/${user.id}` : null,
    fetcher,
    {
      refreshInterval: 1000,
    },
  )

  return {
    data,
    error,
    isLoading,
  }
}


/**
 * Type representing the information about a lab order a producer should
 * see when they see their placed orders
 */
export interface ProducerLabOrderDetails {
  id: string
  order_time: string
  location: string | null
  lab_user_id: string | null
  analysis_id: string | null
  analysis_approved: boolean | null
}

/**
 * SWR hook that fetches all the lab orders placed by user who is a producer as a ProducerLabOrderDetails
 * @param user the producer user which calls the function
 * @returns an array of ProducerLabOrderDetails with all the placed orders of a producer
 * @throws an error if the user calling the function is not a producer
 */
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
            lab_user_id: order.lab_facility_id,
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

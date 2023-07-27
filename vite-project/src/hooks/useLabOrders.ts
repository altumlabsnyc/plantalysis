import { LabOrder } from '@/types/supabaseAlias'
import { ProducerRequestsTableData } from '@/components/OrderRequestsPanel'
import { supabase } from '@/utils/supabase'
import { User } from '@supabase/supabase-js'
import useSWR from 'swr'

//   const user = useUser();

/**
 * SWR hook that fetches all lab orders from Supabase. Returns all lab order details.
 *
 * @param user supabase user object
 * @returns {data, error, isLoading} data is null if user is null, otherwise it is
 * an object with userDetails and roleDetails. error is the error object from SWR.
 */
export default function useLabOrders(user: User | null) {
  const fetcher = async () => {
    let ordersError: any, ordersData: Array<LabOrder> | null

    const ordersFetchPromise = supabase
      .from('lab_order')
      .select('*')
      .then(({ data, error }) => {
        ordersData = data
        ordersError = error
      })

    await ordersFetchPromise

    if (ordersError) {
      console.log(ordersError)
    }

    // @ts-ignore
    if (!ordersData) {
      return null
    }

    // Return the combined data
    return ordersData
  }

  const { data, error, isLoading } = useSWR(
    user ? '/api/lab_orders/' : null,
    fetcher,
  )

  return {
    data: data as LabOrder[] | null,
    error,
    isLoading,
  }
}

//HELPERS FOR LAB_ORDERS FETCHING
export function useOrderRequestsPanelOrders(user: User|null) {
  const fetcher = async () => {
    let ordersError: any, ordersData: Array<ProducerRequestsTableData> | null | undefined

    const ordersFetchPromise = supabase
      .from('lab_order')
      .select(`
        id,
        lab_user_id,
        batch (
          facility (
            producer_user (
              common_name
            )
          )
        )
      `)
      .then(({ data, error }) => {
        console.log(data)
        ordersData = data?.map(({id, lab_user_id, batch}) => {
          return {
            id,
            lab_user_id,
            common_name: batch?.facility?.producer_user?.common_name
          }
        })
        ordersError = error
      })

    await ordersFetchPromise

    if (ordersError) {
      console.log(ordersError)
    }

    // @ts-ignore
    if (!ordersData) {
      return null
    }

    // Return the combined data
    return ordersData
  }

  const { data, error, isLoading } = useSWR(
    user ? '/api/lab_orders/' : null,
    fetcher,
  )

  return {
    data: data as LabOrder[] | null,
    error,
    isLoading,
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
  allOrders: LabOrder[],
  user: User,
): Array<LabOrder> {
  console.log('llega aca')
  const claimedOrders = allOrders.filter((order) => {
    order.lab_user_id == user.id
  })
  return claimedOrders
}

/**
 * Fetches unclaimed orders
 * @param allOrders : all lab_orders in file
 *
 * @returns the list of the lab orders that dont have an assigned lab user
 */
export function getUserUnClaimedOrders(
  allOrders: LabOrder[],
  user: User,
): Array<LabOrder> {
  console.log(user)
  const unclaimedOrders = allOrders.filter((order) => {
    order.lab_user_id == null
  })
  return unclaimedOrders
}

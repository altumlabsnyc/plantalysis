import { Database } from '@/types/supabase'
import { createClient } from '@supabase/supabase-js'

/**
 * The URL endpoint for the Supabase service, fetched from environment variables.
 */
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL!

/**
 * The anonymous key for the Supabase service, fetched from environment variables.
 * This key is used for unauthenticated access to the database.
 */
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY!

/**
 * The Supabase client instance.
 * This client is used to interact with the Supabase database and provides methods for CRUD operations.
 * It's typed with the `Database` type to ensure type safety when making database queries.
 */
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)

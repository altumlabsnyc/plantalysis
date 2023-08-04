import { Database } from '@/types/supabase'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL!
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(
  'https://oxijhiqfwmhrsyiklpbj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94aWpoaXFmd21ocnN5aWtscGJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg5ODk0MDIsImV4cCI6MjAwNDU2NTQwMn0.f0knx9pHe4gTr8-4X05LXpDqgj4OAd-pRviUUhoUcpM',
)


import { createClient } from '@supabase/supabase-js'

const supabaseURL = 'https://aoxdmzvoshfqxddxoyff.supabase.co'
const supabaseAPIKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFveGRtenZvc2hmcXhkZHhveWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEyMjk3NDksImV4cCI6MTk5NjgwNTc0OX0.L7zPFnf82DHwgGcEglsXJCwLbWrEpc8EjavflJ_J6tc'
export default createClient(supabaseURL, supabaseAPIKey)

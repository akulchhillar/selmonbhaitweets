
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://labywyyrykkgrnoskefd.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhYnl3eXlyeWtrZ3Jub3NrZWZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3MDgwNzAsImV4cCI6MjA1MTI4NDA3MH0.kR5ZwbueWfr8UjG7TiL0KzZlmsTpCv_hY_ytyl2Z1NA'
const  supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://snuzpjwolxlygxasqfwp.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNudXpwandvbHhseWd4YXNxZndwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4ODEwMzAsImV4cCI6MjA1MjQ1NzAzMH0.Y40hZYUkVN3CVYcfnu4OZgnt9ngub141HgVW8D3iA3Q'

export const supabase = createClient(supabaseUrl, supabaseKey)

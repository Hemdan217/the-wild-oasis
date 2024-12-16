import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://kaxdfxtscuotrejvhxnh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtheGRmeHRzY3VvdHJlanZoeG5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5Njc5MzUsImV4cCI6MjA0OTU0MzkzNX0.9u8LthVUS0Lt8OOJ5FbFHyMbZrAek29eDEu52_wvVsg";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

import { createServerClient } from "@supabase/auth-helpers-remix";

export const getSupabaseClient = (request: Request, response: Response) => {
  const supabaseClient = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { request, response }
  );
  return supabaseClient;
};

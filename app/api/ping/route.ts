import supabase from '@config/supabase';

export async function GET() {
  const { data, error } = await supabase.from('questions').select('id').limit(1);
  if (error || !data?.length) {
    return new Response('Error fetching data', { status: 500 });
  }
  return new Response('ping', { status: 200 });
}

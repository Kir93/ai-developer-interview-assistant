import supabase from '@config/supabase';

export async function GET() {
  const { data, error } = await supabase.from('questions').select('id').limit(1);
  if (error) {
    return new Response('Error fetching data', { status: 500 });
  }
  return new Response(JSON.stringify(data), { status: 200 });
}

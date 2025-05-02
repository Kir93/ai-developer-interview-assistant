import supabase from '@configs/supabase';

export async function GET() {
  const { data, status } = await supabase.from('questions').select('id').limit(1);

  if (status === 200) {
    return new Response(JSON.stringify(data));
  } else {
    return new Response(JSON.stringify({ success: false, error: 'Failed to fetch data' }), {
      status
    });
  }
}

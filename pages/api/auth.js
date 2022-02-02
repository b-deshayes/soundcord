import { supabase } from '../../lib/supabase';

export default async function handler(request, response) {
  if (request.body?.event === 'SIGNED_IN') {
    // TODO: Export to repository
    let { data, error, status } = await supabase
    .from('whitelist')
    .select(`id`)
    .eq('id', request.body.session.user.user_metadata.provider_id)
    .single()

    // TODO: Maybe fin a better way to handle this ? 
    if (error && status != 406 || !data?.id) {
      await supabase.auth.api.signOut()
      return response.status(403).json({message: 'You should be whitelisted'})
    }
  }
  
  supabase.auth.api.setAuthCookie(request, response);
}

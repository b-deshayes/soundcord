import { supabase } from '../../../../lib/supabase'

export default async function handler(request, response) {
  const { user } = await supabase.auth.api.getUserByCookie(request)

  if (!user) return response.status(401).json({ message: 'You are not logged in' })

  let { data, error, status } = await supabase
    .from('whitelist')
    .select('role')
    .eq('id', user.user_metadata.provider_id)
    .single()

  if (error && status != 406) return response.status(500).json({ message: error })

  response.status(200).json({ role: data.role })
}

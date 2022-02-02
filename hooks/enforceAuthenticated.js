import { supabase } from '../lib/supabase';

// TODO: Find a better name
const enforceAuthenticated = () => {
    return async ({ req : request }) => {
        const { user } = await supabase.auth.api.getUserByCookie(request);
        if (!user) {
            return { props: {}, redirect: { destination: '/login', permanent: false } };
        }
    
        return { props: { user } };
    }
};

export default enforceAuthenticated;

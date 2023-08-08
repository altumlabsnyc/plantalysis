import { UserRole } from '@/types/supabaseAlias'
import { supabase } from '@/utils/supabase'
import { User } from '@supabase/supabase-js'

import toast from 'react-hot-toast'

export async function handleResetPassword(password: string) {
    try {
        const { error } = await supabase.auth.updateUser({
            password
        })
        if (error) {
            throw error
        }
    } catch (error) {
        toast.error('Error resetting password. Please contact Altum Labs Support.')
        throw new Error('Error resetting password')
    }
}

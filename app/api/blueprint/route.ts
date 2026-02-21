import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export async function POST(request: Request) {
    try {
        const { token } = await request.json()

        if (!token) {
            return NextResponse.json({ error: 'Missing token' }, { status: 400 })
        }

        const supabase = getSupabase()

        const { data: updatedContact, error: updateError } = await supabase
            .from('contact')
            .update({
                blueprint_sent: true,
                sent_at: new Date().toISOString()
            })
            .eq('token', token)
            .select()
            .single()

        if (updateError || !updatedContact) {
            console.error('[blueprint] Update error:', updateError)
            return NextResponse.json({ error: 'Failed to update or token not found' }, { status: 400 })
        }

        return NextResponse.json({ success: true })

    } catch (err) {
        console.error('[blueprint] Unexpected error:', err)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

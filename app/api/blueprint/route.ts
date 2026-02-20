import { getSupabase } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { token } = body;

        if (!token) {
            return Response.json(
                { success: false, error: "Token is required" },
                { status: 400 }
            );
        }

        // 1. Find lead in Supabase by token using secure RPC (to bypass RLS)
        const { data: lead, error: findError } = await getSupabase()
            .rpc('get_contact_by_token', { lookup_token: token })
            .returns<{ email: string; name: string }>() // Type the response
            .single();

        if (findError || !lead) {
            console.error("Lead lookup error:", findError);
            return Response.json(
                { success: false, error: "Lead not found for this token" },
                { status: 404 }
            );
        }

        const { email, name } = lead;

        // 2. Mark as sent in Supabase via RPC
        // This database update will trigger the Edge Function to send the blueprint email automatically.
        const { error: updateError } = await getSupabase()
            .rpc('mark_blueprint_sent', { lookup_token: token });

        if (updateError) {
            console.error("Failed to update blueprint status:", updateError);
            return Response.json(
                { success: false, error: "Failed to mark blueprint as sent in database" },
                { status: 500 }
            );
        }

        const sentVia = 'Supabase (Service Account)';

        return Response.json({
            success: true,
            message: `Blueprint sent successfully via ${sentVia}`,
            sentVia
        });

    } catch (error: any) {
        console.error("API Route Error:", error);
        return Response.json(
            { success: false, error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { 
  handleCorsPreflightRequest,
  errorResponse,
  successResponse,
  validateRequired,
} from "../_shared/index.ts";

serve(async (req) => {
  const origin = req.headers.get('origin');

  if (req.method === 'OPTIONS') {
    return handleCorsPreflightRequest(origin);
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json();
    
    // Validate required fields
    const validation = validateRequired(body, ['session_id', 'event_type']);
    if (!validation.valid) {
      return errorResponse(`Missing required fields: ${validation.missing.join(', ')}`, 400, origin);
    }

    const {
      session_id,
      event_type,
      language = 'en',
      role_selected,
      user_intent,
      conversation_length,
      routed_to,
      hotline_clicked,
      metadata = {}
    } = body;

    const { error } = await supabase
      .from('triage_analytics')
      .insert({
        session_id,
        event_type,
        language,
        role_selected,
        user_intent,
        conversation_length,
        routed_to,
        hotline_clicked,
        metadata
      });

    if (error) {
      return errorResponse('Failed to record event', 500, origin);
    }

    return successResponse({}, origin);
  } catch (_error) {
    return errorResponse('Request failed', 500, origin);
  }
});

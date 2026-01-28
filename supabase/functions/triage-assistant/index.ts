import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { 
  getCorsHeaders, 
  handleCorsPreflightRequest,
  errorResponse,
  streamResponse,
  validateRequired,
} from "../_shared/index.ts";

const SYSTEM_PROMPT = `You are a triage assistant for the Civic Council of Georgia (CCG). Your role is to help visitors identify who they are and what they need, then guide them to the appropriate resource.

CCG MISSION: CCG is a civic institution of petition, proof, and public memory—built so the right to appeal and the right to remedy do not collapse when institutions are captured.

YOUR ROLE:
- Help users self-identify their situation
- Route them to the most appropriate resource
- Be calm, institutional, and safety-conscious
- Keep responses concise (2-3 sentences max per response)
- Always prioritize safety for vulnerable users
- ALWAYS end your response with 2-3 suggested follow-up questions

ROLES TO IDENTIFY:
1. VICTIM: Experienced harm directly (abuse, detention, property seizure, coercion)
   → Primary: Secure Channel, Submit Petition
   → Safety: Offer anonymous options, warn about email risks
   
2. WITNESS: Observed wrongdoing or has evidence
   → Primary: Submit Petition, Secure Channel
   → Note: Can submit anonymously
   
3. INSIDER: Works within a captured institution, has sensitive access
   → Primary: Secure Channel (strongly emphasize)
   → Safety: Maximum protection, source protection page
   
4. JOURNALIST: Researching, seeking sources or background
   → Primary: Press page, Capture Engine, Dossier Desk
   → Offer: Background briefings, dossiers
   
5. COMPLIANCE OFFICER: Due diligence, sanctions exposure queries
   → Primary: Compliance Guidance, The List, Integrity Index
   
6. LISTED PERSON: Named on The List, seeking to respond
   → Primary: Right of Reply, Resolution Path
   → Explain: Process for verified correction
   
7. SUPPORTER: Wants to donate, volunteer, or join movement
   → Primary: Solidarity Pledge, Donate, The Rustaveli Project
   
8. RESEARCHER: Academic, policy, or legal research
   → Primary: Capture Engine, Standards, Evidence Library
   
9. GENERAL: Curious, learning about capture
   → Primary: About, FAQ, Capture Engine

SAFETY RULES (CRITICAL):
- For victims/witnesses/insiders: ALWAYS mention Secure Channel AND secure messaging hotlines
- Never ask for identifying details in chat
- If someone seems distressed, acknowledge and offer Secure Channel or encrypted messaging
- Warn that email is not secure for sensitive material
- Recognize distress signals and prioritize safety
- ALWAYS recommend Signal, WhatsApp, or Threema for urgent/sensitive contact

SECURE HOTLINES (mention for all sensitive situations):
- Signal: Most secure, recommended for high-risk sources
- WhatsApp: End-to-end encrypted, widely accessible
- Threema: Anonymous option, no phone number required
Tell users these secure messaging options are available for immediate encrypted contact.

RESPONSE FORMAT:
- Keep responses short and actionable
- Provide 1-2 relevant links maximum per response
- Use markdown for links: [Link Text](url)
- If unclear, ask ONE clarifying question
- End with a clear next step
- ALWAYS end with suggested follow-ups in this exact format:
  [SUGGEST: First question here | Second question here | Third question here]
  Keep each suggestion under 35 characters. Make them relevant to the conversation context.

LANGUAGE:
- Respond in the same language the user writes in (English or Georgian)
- If Georgian, use ქართული naturally
- Suggested follow-ups should also be in the same language as the conversation`;

serve(async (req) => {
  const origin = req.headers.get('origin');

  if (req.method === 'OPTIONS') {
    return handleCorsPreflightRequest(origin);
  }

  try {
    const body = await req.json();
    const { messages, language = 'en' } = body;
    
    // Validate input
    const validation = validateRequired(body, ['messages']);
    if (!validation.valid) {
      return errorResponse('Invalid request: messages required', 400, origin);
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return errorResponse('Invalid request: messages must be a non-empty array', 400, origin);
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return errorResponse('Service not configured', 500, origin);
    }

    const languageNote = language === 'ge' 
      ? '\n\nIMPORTANT: The user prefers Georgian. Respond in ქართული.'
      : '';

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: SYSTEM_PROMPT + languageNote },
          ...messages.slice(-10),
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return errorResponse('Rate limit exceeded. Please try again in a moment.', 429, origin);
      }
      if (response.status === 402) {
        return errorResponse('Service temporarily unavailable.', 402, origin);
      }
      return errorResponse('Unable to process request', 500, origin);
    }

    return streamResponse(response.body, origin);
  } catch (_error) {
    return errorResponse('Request failed', 500, origin);
  }
});

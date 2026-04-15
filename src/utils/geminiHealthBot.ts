function getGeminiEndpoint(): string | null {
  const key = (import.meta.env.VITE_GEMINI_API_KEY as string | undefined)?.trim();
  if (!key) return null;
  return `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(key)}`;
}

const FALLBACK_TEXT_API = 'https://text.pollinations.ai/';

const HEALTHCARE_SYSTEM_PROMPT =
  'Act as a professional healthcare assistant. Answer only healthcare-related queries like symptoms, medicines, doctors, precautions. If question is unrelated, politely refuse.';

interface GeminiPart {
  text?: string;
}

interface GeminiCandidate {
  content?: {
    parts?: GeminiPart[];
  };
}

interface GeminiResponse {
  candidates?: GeminiCandidate[];
  promptFeedback?: {
    blockReason?: string;
  };
  error?: {
    message?: string;
  };
}

function getLocalHealthcareFallback(userQuery: string): string {
  const q = userQuery.toLowerCase();

  if (q.includes('fever')) {
    return 'Fever usually means body temperature above 100.4 F (38 C), often due to infection. Stay hydrated, rest, and monitor temperature every 4-6 hours. Adults may use paracetamol as directed on label unless contraindicated. Seek urgent care if fever is very high (>103 F), lasts more than 3 days, or comes with breathing trouble, confusion, severe weakness, or persistent vomiting.';
  }

  if (q.includes('headache') || q.includes('migraine')) {
    return 'For headache, drink water, rest in a quiet/dark room, and avoid screen strain. If suitable for you, a standard OTC pain reliever may help. Seek medical care urgently if headache is sudden/severe, with fever + stiff neck, weakness, vision/speech changes, confusion, or after head injury.';
  }

  if (q.includes('cold') || q.includes('cough') || q.includes('sore throat')) {
    return 'Common cold symptoms include runny nose, sore throat, cough, sneezing, mild fever, and body ache. Home care: fluids, warm steam, rest, and symptomatic medicines. Consult a doctor if breathing difficulty, chest pain, high fever, blood in cough, or symptoms persist beyond 7-10 days.';
  }

  if (q.includes('paracetamol') || q.includes('medicine') || q.includes('medication')) {
    return 'Use medicines only as per label or doctor advice. For paracetamol, do not exceed daily maximum dose and avoid combining multiple products containing paracetamol. If you have liver disease, pregnancy, kidney issues, or take regular medicines, consult a doctor/pharmacist before use.';
  }

  if (q.includes('bp') || q.includes('blood pressure') || q.includes('diabetes') || q.includes('sugar')) {
    return 'For chronic conditions like blood pressure or diabetes, monitor regularly, take medicines on time, maintain low-salt balanced diet, exercise as advised, and keep follow-up visits. Seek medical review if readings are repeatedly high/low or you have dizziness, chest discomfort, fainting, or severe weakness.';
  }

  return 'I can help with healthcare topics such as symptoms, medicines, precautions, and when to consult a doctor. Please share your symptoms, duration, age group, and any existing condition/medicines so I can guide you better.';
}

function isInvalidFallbackText(text: string): boolean {
  const t = text.toLowerCase();
  return (
    !t ||
    t.includes('important notice') ||
    t.includes('pollinations legacy text api') ||
    t.includes('please migrate to our new service') ||
    t.length < 20
  );
}

export async function getHealthcareAssistantReply(userQuery: string): Promise<string> {
  const geminiEndpoint = getGeminiEndpoint();

  if (geminiEndpoint) {
    try {
      const response = await fetch(geminiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${HEALTHCARE_SYSTEM_PROMPT}\n\nUser query: ${userQuery}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 512
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini request failed with status ${response.status}: ${errorText}`);
      }

      const data = (await response.json()) as GeminiResponse;

      if (data.error?.message) {
        throw new Error(data.error.message);
      }

      if (data.promptFeedback?.blockReason) {
        throw new Error(`Blocked by safety filters: ${data.promptFeedback.blockReason}`);
      }

      const generatedText =
        data.candidates?.[0]?.content?.parts
          ?.map((part) => part.text || '')
          .join('')
          .trim() || '';

      if (!generatedText) {
        throw new Error('No response text returned from Gemini.');
      }

      return generatedText;
    } catch {
      // Fall through to remote/local fallbacks.
    }
  }

  const fallbackPrompt = `${HEALTHCARE_SYSTEM_PROMPT}\n\nUser query: ${userQuery}\n\nKeep the answer concise, safe, and practical.`;
  try {
    const fallbackResponse = await fetch(`${FALLBACK_TEXT_API}${encodeURIComponent(fallbackPrompt)}`);
    if (fallbackResponse.ok) {
      const fallbackText = (await fallbackResponse.text()).trim();
      if (!isInvalidFallbackText(fallbackText)) {
        return fallbackText;
      }
    }
  } catch {
    // Use local fallback below.
  }

  return getLocalHealthcareFallback(userQuery);
}

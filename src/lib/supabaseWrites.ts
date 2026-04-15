import { getSupabase } from './supabaseClient';

export type PatientFeedbackInsert = {
  feedback_type: 'doctor' | 'hospital';
  subject_name: string | null;
  payload: Record<string, unknown>;
  comment: string;
  is_anonymous: boolean;
};

export async function insertPatientFeedback(row: PatientFeedbackInsert) {
  const sb = getSupabase();
  if (!sb) return { ok: false as const, skipped: true, error: null };

  const { error } = await sb.from('patient_feedback').insert({
    feedback_type: row.feedback_type,
    subject_name: row.subject_name,
    payload: row.payload,
    comment: row.comment,
    is_anonymous: row.is_anonymous
  });

  if (error) {
    console.warn('[Supabase] patient_feedback insert failed:', error.message);
    return { ok: false as const, skipped: false, error };
  }
  return { ok: true as const, skipped: false, error: null };
}

export async function logHealthBotExchange(userMessage: string, assistantMessage: string) {
  const sb = getSupabase();
  if (!sb) return;

  const { error } = await sb.from('health_bot_messages').insert({
    user_message: userMessage.slice(0, 8000),
    assistant_message: assistantMessage.slice(0, 8000)
  });
  if (error) {
    console.warn('[Supabase] health_bot_messages insert failed:', error.message);
  }
}

export async function logEmergencySosEvent(meta: Record<string, unknown>) {
  const sb = getSupabase();
  if (!sb) return;

  const { error } = await sb.from('emergency_events').insert({
    event_type: 'sos_press',
    meta
  });
  if (error) {
    console.warn('[Supabase] emergency_events insert failed:', error.message);
  }
}

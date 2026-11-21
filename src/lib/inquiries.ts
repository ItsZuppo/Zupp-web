const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const TABLE_ENDPOINT = `${SUPABASE_URL}/rest/v1/website_inquiries`;
const RPC_BASE = `${SUPABASE_URL}/rest/v1/rpc`;

export type InquiryType = 'support' | 'contact' | 'partner' | 'rider' | 'delete_account';
export type InquiryStatus = 'new' | 'in_progress' | 'resolved';

export interface WebsiteInquiry {
  id: string;
  type: InquiryType;
  full_name: string;
  phone: string | null;
  email: string | null;
  subject: string | null;
  message: string;
  status: InquiryStatus;
  admin_note: string | null;
  created_at: string;
}

export interface SubmitInquiryInput {
  type: InquiryType;
  full_name: string;
  phone?: string;
  email?: string;
  subject?: string;
  message: string;
}

const baseHeaders = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
};

/** Public visitor submission — RLS allows INSERT only; no public read access. */
export async function submitWebsiteInquiry(input: SubmitInquiryInput): Promise<void> {
  const fullName = input.full_name.trim();
  const phone = input.phone?.trim() || '';
  const email = input.email?.trim() || '';
  const subject = input.subject?.trim() || '';
  const message = input.message.trim();

  if (!fullName) {
    throw new Error('Please enter your name.');
  }
  if (!phone && !email) {
    throw new Error('Please provide at least a Phone Number or Email ID.');
  }
  if (!message) {
    throw new Error('Please write a short message or details.');
  }

  const res = await fetch(TABLE_ENDPOINT, {
    method: 'POST',
    headers: {
      ...baseHeaders,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      type: input.type,
      full_name: fullName,
      phone: phone || null,
      email: email || null,
      subject: subject || null,
      message,
      status: 'new',
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    if (errText.includes('website_inquiries') && errText.includes('does not exist')) {
      throw new Error('Database table not created yet. Please run the SQL query in Supabase.');
    }
    throw new Error('Could not submit right now. Please try again or reach us on WhatsApp.');
  }
}

/** Secure Admin RPC: verifies bcrypt passcode in PostgreSQL before returning inquiries. */
export async function fetchWebsiteInquiries(passcode: string): Promise<WebsiteInquiry[]> {
  const res = await fetch(`${RPC_BASE}/admin_list_website_inquiries`, {
    method: 'POST',
    headers: baseHeaders,
    body: JSON.stringify({ p_passcode: passcode }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    if (errBody.includes('Invalid admin passcode')) {
      throw new Error('Invalid admin passcode.');
    }
    if (errBody.includes('admin_list_website_inquiries')) {
      throw new Error('Please run the updated Security SQL query in Supabase SQL Editor first.');
    }
    throw new Error('Failed to verify passcode or load inquiries.');
  }
  return (await res.json()) as WebsiteInquiry[];
}

/** Secure Admin RPC: verifies bcrypt passcode in PostgreSQL before updating status. */
export async function updateInquiryStatus(
  passcode: string,
  id: string,
  status: InquiryStatus,
  adminNote?: string
): Promise<void> {
  const res = await fetch(`${RPC_BASE}/admin_update_website_inquiry`, {
    method: 'POST',
    headers: baseHeaders,
    body: JSON.stringify({
      p_passcode: passcode,
      p_id: id,
      p_status: status,
      p_admin_note: adminNote !== undefined ? adminNote.trim() || null : null,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to update inquiry status.');
  }
}

/** Secure Admin RPC: verifies bcrypt passcode in PostgreSQL before deleting inquiry. */
export async function deleteWebsiteInquiry(passcode: string, id: string): Promise<void> {
  const res = await fetch(`${RPC_BASE}/admin_delete_website_inquiry`, {
    method: 'POST',
    headers: baseHeaders,
    body: JSON.stringify({
      p_passcode: passcode,
      p_id: id,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to delete inquiry.');
  }
}

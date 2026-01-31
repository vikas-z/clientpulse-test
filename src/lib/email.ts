import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendFeedbackRequestEmail(
  to: string,
  clientName: string,
  projectName: string,
  portalUrl: string
) {
  const { error } = await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to,
    subject: `${projectName}: We'd love your feedback`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hi ${clientName},</h2>
        <p>We'd love to hear your thoughts on <strong>${projectName}</strong>.</p>
        <p>Your feedback helps us improve and deliver better results.</p>
        <a href="${portalUrl}"
           style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px;
                  border-radius: 8px; text-decoration: none; margin: 16px 0;">
          Share Feedback
        </a>
        <p style="color: #6b7280; font-size: 14px;">
          This link is unique to you and doesn't expire.
        </p>
      </div>
    `,
  });

  if (error) {
    console.error('Failed to send feedback request email:', error);
    throw error;
  }
}

export async function sendFeedbackReceivedEmail(
  to: string,
  clientName: string,
  projectName: string,
  score: number
) {
  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to,
    subject: `New feedback from ${clientName} on ${projectName}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Feedback Received</h2>
        <p><strong>${clientName}</strong> submitted feedback for <strong>${projectName}</strong>.</p>
        <p>NPS Score: <strong>${score}/10</strong></p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/feedback"
           style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px;
                  border-radius: 8px; text-decoration: none; margin: 16px 0;">
          View Details
        </a>
      </div>
    `,
  });
}

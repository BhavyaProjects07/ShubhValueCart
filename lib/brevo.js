export async function sendBrevoEmail({ to, subject, htmlContent }) {
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: process.env.BREVO_SENDER_NAME,
          email: process.env.BREVO_SENDER_EMAIL,
        },
        to: [{ email: to }],
        subject,
        htmlContent,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Brevo API error:", error);
      return;
    }

    return await res.json();
  } catch (err) {
    console.error("Email sending failed:", err.message);
  }
}
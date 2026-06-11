// Brevo (Sendinblue) Transactional Email Service
// Sends booking confirmation emails to both patient and doctor

interface BookingDetails {
  name: string;
  age: string;
  gender: string;
  email: string;
  phone: string;
  mode: string;
  price: number;
  category: string;
  description: string;
  preferredDate: string;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "As soon as possible";
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function buildPatientEmail(details: BookingDetails): string {
  const doctorName = import.meta.env.VITE_DOCTOR_NAME || "Dr. Sandip Das";
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4faf8;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 8px 40px rgba(5,68,62,0.08);">
    
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#05443e 0%,#0a6b5e 100%);padding:36px 32px 28px;text-align:center;">
      <div style="width:56px;height:56px;border-radius:50%;background:rgba(255,255,255,0.15);margin:0 auto 16px;line-height:56px;font-size:24px;color:#fff;font-weight:700;">✓</div>
      <h1 style="color:#ffffff;font-size:22px;margin:0 0 6px;font-weight:600;">Booking Confirmed</h1>
      <p style="color:rgba(255,255,255,0.8);font-size:13px;margin:0;">Your consultation with ${doctorName} has been booked.</p>
    </div>
    
    <!-- Body -->
    <div style="padding:32px;">
      <p style="color:#05443e;font-size:15px;margin:0 0 20px;line-height:1.6;">
        Dear <strong>${details.name}</strong>, thank you for booking your appointment. Below are your consultation details:
      </p>
      
      <!-- Details Card -->
      <div style="background:#f0f9f6;border-radius:16px;padding:24px;margin-bottom:24px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#6b8f8a;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Consultation Mode</td><td style="padding:8px 0;color:#05443e;font-size:14px;font-weight:600;text-align:right;">${details.mode}</td></tr>
          <tr><td colspan="2" style="border-bottom:1px solid rgba(5,68,62,0.08);"></td></tr>
          <tr><td style="padding:8px 0;color:#6b8f8a;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Preferred Date</td><td style="padding:8px 0;color:#05443e;font-size:14px;font-weight:600;text-align:right;">${formatDate(details.preferredDate)}</td></tr>
          <tr><td colspan="2" style="border-bottom:1px solid rgba(5,68,62,0.08);"></td></tr>
          <tr><td style="padding:8px 0;color:#6b8f8a;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Consultation Fee</td><td style="padding:8px 0;color:#05443e;font-size:14px;font-weight:600;text-align:right;">₹${details.price}</td></tr>
          <tr><td colspan="2" style="border-bottom:1px solid rgba(5,68,62,0.08);"></td></tr>
          <tr><td style="padding:8px 0;color:#6b8f8a;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Concern</td><td style="padding:8px 0;color:#05443e;font-size:14px;font-weight:600;text-align:right;">${details.category || "General Consultation"}</td></tr>
        </table>
      </div>
      
      <!-- Info -->
      <div style="background:#fffbeb;border-radius:12px;padding:16px;margin-bottom:24px;border-left:4px solid #f59e0b;">
        <p style="color:#92400e;font-size:12px;margin:0;line-height:1.6;">
          <strong>What's next?</strong> Our clinic assistant will confirm your appointment within 2-4 hours via phone call or WhatsApp. Fees are payable at the time of consultation via UPI or cash.
        </p>
      </div>

      <p style="color:#6b8f8a;font-size:12px;margin:0;text-align:center;line-height:1.5;">
        If you need to reschedule, reply to this email or call our assistant at<br/>
        <strong style="color:#05443e;">${import.meta.env.VITE_ASSISTANT_PHONE || "+91 93308 25119"}</strong>
      </p>
    </div>
    
    <!-- Footer -->
    <div style="background:#f0f9f6;padding:20px 32px;text-align:center;border-top:1px solid rgba(5,68,62,0.06);">
      <p style="color:#6b8f8a;font-size:11px;margin:0;">${doctorName} · Classical Homeopathy · Howrah</p>
    </div>
  </div>
</body>
</html>`;
}

function buildDoctorEmail(details: BookingDetails): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f8f9fa;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);">
    
    <div style="background:linear-gradient(135deg,#1e3a5f 0%,#2d5a87 100%);padding:28px 32px;text-align:center;">
      <h1 style="color:#ffffff;font-size:18px;margin:0;font-weight:600;">📋 New Appointment Booking</h1>
    </div>
    
    <div style="padding:28px 32px;">
      <div style="background:#f0f4ff;border-radius:16px;padding:24px;margin-bottom:20px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px 0;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Patient Name</td><td style="padding:6px 0;color:#1e293b;font-size:14px;font-weight:600;text-align:right;">${details.name}</td></tr>
          <tr><td colspan="2" style="border-bottom:1px solid rgba(0,0,0,0.05);"></td></tr>
          <tr><td style="padding:6px 0;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Age / Gender</td><td style="padding:6px 0;color:#1e293b;font-size:14px;text-align:right;">${details.age || "—"} yrs / ${details.gender}</td></tr>
          <tr><td colspan="2" style="border-bottom:1px solid rgba(0,0,0,0.05);"></td></tr>
          <tr><td style="padding:6px 0;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Email</td><td style="padding:6px 0;color:#1e293b;font-size:14px;text-align:right;">${details.email}</td></tr>
          <tr><td colspan="2" style="border-bottom:1px solid rgba(0,0,0,0.05);"></td></tr>
          <tr><td style="padding:6px 0;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Phone</td><td style="padding:6px 0;color:#1e293b;font-size:14px;text-align:right;">${details.phone}</td></tr>
          <tr><td colspan="2" style="border-bottom:1px solid rgba(0,0,0,0.05);"></td></tr>
          <tr><td style="padding:6px 0;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Mode</td><td style="padding:6px 0;color:#1e293b;font-size:14px;font-weight:600;text-align:right;">${details.mode} (₹${details.price})</td></tr>
          <tr><td colspan="2" style="border-bottom:1px solid rgba(0,0,0,0.05);"></td></tr>
          <tr><td style="padding:6px 0;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Preferred Date</td><td style="padding:6px 0;color:#1e293b;font-size:14px;text-align:right;">${formatDate(details.preferredDate)}</td></tr>
          <tr><td colspan="2" style="border-bottom:1px solid rgba(0,0,0,0.05);"></td></tr>
          <tr><td style="padding:6px 0;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Concern</td><td style="padding:6px 0;color:#1e293b;font-size:14px;text-align:right;">${details.category || "General"}</td></tr>
        </table>
      </div>
      
      ${details.description ? `
      <div style="background:#fefce8;border-radius:12px;padding:16px;">
        <p style="color:#854d0e;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin:0 0 6px;">Patient Notes</p>
        <p style="color:#422006;font-size:13px;margin:0;line-height:1.6;font-style:italic;">"${details.description}"</p>
      </div>` : ""}
    </div>
  </div>
</body>
</html>`;
}

export async function sendBookingEmail(details: BookingDetails): Promise<{ success: boolean; error?: string }> {
  const apiKey = import.meta.env.VITE_BREVO_API_KEY;
  const doctorEmail = import.meta.env.VITE_DOCTOR_EMAIL || "sdas132@gmail.com";
  const doctorName = import.meta.env.VITE_DOCTOR_NAME || "Dr. Sandip Das";

  // Use the doctor's email as sender — this must be a verified sender in Brevo
  const senderEmail = doctorEmail;
  const senderName = import.meta.env.VITE_BOOKING_SENDER_NAME || `${doctorName} Clinic`;

  if (!apiKey) {
    return { success: false, error: "Email service is not configured." };
  }

  const headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "api-key": apiKey,
  };

  try {
    // 1. Send confirmation to patient
    const patientPayload = {
      sender: { name: senderName, email: senderEmail },
      to: [{ email: details.email, name: details.name }],
      subject: `Booking Confirmed – ${details.mode} with ${doctorName}`,
      htmlContent: buildPatientEmail(details),
    };

    console.log("[Brevo] Sending patient email to:", details.email, "from:", senderEmail);

    const patientRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers,
      body: JSON.stringify(patientPayload),
    });

    const patientData = await patientRes.json().catch(() => ({ message: "Unknown error" }));

    if (!patientRes.ok) {
      console.error("[Brevo] Patient email failed:", patientRes.status, patientData);
      const brevoMsg = patientData?.message || patientData?.code || "";

      // Provide user-friendly errors based on common Brevo issues
      if (brevoMsg.includes("not found") || brevoMsg.includes("sender")) {
        return { success: false, error: `Sender email not verified in Brevo. Please verify "${senderEmail}" in your Brevo dashboard (Senders & IPs).` };
      }
      if (patientRes.status === 401) {
        return { success: false, error: "Brevo API key is invalid or expired. Please check your configuration." };
      }
      return { success: false, error: `Email delivery failed: ${brevoMsg || `HTTP ${patientRes.status}`}. Please try WhatsApp booking.` };
    }

    console.log("[Brevo] Patient email sent successfully:", patientData);

    // 2. Send notification to doctor (best-effort, don't fail the whole booking)
    try {
      const doctorRes = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers,
        body: JSON.stringify({
          sender: { name: senderName, email: senderEmail },
          to: [{ email: doctorEmail, name: doctorName }],
          replyTo: { email: details.email, name: details.name },
          subject: `New Booking: ${details.name} – ${details.mode} (${formatDate(details.preferredDate)})`,
          htmlContent: buildDoctorEmail(details),
        }),
      });
      const doctorData = await doctorRes.json().catch(() => ({}));
      if (!doctorRes.ok) {
        console.warn("[Brevo] Doctor notification failed (non-critical):", doctorRes.status, doctorData);
      } else {
        console.log("[Brevo] Doctor notification sent successfully:", doctorData);
      }
    } catch (docErr) {
      console.warn("[Brevo] Doctor notification error (non-critical):", docErr);
    }

    return { success: true };
  } catch (err) {
    console.error("[Brevo] Network/fetch error:", err);
    return { success: false, error: "Network error. Please check your connection and try again." };
  }
}

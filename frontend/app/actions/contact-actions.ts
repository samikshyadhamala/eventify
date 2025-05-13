"use server"

import { revalidatePath } from "next/cache"

// For contacting specific event organizers
export async function sendMessageToOrganizer(formData: FormData) {
  // Validate the form data
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string
  const eventId = formData.get("eventId") as string
  const organizerName = formData.get("organizerName") as string

  if (!name || !email || !subject || !message) {
    throw new Error("Please fill out all fields")
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new Error("Please enter a valid email address")
  }

  try {
    // In a real application, you would:
    // 1. Fetch the organizer's email from your database based on eventId
    // 2. Use an email service like SendGrid, Mailgun, Nodemailer, etc.

    // Example with an email service (commented out as it's just for reference)
    /*
    const organizer = await db.getOrganizerByEventId(eventId);
    
    await sendEmail({
      to: organizer.email,
      from: "noreply@eventhub.com",
      replyTo: email,
      subject: `[EventHub] ${subject}`,
      text: `Message from ${name} (${email}) regarding event #${eventId}:\n\n${message}`,
      html: `
        <h2>New message from EventHub</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Event:</strong> #${eventId}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });
    */

    // For this example, we'll simulate a successful email send
    console.log(`Sending email to organizer of event ${eventId}:`, {
      from: email,
      name,
      subject,
      message,
    })

    // Add artificial delay to simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Revalidate the event page to reflect any changes
    revalidatePath(`/events/${eventId}`)

    return { success: true }
  } catch (error) {
    console.error("Failed to send message:", error)
    throw new Error("Failed to send message. Please try again later.")
  }
}

// For contacting the platform (general contact form)
export async function contactPlatform(formData: FormData) {
  // Validate the form data
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  if (!firstName || !lastName || !email || !message) {
    throw new Error("Please fill out all required fields")
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new Error("Please enter a valid email address")
  }

  try {
    // In a real application, you would use an email service
    // Example with an email service (commented out as it's just for reference)
    /*
    await sendEmail({
      to: "support@eventhub.com",
      from: "noreply@eventhub.com",
      replyTo: email,
      subject: `[Contact Form] ${subject || 'General Inquiry'}`,
      text: `Message from ${firstName} ${lastName} (${email}):\n\nPhone: ${phone || 'Not provided'}\n\n${message}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>From:</strong> ${firstName} ${lastName} (${email})</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
        <hr />
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });
    */

    // For this example, we'll simulate a successful email send
    console.log(`Sending platform contact email:`, {
      from: email,
      name: `${firstName} ${lastName}`,
      phone,
      subject: subject || "General Inquiry",
      message,
    })

    // Add artificial delay to simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Revalidate the contact page
    revalidatePath("/contact")

    return { success: true }
  } catch (error) {
    console.error("Failed to send message:", error)
    throw new Error("Failed to send message. Please try again later.")
  }
}

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const {
            name,
            email,
            phone,
            projectType,
            pagesCount,
            sitePurpose,
            idea,
            contactMethods,
            telegramUsername,
            consentData,
            consentPromo
        } = await req.json();

        if (!name || !email || !phone) {
            return NextResponse.json(
                { error: 'Missing required contact fields' },
                { status: 400 }
            );
        }

        // Format Contact Methods directly here
        const preferredMethods = Array.isArray(contactMethods) && contactMethods.length > 0
            ? contactMethods.map((m: string) => m.charAt(0).toUpperCase() + m.slice(1)).join(', ')
            : 'Any';

        const emailContent = `
NEW PROJECT INQUIRY

CONTACT DETAILS:
Name: ${name}
Email: ${email}
Phone: ${phone}
Preferred Contact Methods: ${preferredMethods}
${telegramUsername ? `Telegram Username: ${telegramUsername}` : ''}

PROJECT INFORMATION:
Type: ${projectType === 'multipage' ? `Multi-page (${pagesCount} pages)` : 'Landing Page'}
Purpose: ${sitePurpose}

IDEA DESCRIPTION:
${idea || 'No description provided.'}
${idea || 'No description provided.'}

User Consents:
- Personal Data Processing: ${consentData ? 'GRANTED' : 'DENIED'}
- Promotional Emails: ${consentPromo ? 'GRANTED' : 'DENIED'}
    `;

        const data = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>',
            to: 'delivered@resend.dev', // Default for testing. User needs verification for others.
            subject: `New Inquiry from ${name}: ${projectType.toUpperCase()}`,
            text: emailContent,
            replyTo: email as string,
        });

        return NextResponse.json(data);
    } catch (error) {
        console.error('Email sending error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

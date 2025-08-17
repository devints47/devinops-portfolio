import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface ContactFormData {
  name: string
  email: string
  message: string
  subject?: string // Optional field for professional form
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, subject }: ContactFormData = await request.json()

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    // Admin notification email
    const adminMailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: subject ? `${subject} - ${name}` : `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>This message was sent from the contact form on devinops.me</em></p>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        ${subject ? `Subject: ${subject}` : ''}
        Message: ${message}
        
        This message was sent from the contact form on devinops.me
      `,
    }

    // Thank you email to sender (Terminal styled)
    const thankYouMailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Message Received - DevinOps Terminal',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>DevinOps - Message Received</title>
          <style>
            body {
              font-family: 'JetBrains Mono', 'Courier New', monospace;
              background-color: #0a0a0a;
              color: #e2e8f0;
              margin: 0;
              padding: 20px;
              line-height: 1.6;
              font-size: 14px;
            }
            .terminal-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #1a1a1a;
              border: 1px solid #06b6d4;
              border-radius: 8px;
              padding: 0;
              box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
            }
            .terminal-header {
              background-color: #06b6d4;
              color: #0a0a0a;
              padding: 8px 16px;
              font-weight: bold;
              border-radius: 7px 7px 0 0;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .terminal-body {
              padding: 20px;
            }
            .prompt {
              color: #06b6d4;
              margin: 10px 0;
            }
            .output {
              color: #e2e8f0;
              margin-left: 20px;
            }
            .success {
              color: #10b981;
            }
            .warning {
              color: #f59e0b;
            }
            .accent {
              color: #06b6d4;
            }
            .muted {
              color: #64748b;
            }
            .error {
              color: #ef4444;
            }
            .divider {
              border-top: 1px solid #06b6d4;
              margin: 20px 0;
              opacity: 0.3;
            }
            .progress-bar {
              background-color: #374151;
              border-radius: 4px;
              overflow: hidden;
              height: 4px;
              margin: 10px 0;
            }
            .progress-fill {
              background-color: #06b6d4;
              height: 100%;
              width: 100%;
              animation: progress 0.5s ease-out;
            }
            @keyframes progress {
              from { width: 0%; }
              to { width: 100%; }
            }
            a {
              color: #06b6d4;
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline;
            }
            .code-block {
              background-color: #262626;
              padding: 10px;
              border-radius: 4px;
              border-left: 3px solid #06b6d4;
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="terminal-container">
            <div class="terminal-header">
              ● ● ● devinops-terminal
            </div>
            <div class="terminal-body">
              <div class="prompt">$ ./contact_confirmation --user "${name}"</div>
              <div class="output">
                <div class="muted">[INIT] Initializing contact confirmation system...</div>
                <div class="muted">[INFO] Loading security protocols...</div>
                <div class="muted">[INFO] Establishing secure connection...</div>
                <div class="progress-bar"><div class="progress-fill"></div></div>
                <div class="success">[SUCCESS] Connection established</div>
                <div class="muted">[INFO] Authenticating message integrity...</div>
                <div class="muted">[INFO] Message validation: PASSED</div>
                <div class="muted">[INFO] Scanning for malicious content...</div>
                <div class="success">[SUCCESS] Security scan complete - Clean</div>
                <div class="muted">[INFO] Routing to Devin Singh...</div>
                <div class="success">[SUCCESS] Message received and processed</div>
                <div class="muted">[INFO] Generating confirmation response...</div>
                <br>
              </div>
              
              <div class="prompt">$ cat message_confirmation.txt</div>
              <div class="code-block">
                <div>Hello <span class="accent">${name}</span>,</div>
                <br>
                <div>Thank you for reaching out through <span class="accent">DevinOps</span>! Your message has been successfully received and processed.</div>
                <br>
                <div class="muted">// Message Details</div>
                <div>From: <span class="accent">${email}</span></div>
                <div>Timestamp: <span class="muted">${new Date().toISOString()}</span></div>
                <div>Status: <span class="success">DELIVERED</span></div>
                <div>Priority: <span class="warning">HIGH</span></div>
                <div>Response ETA: <span class="accent">24-48 hours</span></div>
                <br>
                <div>I'll review your message and get back to you as soon as possible. In the meantime, feel free to explore:</div>
              </div>
              
              <div class="prompt">$ ls -la ~/devinops/resources/</div>
              <div class="output">
                <div>total 3</div>
                <div>drwxr-xr-x  3 devin staff  96 Jan  9 03:16 <span class="accent">.</span></div>
                <div>drwxr-xr-x  8 devin staff 256 Jan  9 03:16 <span class="accent">..</span></div>
                <div>-rw-r--r--  1 devin staff 1.2K Jan  9 03:16 <a href="https://devinops.me">main_portfolio.link</a></div>
                <div>-rw-r--r--  1 devin staff 2.1K Jan  9 03:16 <a href="https://devinops.me/pro">professional_mode.link</a></div>
                <div>-rw-r--r--  1 devin staff 856B Jan  9 03:16 <a href="https://github.com/devints47">github_profile.link</a></div>
                <div>-rw-r--r--  1 devin staff 1.5K Jan  9 03:16 <a href="/Devin_Singh_Resume.pdf">resume.pdf</a></div>
              </div>
              
              <div class="prompt">$ ./status_check.sh</div>
              <div class="output">
                <div class="muted">[INFO] Checking system status...</div>
                <div class="success">[✓] Email delivery system: ONLINE</div>
                <div class="success">[✓] Response queue: ACTIVE</div>
                <div class="success">[✓] Notification system: ENABLED</div>
                <div class="success">[✓] Auto-responder: ACTIVE</div>
                <div class="muted">[INFO] All systems operational</div>
              </div>
              
              <div class="divider"></div>
              
              <div class="prompt">$ echo "Connection established. Standby for response..."</div>
              <div class="output success">Connection established. Standby for response...</div>
              
              <div class="prompt">$ whoami</div>
              <div class="output">
                <div class="muted">Devin Singh</div>
                <div class="muted">Full-Stack Engineer & DevOps Specialist</div>
                <div class="muted">DevinOps</div>
              </div>
              
              <div class="prompt">$ exit</div>
              <div class="output muted">Session terminated. Thank you for using DevinOps Terminal.</div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
$ ./contact_confirmation --user "${name}"

[INIT] Initializing contact confirmation system...
[INFO] Loading security protocols...
[INFO] Establishing secure connection...
[SUCCESS] Connection established
[INFO] Authenticating message integrity...
[INFO] Message validation: PASSED
[INFO] Scanning for malicious content...
[SUCCESS] Security scan complete - Clean
[INFO] Routing to Devin Singh...
[SUCCESS] Message received and processed
[INFO] Generating confirmation response...

$ cat message_confirmation.txt

Hello ${name},

Thank you for reaching out through DevinOps! Your message has been successfully received and processed.

// Message Details
From: ${email}
Timestamp: ${new Date().toISOString()}
Status: DELIVERED
Priority: HIGH
Response ETA: 24-48 hours

I'll review your message and get back to you as soon as possible. In the meantime, feel free to explore:

$ ls -la ~/devinops/resources/
total 3
drwxr-xr-x  3 devin staff  96 Jan  9 03:16 .
drwxr-xr-x  8 devin staff 256 Jan  9 03:16 ..
-rw-r--r--  1 devin staff 1.2K Jan  9 03:16 main_portfolio.link → https://devinops.me
-rw-r--r--  1 devin staff 2.1K Jan  9 03:16 professional_mode.link → https://devinops.me/pro
-rw-r--r--  1 devin staff 856B Jan  9 03:16 github_profile.link → https://github.com/devints47
-rw-r--r--  1 devin staff 1.5K Jan  9 03:16 resume.pdf → /Devin_Singh_Resume.pdf

$ ./status_check.sh
[INFO] Checking system status...
[✓] Email delivery system: ONLINE
[✓] Response queue: ACTIVE
[✓] Notification system: ENABLED
[✓] Auto-responder: ACTIVE
[INFO] All systems operational

$ echo "Connection established. Standby for response..."
Connection established. Standby for response...

$ whoami
Devin Singh
Full-Stack Engineer & DevOps Specialist
DevinOps

$ exit
Session terminated. Thank you for using DevinOps Terminal.
      `,
    }

    // Send both emails
    await transporter.sendMail(adminMailOptions)
    await transporter.sendMail(thankYouMailOptions)

    return NextResponse.json({ message: 'Email sent successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
} 
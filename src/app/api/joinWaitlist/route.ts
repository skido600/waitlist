import { NextResponse } from "next/server";
import { database } from "../../../../lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import nodemailer from "nodemailer";

const emailHTML = `

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <main>
      <div
        style="font-family: Arial, sans-serif; line-height: 1.6; color: #333"
      >
        <h2 style="color: #4635B1; text-align: center">
          Welcome to Our Waitlist!
        </h2>
        <p style="font-size: 16px; margin: 10px 0">
          Thank you for joining our waitlist. Stay tuned for updates!
        </p>
        <p style="font-size: 14px; color: #555">
          If you have any questions, feel free to reply to this email.
        </p>
        <footer
          style="
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #999;
          "
        >
          &copy; 2025 wave queue. All rights reserved.
        </footer>
      </div>
    </main>
  </body>
</html>

`;

// Email validation function
const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "A valid email is required" },
        { status: 400 }
      );
    }

    // Check if the email is already in the waitlist
    const emailQuery = query(
      collection(database, "waitlist"),
      where("email", "==", email)
    );
    const existingEmails = await getDocs(emailQuery);

    if (!existingEmails.empty) {
      return NextResponse.json(
        {
          error: "This email is already on our waitlist. Try a different one.",
        },
        { status: 409 }
      );
    }

    // Add the email to the waitlist
    await addDoc(collection(database, "waitlist"), {
      email,
      timestamp: serverTimestamp(),
    });

    // Send a welcome email
    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: email,
      subject: `Welcome to Our Waitlist! ${email}`,
      html: emailHTML,
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        message: "Email added successfully and welcome email sent!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding email to waitlist:", error);

    return NextResponse.json(
      {
        error: "There was a problem adding your email. Please try again later.",
      },
      { status: 500 }
    );
  }
}

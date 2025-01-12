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

// Email validation function
const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Define your allowed origin
// const ALLOWED_ORIGIN = "http://localhost:3000";

export async function POST(request: Request) {
  //   const origin = request.headers.get("origin");
  //   console.log(origin);
  // Check if the request comes from the allowed origin
  //   if (origin !== ALLOWED_ORIGIN) {
  //     return NextResponse.json(
  //       { error: "Something went wrong." },
  //       { status: 403 }
  //     );
  //   }

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

    return NextResponse.json(
      {
        message: "Email added successfully!",
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

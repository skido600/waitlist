import { NextApiRequest, NextApiResponse } from "next";
import { ref, push } from "firebase/database";
import { database } from "../../../../lib/firebase";

type Data = {
  message?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { email }: { email: string } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    try {
      const emailsRef = ref(database, "waitlist");
      await push(emailsRef, { email, timestamp: Date.now() });

      return res.status(200).json({ message: "Email added to waitlist" });
    } catch (error) {
      console.error("Error adding email:", error);
      return res.status(500).json({ error: "Failed to save email" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}

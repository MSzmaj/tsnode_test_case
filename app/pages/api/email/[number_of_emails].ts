import type { NextApiRequest, NextApiResponse } from 'next'

type EmailJob = {
  jobId: string;
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<EmailJob>) {
  const numberOfEmails = req.query.number_of_emails;
  const response = await fetch(`http://tsnode_api:4000/emails/send`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ numberOfEmails: numberOfEmails}),
    mode: 'cors'
  });

  const jobId = await response.json()

  res.status(200).json({ jobId: jobId as string })
}
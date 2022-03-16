import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (req: NextApiRequest, res: NextApiResponse<void>) {
  const jobId = req.query.job_id;
  res.redirect(`http://localhost:4000/emails/subscribe/${jobId}`);
}
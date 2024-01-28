import { getJobsData } from "@/lib/utils/md";

export default async function handler(req, res) {
  const locale = req.query.locale || 'en'; // Default to English if no locale provided
  try {
    const jobsData = await getJobsData(locale);
    res.status(200).json(jobsData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
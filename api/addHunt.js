import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    const hunt = req.query.hunt;
    const method = req.query.method;
    const count = req.query.count;
    const probability = req.query.probability;
    const have = req.query.have;
    if (!petName || !ownerName) throw new Error("Pet and owner names required");
    await sql`INSERT INTO hunt (hunt, method, count, probability, have) VALUES (${hunt}, ${method}, ${count}, ${probability}, ${have});`;
  } catch (error) {
    return response.status(500).json({ error });
  }
  const hunts = await sql`SELECT * FROM hunt;`;
  return response.status(200).json({ hunts });
}

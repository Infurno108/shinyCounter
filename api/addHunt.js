import { sql } from "@vercel/postgres";

export default async function handler(req, response) {
  try {
    const hunt = req.query.hunt;
    const method = req.query.method;
    const count = req.query.count;
    const probability = req.query.probability;
    const have = req.query.have;
    if (!hunt || !method || !count || !probability || !have)
      throw new Error("Input required");
    await sql`INSERT INTO hunts (hunt, method, count, probability, have) VALUES (${hunt}, ${method}, ${count}, ${probability}, ${have});`;
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error });
  }
  const hunts = await sql`SELECT * FROM hunts;`;
  return response.status(200).json({ hunts });
}

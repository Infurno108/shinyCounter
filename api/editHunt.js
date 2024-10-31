import { sql } from "@vercel/postgres";

export default async function handler(req, response) {
  try {
    const hunt = req.query.hunt;
    const count = req.query.count;
    const probability = req.query.probability;
    const have = req.query.have;
    if (!hunt || !count || !probability || !have)
      throw new Error("Input required");
    await sql`UPDATE hunts
      SET count = ${count}, probability = ${probability}, have = ${have}
      WHERE hunt = ${hunt};`;
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error });
  }
  const hunts = await sql`SELECT * FROM hunts;`;
  return response.status(200).json({ hunts });
}

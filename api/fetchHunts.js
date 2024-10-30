import { sql } from "@vercel/postgres";

export default async function handler(req, response) {
  const { rows } = await sql`SELECT hunts FROM hunts;`;
  return response.status(200).json({ rows });
}

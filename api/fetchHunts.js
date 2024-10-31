import { sql } from "@vercel/postgres";

export default async function handler(req, response) {
  const { rows } = await sql`SELECT hunts FROM hunts\nORDER BY have ASC, hunt;`;
  return response.status(200).json({ rows });
}

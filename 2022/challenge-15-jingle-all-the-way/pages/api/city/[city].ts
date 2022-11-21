import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';
import City from '../../../types/city';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<City>
) {
  const jsonDirectory = path.join(process.cwd(), 'json');
  const cities = await fs.readFile(jsonDirectory + '/cities-data.json', 'utf8');

  const city = req.query.city as string;

  const formattedCity =
    city.charAt(0).toUpperCase() + city.toLowerCase().slice(1);

  res.status(200).json(JSON.parse(cities)[formattedCity]);
}

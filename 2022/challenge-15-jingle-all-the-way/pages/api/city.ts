import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';
import CityGpsData from '../../types/city-data';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CityGpsData>
) {
  const jsonDirectory = path.join(process.cwd(), 'json');
  const cities = await fs.readFile(jsonDirectory + '/cities-data.json', 'utf8');

  res.status(200).json(JSON.parse(cities));
}

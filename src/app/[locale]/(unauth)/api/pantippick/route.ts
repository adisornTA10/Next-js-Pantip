import { NextResponse } from 'next/server';

import { getPantipPicks } from '@/utils/pantip_pick_extractor';

export async function GET() {
  try {
    const announcements = await getPantipPicks();
    return NextResponse.json({ statusCode: 200, result: announcements });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ statusCode: 500, error: 'Failed to fetch data' });
  }
}

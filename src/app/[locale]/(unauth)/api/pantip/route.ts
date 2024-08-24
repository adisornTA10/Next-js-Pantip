import { NextResponse } from 'next/server';

import { getPantipAnnouncements } from '@/utils/pantip_extractor';

export async function GET() {
  try {
    const announcements = await getPantipAnnouncements();
    return NextResponse.json({ statusCode: 200, result: announcements });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ statusCode: 500, error: 'Failed to fetch data' });
  }
}

import { NextResponse } from 'next/server';

import { getPantipRoomLists } from '@/utils/roomlist_extractor';

export async function GET() {
  try {
    const roomlist = await getPantipRoomLists();
    return NextResponse.json({ statusCode: 200, result: roomlist });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ statusCode: 500, error: 'Failed to fetch data' });
  }
}

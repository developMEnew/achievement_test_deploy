import { NextResponse } from 'next/server';
import Calendar from '@/app/models/Calendar';
import dbConnect from '@/lib/dbConnect';

export async function PUT(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { user, month, countOfDates } = body;

    if (!user || !month || typeof countOfDates !== 'number') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid data. Ensure user, month, and countOfDates are provided.',
        },
        { status: 400 }
      );
    }

    const updateData = {
      [`months.${month}.countOfDates`]: countOfDates,
      lastUpdated: new Date()
    };

    const updatedCalendar = await Calendar.findOneAndUpdate(
      { user },
      { $set: updateData },
      { new: true }
    );

    if (!updatedCalendar) {
      return NextResponse.json(
        {
          success: false,
          error: 'Document not found. Ensure the user and month are correct.',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: updatedCalendar,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: `Error updating calendar: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Use PUT method to update calendar data.' },
    { status: 200 }
  );
}
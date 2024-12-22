import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Calendar from "@/app/models/Calendar";

export async function GET(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const year = parseInt(searchParams.get("year") || new Date().getFullYear().toString());

  if (!userId) {
    return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 });
  }

  try {
    let calendar = await Calendar.findOne({ userId });
    
    if (!calendar) {
      calendar = await Calendar.create({
        userId,
        user: userId, // For backward compatibility
        months: {}
      });
    }

    return NextResponse.json({ success: true, data: calendar }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  await dbConnect();
  
  try {
    const body = await request.json();
    const { userId, month, selectedDays, target, achieved, countOfDates } = body;

    if (!userId || !month) {
      return NextResponse.json({ 
        success: false, 
        error: "User ID and month are required" 
      }, { status: 400 });
    }

    const updateData = {
      [`months.${month}`]: {
        selectedDays: selectedDays || [],
        target: target || 0,
        achieved: achieved || 0,
        countOfDates: countOfDates || 0
      },
      lastUpdated: new Date()
    };

    const calendar = await Calendar.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { 
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      }
    );

    return NextResponse.json({ success: true, data: calendar }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
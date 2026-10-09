import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Profile from '@/models/Profile';
import { initialSeedData } from '@/lib/seedData';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/checkAuth';

export async function GET() {
  try {
    await connectToDatabase();
    const profile = await Profile.findOne().lean();
    return NextResponse.json({
      success: true,
      data: profile || initialSeedData.profile,
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({
      success: true,
      data: initialSeedData.profile,
    });
  }
}

export async function PUT(req: NextRequest) {
  const admin = await checkAdminAuth();
  if (!admin) return unauthorizedResponse();

  try {
    await connectToDatabase();
    const body = await req.json();

    let profile = await Profile.findOne();
    if (profile) {
      Object.assign(profile, body);
      await profile.save();
    } else {
      profile = await Profile.create(body);
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      data: profile,
    });
  } catch (error: unknown) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || 'Failed to update profile' },
      { status: 500 }
    );
  }
}

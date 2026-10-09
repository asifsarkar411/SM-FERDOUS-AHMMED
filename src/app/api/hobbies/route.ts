import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Hobby from '@/models/Hobby';
import { initialSeedData } from '@/lib/seedData';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/checkAuth';

export async function GET() {
  try {
    await connectToDatabase();
    const items = await Hobby.find().sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json({
      success: true,
      data: items.length > 0 ? items : initialSeedData.hobbies,
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      data: initialSeedData.hobbies,
    });
  }
}

export async function POST(req: NextRequest) {
  const admin = await checkAdminAuth();
  if (!admin) return unauthorizedResponse();

  try {
    await connectToDatabase();
    const body = await req.json();
    const item = await Hobby.create(body);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: (error as Error).message || 'Failed to create hobby entry' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const admin = await checkAdminAuth();
  if (!admin) return unauthorizedResponse();

  try {
    await connectToDatabase();
    const body = await req.json();
    const { _id, ...updateData } = body;
    if (!_id) {
      return NextResponse.json({ success: false, error: 'Missing _id' }, { status: 400 });
    }
    const updated = await Hobby.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: (error as Error).message || 'Failed to update hobby entry' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const admin = await checkAdminAuth();
  if (!admin) return unauthorizedResponse();

  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing id param' }, { status: 400 });
    }
    await Hobby.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: (error as Error).message || 'Failed to delete hobby entry' },
      { status: 500 }
    );
  }
}

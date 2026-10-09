import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Education from '@/models/Education';
import { initialSeedData } from '@/lib/seedData';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/checkAuth';

export async function GET() {
  try {
    await connectToDatabase();
    const items = await Education.find().sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json({
      success: true,
      data: items.length > 0 ? items : initialSeedData.education,
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      data: initialSeedData.education,
    });
  }
}

export async function POST(req: NextRequest) {
  const admin = await checkAdminAuth();
  if (!admin) return unauthorizedResponse();

  try {
    await connectToDatabase();
    const body = await req.json();
    const item = await Education.create(body);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: (error as Error).message || 'Failed to create education entry' },
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
    const updated = await Education.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: (error as Error).message || 'Failed to update education entry' },
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
    await Education.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: (error as Error).message || 'Failed to delete education entry' },
      { status: 500 }
    );
  }
}

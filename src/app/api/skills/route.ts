import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Skill from '@/models/Skill';
import { initialSeedData } from '@/lib/seedData';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/checkAuth';

export async function GET() {
  try {
    await connectToDatabase();
    const items = await Skill.find().sort({ order: 1, proficiency: -1 }).lean();
    return NextResponse.json({
      success: true,
      data: items.length > 0 ? items : initialSeedData.skills,
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      data: initialSeedData.skills,
    });
  }
}

export async function POST(req: NextRequest) {
  const admin = await checkAdminAuth();
  if (!admin) return unauthorizedResponse();

  try {
    await connectToDatabase();
    const body = await req.json();
    const item = await Skill.create(body);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: (error as Error).message || 'Failed to create skill entry' },
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
    const updated = await Skill.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: (error as Error).message || 'Failed to update skill entry' },
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
    await Skill.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: (error as Error).message || 'Failed to delete skill entry' },
      { status: 500 }
    );
  }
}

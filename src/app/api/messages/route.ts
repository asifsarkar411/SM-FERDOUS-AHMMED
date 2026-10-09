import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Message from '@/models/Message';
import { initialSeedData } from '@/lib/seedData';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/checkAuth';

export async function GET() {
  const admin = await checkAdminAuth();
  if (!admin) return unauthorizedResponse();

  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({
        success: true,
        data: initialSeedData.messages.map((m, idx) => ({
          _id: `mock-msg-${idx + 1}`,
          ...m,
          createdAt: new Date().toISOString(),
        })),
      });
    }

    const messages = await Message.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({
      success: true,
      data: messages.length > 0 ? messages : initialSeedData.messages.map((m, idx) => ({
        _id: `mock-msg-${idx + 1}`,
        ...m,
        createdAt: new Date().toISOString(),
      })),
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: (error as Error).message || 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { senderName, email, subject, body: messageBody } = body;

    if (!senderName || !email || !subject || !messageBody) {
      return NextResponse.json(
        { success: false, error: 'Please provide all required fields: name, email, subject, message' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const conn = await connectToDatabase();
    let savedMessage = null;

    if (conn) {
      savedMessage = await Message.create({
        senderName: senderName.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        body: messageBody.trim(),
        read: false,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your direct message has been sent successfully.',
      data: savedMessage || { senderName, email, subject, body: messageBody, read: false, createdAt: new Date() },
    }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error submitting contact message:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || 'Failed to submit message' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const admin = await checkAdminAuth();
  if (!admin) return unauthorizedResponse();

  try {
    await connectToDatabase();
    const body = await req.json();
    const { id, read } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing message id' }, { status: 400 });
    }

    const updated = await Message.findByIdAndUpdate(id, { read: Boolean(read) }, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: (error as Error).message || 'Failed to update message' },
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

    await Message.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Message deleted successfully' });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: (error as Error).message || 'Failed to delete message' },
      { status: 500 }
    );
  }
}

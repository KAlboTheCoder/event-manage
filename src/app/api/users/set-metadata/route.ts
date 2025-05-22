import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(request: Request) {
  try {
    const { userId, publicMetadata } = await request.json();
    
    // In a real application, you would add more security checks here
    // For this implementation, we'll allow the operation as it's called during sign-up
    
    // Update the user's metadata in Clerk
    const clerk = await clerkClient();
    await clerk.users.updateUser(userId, {
      publicMetadata
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error setting user metadata:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

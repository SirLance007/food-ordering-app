export const runtime = "nodejs";

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";
const { CartItem, User } = require('../../../../lib/db.ts');

export async function DELETE(request: Request) {
  try {
    // Check for API key in headers (for testing)
    const apiKey = request.headers.get('x-api-key');
    let user = null;

    if (apiKey === 'test-key-123') {
      // For testing - find test user
      user = await User.findOne({
        where: { email: 'test@example.com' }
      });
      
      if (!user) {
        return NextResponse.json(
          { success: false, error: 'Test user not found' },
          { status: 404 }
        );
      }
    } else {
      // Normal NextAuth flow
      const session = await getServerSession(authOptions);
      
      if (!session?.user?.email) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' },
          { status: 401 }
        );
      }

      user = await User.findOne({
        where: { email: session.user.email }
      });

      if (!user) {
        return NextResponse.json(
          { success: false, error: 'User not found' },
          { status: 404 }
        );
      }
    }

    await CartItem.destroy({
      where: { user_id: user.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Cart cleared successfully',
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to clear cart' },
      { status: 500 }
    );
  }
}



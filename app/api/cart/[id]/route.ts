export const runtime = "nodejs";

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";
const { CartItem, User, MenuItem } = require('../../../../lib/db.ts');

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const body = await request.json();
    const { quantity } = body;
    const { id } = await params;

    if (!quantity || quantity < 1) {
      return NextResponse.json(
        { success: false, error: 'Valid quantity is required' },
        { status: 400 }
      );
    }

    const cartItem = await CartItem.findOne({
      where: {
        id: id,
        user_id: user.id
      }
    });

    if (!cartItem) {
      return NextResponse.json(
        { success: false, error: 'Cart item not found' },
        { status: 404 }
      );
    }

    await cartItem.update({ quantity });

    // Return with menu item details
    const updatedCartItem = await CartItem.findByPk(cartItem.id, {
      include: [{
        model: MenuItem,
        foreignKey: 'menu_item_id'
      }]
    });

    return NextResponse.json({
      success: true,
      data: updatedCartItem,
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update cart item' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;

    const cartItem = await CartItem.findOne({
      where: {
        id: id,
        user_id: user.id
      }
    });

    if (!cartItem) {
      return NextResponse.json(
        { success: false, error: 'Cart item not found' },
        { status: 404 }
      );
    }

    await cartItem.destroy();

    return NextResponse.json({
      success: true,
      message: 'Item removed from cart',
    });
  } catch (error) {
    console.error('Error removing cart item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to remove cart item' },
      { status: 500 }
    );
  }
}
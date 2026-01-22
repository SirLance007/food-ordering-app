export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
const { CartItem, MenuItem, User } = require('../../../lib/db.ts');

export async function GET() {
    try {
        const session = await getServerSession();

        if (!session?.user?.email) {
            return NextResponse.json({
                success: false,
                error: "Unauthorized"
            }, { status: 401 })
        }

        const user = await User.findOne({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                error: "User not found!!!"
            }, { status: 404 })
        }

        // fetch cartItems
        const cartItems = await CartItem.findAll({
            where: { user_id: user.id },
            include: [{
                model: MenuItem,
                foreignKey: 'menu_item_id'
            }],
            order: [['created_at', 'DESC']]
        })

        return NextResponse.json({
            success: true,
            data: cartItems
        }, { status: 200 })
    } catch (err) {
        return NextResponse.json({
            success: false,
            error: "Failed to get the card products!!"
        }, { status: 500 })
    }
}

// add items in the cart
export async function POST(request: Request) {
    try {
        const session = await getServerSession();

        if (!session?.user?.email) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { menu_item_id, quantity = 1 } = body;

        if (!menu_item_id) {
            return NextResponse.json(
                { success: false, error: 'Menu item ID is required' },
                { status: 400 }
            );
        }

        // User find karo
        let user = await User.findOne({
            where: { email: session.user.email }
        });

        // Agar user database mein nahi hai toh create karo (Google login se aaya hai)
        if (!user) {
            user = await User.create({
                name: session.user.name,
                email: session.user.email,
            });
        }

        // Check if item already in cart
        let cartItem = await CartItem.findOne({
            where: {
                user_id: user.id,
                menu_item_id: menu_item_id
            }
        });

        if (cartItem) {
            // Agar already hai toh quantity increase karo
            await cartItem.update({
                quantity: cartItem.quantity + quantity
            });
        } else {
            // Naya cart item banao
            cartItem = await CartItem.create({
                user_id: user.id,
                menu_item_id: menu_item_id,
                quantity: quantity
            });
        }

        // Cart item with menu details return karo
        const cartItemWithDetails = await CartItem.findByPk(cartItem.id, {
            include: [{
                model: MenuItem,
                foreignKey: 'menu_item_id'
            }]
        });

        return NextResponse.json({
            success: true,
            data: cartItemWithDetails,
        }, { status: 201 });
    } catch (error) {
        console.error('Error adding to cart:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to add to cart' },
            { status: 500 }
        );
    }
}
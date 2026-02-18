export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Order, OrderItem, User, CartItem, MenuItem } from '@/lib/db';


// Get all the orders
// Get all the orders
export async function GET() {
    try {

        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({
                success: false,
                error: "Unauthorized"
            }, { status: 401 })
        }

        const user = await User.findOne({
            where: { email: session.user.email }
        })

        if (!user) {
            return NextResponse.json({
                success: false,
                error: 'User not found!!'
            }, { status: 404 })
        }

        const orders = await Order.findAll({
            where: { user_id: user.id },
            include: [
                {
                    model: OrderItem,
                    include: [
                        {
                            model: MenuItem,
                        }
                    ]
                }
            ],
            order: [['created_at', 'DESC']]
        })

        return NextResponse.json({
            success: true,
            orders
        });
    } catch (err) {
        console.error("Error fetching orders:", err);
        return NextResponse.json({
            success: false,
            error: "Orders not fetched!!"
        }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({
                success: false,
                error: "Unauthorized"
            }, { status: 401 })
        }

        const data = await req.json();

        const user = await User.findOne({
            where: { email: session.user.email }
        })

        if (!user) {
            return NextResponse.json({
                success: false,
                error: 'User not found!!'
            }, { status: 404 })
        }

        // Get cart items from request body or database
        let cartItems = [];

        if (data.cartItems && Array.isArray(data.cartItems) && data.cartItems.length > 0) {
            // Validate items from request body
            const itemIds = data.cartItems.map((item: any) => item.id);
            const menuItems = await MenuItem.findAll({
                where: { id: itemIds }
            });

            // Map request items to usable format with DB prices
            cartItems = data.cartItems.map((item: any) => {
                const menuItem = menuItems.find((mi: any) => mi.id === item.id);
                if (!menuItem) return null;

                return {
                    menu_item_id: menuItem.id,
                    quantity: item.quantity,
                    MenuItem: menuItem // Allow accessing price later
                };
            }).filter(Boolean); // Remove nulls

        } else {
            // Fallback to database cart
            cartItems = await CartItem.findAll({
                where: { user_id: user.id },
                include: [{ model: MenuItem }]
            });
        }

        if (!cartItems || cartItems.length === 0) {
            console.error('Cart is empty after processing');
            return NextResponse.json({
                success: false,
                error: 'Cart is empty'
            }, { status: 400 });
        }

        // Calculate total amount
        let totalAmount = 0;
        cartItems.forEach((item: any) => {
            totalAmount += parseFloat(item.MenuItem.price) * item.quantity;
        });

        // Create Order
        const order = await Order.create({
            user_id: user.id,
            total_amount: totalAmount,
            status: 'pending',
            delivery_address: data.delivery_address || user.address || '', // Fallback if needed
            payment_mode: data.payment_mode || 'cod'
        });
        console.log('Order created:', order.id);

        // Create Order Items
        const orderItemsData = cartItems.map((item: any) => ({
            order_id: order.id,
            menu_item_id: item.menu_item_id,
            quantity: item.quantity,
            price: item.MenuItem.price
        }));
        console.log('Order items data:', JSON.stringify(orderItemsData));

        await OrderItem.bulkCreate(orderItemsData);
        console.log('Order items created');

        // Clear Database Cart if used
        if (!data.cartItems) {
            await CartItem.destroy({
                where: { user_id: user.id }
            });
        }

        return NextResponse.json({
            success: true,
            order: order,
            message: 'Order created successfully'
        });

    } catch (err) {
        console.error('Order creation error:', err);
        return NextResponse.json({
            success: false,
            error: "Order creation failed"
        }, { status: 500 })
    }
}


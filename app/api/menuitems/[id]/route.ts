export const runtime = "nodejs";

import { NextResponse } from "next/server";
const { MenuItem } = require('../../../../lib/db.ts');

// First checking if the required id file available
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        // Direct params.id access nhi kar sakte 
        const { id } = await params;
        const menuItem = await MenuItem.findByPk(id);
        
        if (!menuItem) {
            return NextResponse.json({
                success: false,
                error: "Failed to find the required menuitem!!"
            }, { status: 404 })
        }
        
        return NextResponse.json({
            success: true,
            data: menuItem
        })
    } catch (err) {
        console.error('Database error:', err);
        return NextResponse.json({
            success: false,
            error: "Failed to fetch the menuItem!!!"
        }, { status: 500 })
    }
}

// Updating the menuItem
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const body = await request.json();
        const { name, price, description, image_url, category, is_available } = body;
        const { id } = await params;

        const menuItem = await MenuItem.findByPk(id);

        if (!menuItem) {
            return NextResponse.json(
                { success: false, error: 'Menu item not found' },
                { status: 404 }
            );
        }

        await menuItem.update({
            name,
            price,
            description,
            image_url,
            category,
            is_available,
        });

        return NextResponse.json({
            success: true,
            data: menuItem,
        });
    } catch (error) {
        console.error('Error updating menu item:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update menu item' },
            { status: 500 }
        );
    }
}

// DELETE the menuItem
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const menuItem = await MenuItem.findByPk(id);
        
        if (!menuItem) {
            return NextResponse.json({
                success: false,
                error: "The desired menuItem is not present!!"
            }, { status: 404 })
        }

        await menuItem.destroy();

        return NextResponse.json({
            success: true,
            message: "Menu item deleted successfully"
        });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({
            success : false,
            error : "Failed to delete menu item!!"
        } , { status : 500 })
    }
}
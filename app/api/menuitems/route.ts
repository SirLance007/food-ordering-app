export const runtime = "nodejs";

import { NextResponse } from "next/server";
const { MenuItem } = require('../../../lib/db.ts');

// to fetch all the menu items
export async function GET(){
    try{
        const menuItems = await MenuItem.findAll({
            where: { is_available: true },
            order: [['created_at', 'DESC']]
        });

        return NextResponse.json({
            success : true,
            data : menuItems,
        } , {status : 200})
        
    }catch(err){
        console.error('Database error:', err);
        return NextResponse.json({
            success : false,
            error : "Failed to fetch menu items!!",
        } , {status : 500})
    }
}

// to add a menu item
export async function POST(request : Request){
    try{

        const body = await request.json();
        const {name , price , image_url , description , category } = body;

        // if name or price is not present
        if(!name || !price){
            return NextResponse.json({
                success : false,
                error : "Name or price is not mentioned!!"
            } , {status : 400})
        }

        const menuItem = await MenuItem.create({
            name,
            price,
            description,
            image_url,
            category,
            is_available: true,
        });

        return NextResponse.json({
            success : true,
            data : menuItem
        } , { status : 201 })

    }catch(err){
        console.error('Database error:', err);
        return NextResponse.json({
            success : false,
            error : "Failed to add menu item!!"
        } , {status : 500})
    }
} 

import { NextResponse } from 'next/server';
import { sequelize } from '@/lib/db';

export async function GET() {
    try {
        await sequelize.sync({ force: false }); // force: false ensures we don't drop existing tables if they exist
        return NextResponse.json({ message: 'Database synchronized successfully' });
    } catch (error: any) {
        console.error('Sync error:', error);
        return NextResponse.json({ message: 'Error syncing database', error: error.message }, { status: 500 });
    }
}

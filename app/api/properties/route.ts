import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Property from '@/models/Property'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')
    const page = parseInt(searchParams.get('page') || '1')
    
    const query: any = {}
    
    if (status) {
      query.status = status
    }
    
    const skip = (page - 1) * limit
    
    const properties = await Property.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .select('-seller -buyerInterests')
    
    const total = await Property.countDocuments(query)
    
    return NextResponse.json({
      success: true,
      properties,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching properties:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch properties' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    
    const property = new Property(body)
    await property.save()
    
    return NextResponse.json({
      success: true,
      property
    })
  } catch (error) {
    console.error('Error creating property:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create property' },
      { status: 500 }
    )
  }
}

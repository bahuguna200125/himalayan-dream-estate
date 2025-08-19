import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Property from '@/models/Property'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const { name, phone, email, message } = body
    
    // Validate required fields
    if (!name || !phone || !email) {
      return NextResponse.json(
        { success: false, error: 'Name, phone, and email are required' },
        { status: 400 }
      )
    }
    
    // Find the property
    const property = await Property.findById(params.id)
    
    if (!property) {
      return NextResponse.json(
        { success: false, error: 'Property not found' },
        { status: 404 }
      )
    }
    
    // Add buyer interest to the property
    property.buyerInterests.push({
      name,
      phone,
      email,
      message: message || '',
      createdAt: new Date()
    })
    
    await property.save()
    
    return NextResponse.json({
      success: true,
      message: 'Interest submitted successfully'
    })
  } catch (error) {
    console.error('Error submitting interest:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit interest' },
      { status: 500 }
    )
  }
}

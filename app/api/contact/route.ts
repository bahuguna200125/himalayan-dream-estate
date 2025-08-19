import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, subject, and message are required' },
        { status: 400 }
      )
    }
    
    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Integrate with CRM
    
    // For now, we'll just log the contact request
    console.log('Contact form submission:', {
      name,
      email,
      phone,
      subject,
      message,
      timestamp: new Date().toISOString()
    })
    
    // You can integrate with services like:
    // - SendGrid for email notifications
    // - MongoDB for storing contact requests
    // - Slack/Discord for instant notifications
    
    return NextResponse.json({
      success: true,
      message: 'Contact request submitted successfully'
    })
  } catch (error) {
    console.error('Error processing contact request:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process contact request' },
      { status: 500 }
    )
  }
}

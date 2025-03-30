import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate required fields (in a real app, use a validation library like zod)
    const requiredFields = ['firstName', 'lastName', 'email', 'password', 'dateOfBirth', 'nationality', 'address'];
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // In a real app, this would:
    // 1. Check if the user already exists
    // 2. Hash the password
    // 3. Store the user in the database
    // 4. Send verification email
    
    // For demo purposes, we'll just return a success response
    // Generate a fake user ID
    const userId = 'user_' + Math.random().toString(36).substring(2, 15);
    
    // Generate a random ID number
    const idNumber = 'CN' + Math.floor(10000000 + Math.random() * 90000000);
    
    // Calculate issue and expiry dates
    const issueDate = new Date().toISOString();
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 5);
    
    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: userId,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        dateOfBirth: body.dateOfBirth,
        nationality: body.nationality,
        address: body.address,
        idNumber,
        issueDate,
        expiryDate: expiryDate.toISOString(),
        role: 'citizen',
        createdAt: issueDate,
        updatedAt: issueDate,
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
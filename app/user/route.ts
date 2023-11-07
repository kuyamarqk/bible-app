import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
   
    console.log('Request received: ', request);

    // Parse the JSON data from the request
    const data = await request.json();
    const { email, password, name, image } = data;
    console.log("email, password, name, image", email, password, name, image);
    const createdAt = new Date().toISOString();
    // Set updated_at to null
    const updatedAt = null;

    const result = await sql`
      INSERT INTO "User" (email, password, name, image )
      VALUES (${email}, ${password}, ${name}, ${image})
    `;
    console.log("result: " + result);
    const responseData = { message: 'Registration successful' };
    return NextResponse.json(responseData, { status: 200 });
  } catch (error: any) {
    console.error('Error in POST:', error);

    if (error.message.includes('duplicate key value')) {
      // If a user with the same email already exists, return a 400 Bad Request status
      return NextResponse.json({ error: 'User with the same email already exists' }, { status: 400 });
    }

    // For other errors, return a 500 Internal Server Error status
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
    try {
      // Function to create the "Users" table
      await sql`CREATE TABLE IF NOT EXISTS "User" (
          email varchar(255),
          password varchar(255),
          fullName varchar(255),
          image varchar(255)
        );`
  
      const result = await sql`SELECT * FROM "User"`;
  
      return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
      console.error('Error in GET:', error);
      return NextResponse.json({ error }, { status: 500 });
    }
  }
  

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { email, password, fullName, image } = data;

    const result = await sql`
      UPDATE User
      SET password = ${password}, fullName = ${fullName}, image = ${image}
      WHERE email = ${email}
    `;

    console.log('User updated:', data);

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error('Error in PUT:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const data = await request.json();
    const { email } = data;

    const result = await sql`
      DELETE FROM User
      WHERE email = ${email}
    `;

    console.log('User deleted:', email);

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error('Error in DELETE:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

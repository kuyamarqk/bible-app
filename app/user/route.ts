import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { stringify } from 'querystring';

export async function POST(request: Request) {
  try {
    // Parse the JSON data from the request
    const data = await request.json();
    const { email, password, name, image } = data;

    // Check if the email already exists in the database
    const existingUser = await sql`
      SELECT * FROM "User" WHERE email = ${email}
    `;

    if (existingUser.rowCount > 0) {
      console.error('User with the same email already exists'+ JSON,stringify(data.error));
      return NextResponse.json(
        { error: 'User with the same email already exists' },
        { status: 400 }
      );
    }

    // Validate password: At least 8 characters, alphanumeric
    if (password.length < 8 || !/^(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
      console.error('Password should be at least 8 characters and alphanumeric');
      return NextResponse.json(
        { error: 'Password should be at least 8 characters and alphanumeric' },
        { status: 400 }
      );
    }

    // Validate fullname (name): Not empty
    if (!name || name.trim() === '') {
      console.error('Fullname cannot be empty');
      return NextResponse.json(
        { error: 'Fullname cannot be empty' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // If the email doesn't exist and password and fullname are valid, proceed with registration
    const createdAt = new Date().toISOString();
    const updatedAt = null;

    const result = await sql`
      INSERT INTO "User" (email, password, name, image, created_at, updated_at)
      VALUES (${email}, ${hashedPassword}, ${name}, ${image}, ${createdAt}, ${updatedAt})
    `;

    console.log('User registered:', data);

    return NextResponse.json({ message: 'Registration successful' }, { status: 200 });
  } catch (error) {
    console.error('Error in POST:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

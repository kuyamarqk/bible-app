import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
     // Call the useRouter hook unconditionally

    try {
        // Parse the JSON data from the request
        const data = await request.json();
        const { email, password } = data;

        // Check if the email exists in the database
        const existingUserQuery = await sql`
            SELECT id, email, password, name FROM "User" WHERE email = ${email}
        `;

        // Ensure that the SQL query selects the 'password' column
        const existingUser = existingUserQuery.rows[0];

        if (!existingUser) {
            console.error('User with the provided email does not exist');
            return NextResponse.json(
                { error: 'User with the provided email does not exist' },
                { status: 400 }
            );
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            console.error('Invalid password');
            return NextResponse.json(
                { error: 'Invalid password' },
                { status: 400 }
            );
        }
      
        // Include userId in the JSON response
        const userId = existingUser.id;

        return NextResponse.json({ message: 'Login successful', userId }, { status: 200 });
    } catch (error) {
        console.error('Error in POST:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

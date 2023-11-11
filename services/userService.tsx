// src/services/userService.ts

import { PrismaClient } from '@prisma/client';

// Define an interface for userData
interface UserData {
    name: string;
    email: string;
    password: string;
    image: string;
}
interface Credentials {
    email: string;
    password: string;
}

const prisma = new PrismaClient();

// Function to register a new user
export const registerUser = async (userData: UserData) => {

    try {
        const newUser = await prisma.user.create({
            data: {
                ...userData,
                image: 'default-image-url.jpg', // Provide a default image URL
            },
        });
        console.log("new User: " + newUser);
        return newUser;
    } catch (error) {
        console.error("new User: " + error);
    }
};

// Function to authenticate and log in a user
export const loginUser = async (credentials: Credentials) => {
    try {
        // Your code here to log in with the provided credentials
        // For example, querying the database and checking if the user exists
        const user = await prisma.user.findFirst({
            where: {
                email: credentials.email,
                password: credentials.password,
            },
        });

        return user;
    } catch (error) {
        throw error;
    }
};

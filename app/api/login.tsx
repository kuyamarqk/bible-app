// pages/api/user/login.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const login = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body;

            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // You can generate a JWT token here and send it as a response for user authentication.

            res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            res.status(400).json({ message: 'Login failed' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};

export default login;

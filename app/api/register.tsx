// pages/api/user/register.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const register = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const { name, email, password, image } = req.body;

            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                    image: image || 'default-image-url.jpg',
                },
            });

            res.status(200).json(newUser);
        } catch (error) {
            res.status(400).json({ message: 'Registration failed' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};

export default register;

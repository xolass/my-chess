import { prisma } from "@/db/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

const SALT_ROUNDS = 12;

const createUserSchema = z.object({
  username: z.string({ required_error: "field 'username' required" }).min(3).max(20),
  email: z.string({ required_error: "field 'email' required" }).email(),
  password: z.string({ required_error: "field password required" }).min(8, ""),
});

type UserSchema = z.infer<typeof createUserSchema>;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsedBody = createUserSchema.safeParse(body);

    if (!parsedBody.success) {
      const errors = parsedBody.error;
      return NextResponse.json({ message: errors }, { status: 400 });
    }

    const { username, email, password } = parsedBody.data as UserSchema;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists." }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user in database
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "User registered successfully.", id: user.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}

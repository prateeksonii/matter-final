"use server";

import { db } from "@/db/conn";
import { user } from "@/db/schema";

export const signUp = async (prevState: any, data: FormData) => {
  try {
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    const createdUser = await db
      .insert(user)
      .values({
        name,
        email,
        password: await Bun.password.hash(password, "argon2d"),
      })
      .returning({
        id: user.id,
      });

    return {
      ok: true,
      user: createdUser[0],
    };
  } catch (err: any) {
    console.log(err);

    return {
      ok: false,
      err: err.message,
    };
  }
};

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import { z } from "zod";

const formSchema = z
  .object({
    email: z.string().email("올바른 이메일 주소를 입력해주세요."),
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
    confirmPassword: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
  });

export type FormValues = z.infer<typeof formSchema>;

export async function login(
  _prevState: any,
  formData: FormData,
): Promise<ActionState | void> {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validation = formSchema.safeParse(data);

  if (!validation.success) {
    const { fieldErrors } = validation.error.flatten();
    return {
      code: "VALIDATION_ERROR",
      fieldErrors,
    };
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    switch (error.status) {
      case 400:
        return {
          code: "AUTH_ERROR",
          message: "이메일 또는 비밀번호가 올바르지 않습니다.",
        };
      default:
        return {
          code: "INTERNAL_ERROR",
          err: error,
        };
    }
  }

  revalidatePath("/dashboard", "layout");
  redirect("/dashboard");
}

export async function signup(
  _prevState: any,
  formData: FormData,
): Promise<ActionState | null> {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const validation = formSchema.safeParse(data);

  if (!validation.success) {
    const { fieldErrors } = validation.error.flatten();
    return {
      code: "VALIDATION_ERROR",
      fieldErrors,
    };
  }

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    switch (error.status) {
      case 422:
        return {
          code: "EXISTS_ERROR",
          key: "email",
          message: "이미 사용 중인 이메일입니다.",
        };
      default:
        return {
          code: "INTERNAL_ERROR",
          err: error,
        };
    }
  }

  revalidatePath("/dashboard", "layout");
  redirect("/dashboard");
}

"use client";

import { login, signup } from "./actions";

import { useFormState } from "react-dom";
import { useFormAction } from "../hooks/useFormAction";
import { LoginFormValues, SignupFormValues } from "./actions";
import FormFields from "./FormFields";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginState, loginAction] = useFormState(login, null);
  const [signUpState, signUpAction] = useFormState(signup, null);
  const loginForm = useFormAction<LoginFormValues>({
    state: isSignUp ? signUpState : loginState,
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSuccess: () => {},
  });

  const signUpForm = useFormAction<LoginFormValues>({
    state: isSignUp ? signUpState : loginState,
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSuccess: () => {},
  });

  const currentForm = isSignUp ? signUpForm : loginForm;

  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-2">
      <div className="grid place-content-center">
        <Form {...currentForm}>
          <form
            className="grid gap-4"
            action={isSignUp ? signUpAction : loginAction}
          >
            <FormFields isSignUp={isSignUp} />
            <div className="flex items-center justify-center">
              <p className="mr-2">
                {isSignUp
                  ? "이미 계정이 있으신가요?"
                  : "아직 계정이 없으신가요?"}
              </p>
              <Button
                type="button"
                variant="link"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "로그인" : "회원가입"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="hidden items-center justify-center bg-gray-100 md:flex md:flex-col">
        <p className="text-3xl font-bold">livinbooks</p>
        <p>나를 위한 퍼즐을 만들어보세요.</p>
      </div>
    </div>
  );
};

export default LoginPage;

"use client";

import React from "react";
import { login, signup } from "./actions";
import LoginRightImage from "@/app/images/login.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LoginPage = () => {
  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-2">
      <div className="grid place-content-center">
        {/* <h1>ingspiring</h1> */}
        <form className="grid gap-4">
          <label htmlFor="email">이메일</label>
          <Input id="email" name="email" type="email" required />
          <label htmlFor="password">비밀번호</label>
          <Input id="password" name="password" type="password" required />
          <Button formAction={login}>로그인</Button>
          <div className="flex items-center">
            <p className="mr-2">아직 아이디가 없나요?</p>
            <Button variant="link" formAction={signup}>
              회원가입
            </Button>
          </div>
        </form>
      </div>
      <div className="hidden items-center justify-center bg-gray-100 md:flex">
        {/* <LoginRightImage /> */}
        당신의 생각을 살아 숨쉬게.
      </div>
    </div>
  );
};

export default LoginPage;

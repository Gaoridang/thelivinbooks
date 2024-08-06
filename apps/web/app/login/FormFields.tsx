import { Button } from "@gaoridang/ui/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@gaoridang/ui/components/ui/form";
import { Input } from "@gaoridang/ui/components/ui/input";
import React from "react";
import { useFormStatus } from "react-dom";
import { useFormContext } from "react-hook-form";

interface Props {
  isSignUp?: boolean;
}

const FormFields = ({ isSignUp }: Props) => {
  const form = useFormContext();
  const { pending } = useFormStatus();

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>이메일</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="email"
                placeholder="hello@email.com"
                disabled={pending}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>비밀번호</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="password"
                placeholder="********"
                disabled={pending}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {isSignUp && (
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호 확인</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="********"
                  disabled={pending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <Button type="submit" disabled={pending}>
        {isSignUp ? "회원가입" : "로그인"}
      </Button>
    </div>
  );
};

export default FormFields;

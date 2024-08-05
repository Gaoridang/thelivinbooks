import { AuthError } from "@supabase/supabase-js";
import { AUTH_ERROR_MESSAGES } from "../types/actionTypes";

const handleAuthError = (error: AuthError) => {
  const errorCode = error.status as keyof typeof AUTH_ERROR_MESSAGES;
  const errorMessage =
    AUTH_ERROR_MESSAGES[errorCode] || "알 수 없는 오류가 발생했습니다.";

  return {
    status: "AUTH_ERROR",
    error,
    message: errorMessage,
  } as const;
};

export default handleAuthError;

import { PostgrestError } from "@supabase/supabase-js";
import { POSTGREST_ERROR_MESSAGES } from "../types/actionTypes";

const handlePostgrestError = (error: PostgrestError) => {
  const errorCode = error.code as keyof typeof POSTGREST_ERROR_MESSAGES;
  const errorMessage =
    POSTGREST_ERROR_MESSAGES[errorCode] || "알 수 없는 오류가 발생했습니다.";

  return {
    status: "POSTGREST_ERROR",
    error,
    message: errorMessage,
  } as const;
};

export default handlePostgrestError;

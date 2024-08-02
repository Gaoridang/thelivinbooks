import { AuthError, PostgrestError } from "@supabase/supabase-js";

export type BaseActionReturnType<T> =
  | {
      status: "SUCCESS";
      data: T | T[] | null;
    }
  | {
      status: "INTERNAL_ERROR";
      error: any;
    }
  | {
      status: "VALIDATION_ERROR";
      fieldErrors: {
        [field: string]: string[];
      };
    };

export type SupabaseActionErrorReturnType =
  | {
      status: "AUTH_ERROR";
      error: AuthError;
      message: string;
    }
  | {
      status: "EXISTS_ERROR";
      error: AuthError;
      message: string;
    }
  | {
      status: "INSERT_ERROR";
      error: PostgrestError;
      message: string;
    }
  | {
      status: "UPDATE_ERROR";
      error: PostgrestError;
      message: string;
    }
  | {
      status: "GET_ERROR";
      error: PostgrestError;
      message: string;
    };

export type SupabaseActionReturnType<T> =
  | BaseActionReturnType<T>
  | SupabaseActionErrorReturnType;

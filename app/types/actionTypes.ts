import { PostgrestError } from "@supabase/supabase-js";

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
      status: "EXISTS_ERROR";
      error: PostgrestError;
    }
  | {
      status: "INSERT_ERROR";
      error: PostgrestError;
    }
  | {
      status: "UPDATE_ERROR";
      error: PostgrestError;
    }
  | {
      status: "GET_ERROR";
      error: PostgrestError;
      message: string;
    };

export type SupabaseActionReturnType<T> =
  | BaseActionReturnType<T>
  | SupabaseActionErrorReturnType;

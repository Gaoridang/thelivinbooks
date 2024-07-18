import { supabase } from "@/app/utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { toast } from "sonner";

class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = supabase;
  }

  async upsert<T>(table: string, data: T | T[]) {
    try {
      const { data: upsertedData, error } = await this.supabase
        .from(table)
        .upsert(data)
        .select();

      if (error) {
        this.showToast(
          "업데이트 실패",
          "업데이트 중 문제가 발생했습니다. 다시 시도해 주세요.",
        );
      } else {
        return upsertedData as T[];
      }
    } catch (error) {
      this.showToast("업데이트 실패", "네트워크 에러. 다시 시도해 주세요.");
      return [];
    }
  }

  async insert<T>(table: string, data: T | T[]) {
    try {
      const { data: insertedData, error } = await this.supabase
        .from(table)
        .insert(data)
        .select();

      if (error) {
        this.showToast(
          "업데이트 실패",
          "업데이트 중 문제가 발생했습니다. 다시 시도해 주세요.",
        );
      } else {
        return insertedData as T[];
      }
    } catch (error) {
      this.showToast("업데이트 실패", "네트워크 에러. 다시 시도해 주세요.");
      return [];
    }
  }

  private showToast(title: string, description: string) {
    toast(title, {
      description,
    });
  }

  private handleError(error: Error) {
    console.error(error);
    this.showToast(
      "오류",
      "프로필 업데이트 중 문제가 발생했습니다. 다시 시도해 주세요.",
    );
  }
}

export const supabaseService = new SupabaseService();

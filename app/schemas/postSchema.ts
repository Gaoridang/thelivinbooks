import { z } from "zod";

export const PostSchema = z.object({
  title: z
    .string()
    .min(1, "제목을 입력하세요.")
    .max(100, "제목은 최대 100자까지 입력 가능합니다."),
  content: z
    .string()
    .min(1, { message: "내용을 입력하세요." })
    .max(500, { message: "내용은 최대 500자까지 입력 가능합니다." }),
});

export type Post = z.infer<typeof PostSchema>;

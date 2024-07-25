import { createClient } from "@/app/utils/supabase/server";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  content: string;
}

const Posts = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: posts, error } = await supabase
    .from("posts")
    .select("id, title, content, created_at")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false });

  return (
    <div className="grid gap-2">
      {posts?.map((post) => (
        <Link
          key={post.id}
          href={`/posts/${post.id}`}
          className="bg-gray-100/50 p-4"
        >
          <div className="mb-2 flex items-center justify-between">
            <p className="font-bold">{post.title}</p>
            <p className="text-sm font-medium text-gray-400">
              {post.created_at.split("T")[0]}
            </p>
          </div>
          <p className="line-clamp-2 text-sm text-gray-700">{post.content}</p>
        </Link>
      ))}
    </div>
  );
};

export default Posts;

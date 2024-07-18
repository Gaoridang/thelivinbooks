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
    .select("id, title, content")
    .eq("user_id", user?.id);

  return (
    <div>
      {posts?.map((post) => (
        <Link href={`/posts/${post.id}`} key={post.id}>
          {post.title}
        </Link>
      ))}
    </div>
  );
};

export default Posts;

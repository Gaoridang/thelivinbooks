"use client";

import { supabase } from "@/app/utils/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  postId: string;
}

const AIReply = ({ postId }: Props) => {
  const [reply, setReply] = useState("");
  const [feedbackStyle, setFeedbackStyle] = useState("");
  const [status, setStatus] = useState<"loading" | "streaming" | "completed">(
    "loading",
  );

  useEffect(() => {
    let eventSource: EventSource | null = null;

    const fetchReplyFromSupabase = async () => {
      const { data, error } = await supabase
        .from("ai_replies")
        .select("feedback_style, content")
        .eq("post_id", postId);

      if (error) {
        console.error("Error fetching AI reply:", error);
        return "";
      } else if (data.length === 0) {
        return "";
      } else {
        const content = data[0].content;

        setReply(data[0].content);
        setFeedbackStyle(data[0].feedback_style);
        setStatus("completed");
        return data[0].content;
      }
    };

    const generateReply = async () => {
      setStatus("streaming");
      eventSource = new EventSource(`/api/generate-ai-reply?postId=${postId}`);

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          switch (data.type) {
            case "feedbackStyle":
              setFeedbackStyle(data.feedbackStyle);
              break;
            case "content":
              setReply((prev) => prev + data.content);
              break;
            case "done":
              eventSource?.close();
              setStatus("completed");
              break;
            default:
              console.warn("Unknown message type:", data.type);
          }
        } catch (error) {
          console.error("Error parsing event data:", error);
        }
      };

      eventSource.onerror = (error) => {
        console.error("Error from event source:", error);
        setStatus("completed");
      };
    };

    fetchReplyFromSupabase().then((reply) => {
      if (!reply) {
        generateReply();
      }
    });

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [postId]);

  if (status === "loading") {
    return (
      <div className="space-y-2 rounded-md bg-gray-100/50 p-4">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-gray-900" />
          <Skeleton className="h-4 w-24 bg-gray-300" />
        </div>
        <Skeleton className="h-4 w-full bg-gray-300" />
      </div>
    );
  }

  return (
    <div className="rounded-md bg-gray-100/50 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-gray-900" />
          <span className="text-sm font-bold">{feedbackStyle}</span>
        </div>
        {/* <ThumbsButtons /> */}
      </div>
      <p className="whitespace-pre-wrap leading-8">{reply}</p>
      {status === "streaming" && (
        <p className="text-sm text-gray-500">Generating AI reply</p>
      )}
    </div>
  );
};

export default AIReply;

export const generateAIReply = async ({
  title,
  content,
  postId,
}: {
  title: string;
  content: string;
  postId: string;
}) => {
  try {
    const response = await fetch("/api/generate-ai-reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId,
        title,
        content,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate AI reply");
    }

    const data = await response.json();
    console.log("AI reply generated:", data.text);
    // Optionally, update UI or show a notification
  } catch (error) {
    console.error("Error generating AI reply:", error);
  }
};

import { CategorizedAnswers } from "@/app/types";
import { createClient } from "@/app/utils/supabase/server";

const Answers = async () => {
  const supabase = createClient();
  const { data, error } = (await supabase.rpc("get_categorized_answers")) as {
    data: CategorizedAnswers;
    error: any;
  };

  if (!data || error) {
    return <div>Failed to fetch answers</div>;
  }

  return (
    <div>
      {Object.entries(data).map(([category, answers]) => (
        <div key={category}>
          <h2>{category}</h2>
          <ul>
            {answers.map((answer) => (
              <li key={answer.id} className="max-w-72 rounded-xl border-2 p-4">
                <p className="line-clamp-2 font-semibold">{answer.question}</p>
                <p className="truncate">{answer.title}</p>
                <p className="truncate">{answer.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Answers;

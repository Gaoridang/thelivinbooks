import { Answer, CategorizedAnswers, Category } from "@/app/types";
import { createClient } from "@/app/utils/supabase/server";

const categoryOrder: Category[] = ["과거", "현재", "미래"];

const Answers = async () => {
  const supabase = createClient();
  const { data, error } = (await supabase.rpc("get_categorized_answers")) as {
    data: CategorizedAnswers;
    error: any;
  };

  if (!data || error) {
    return <div>Failed to fetch answers</div>;
  }

  const sortedEntries: [Category, Answer[]][] = categoryOrder
    .filter(
      (category): category is Category =>
        category in data && Array.isArray(data[category]),
    )
    .map((category) => [category, data[category] || []]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {sortedEntries.map(([category, answers]) => (
        <div key={category} className="aspect-square rounded-lg border">
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

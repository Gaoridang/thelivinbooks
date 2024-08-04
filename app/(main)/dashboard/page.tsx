import AnswersContainer from "./_components/answers/AnswersContainer";
import Logo from "./_components/Logo";
import RecommendedQuestion from "./_components/RecommendedQuestion";

const DashboardPage = async () => {
  return (
    <div>
      {/* <TotalAnswers totalAnswers={totalAnswers} /> */}
      {/* <Logo /> */}

      <RecommendedQuestion />

      <AnswersContainer />
    </div>
  );
};

export default DashboardPage;

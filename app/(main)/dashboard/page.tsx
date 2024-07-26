import Actions from "./_components/actions";
import Answers from "./_components/answers/Answers";

const DashboardPage = async () => {
  return (
    <div className="mx-auto mt-6 grid max-w-2xl gap-6 p-6 md:p-0">
      <Actions />
      <Answers />
    </div>
  );
};

export default DashboardPage;

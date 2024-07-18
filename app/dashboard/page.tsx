import Actions from "./_components/actions";
import Metrics from "./_components/metrics";
import MostRecentWriting from "./_components/mostRecentWriting";

const DashboardPage = async () => {
  return (
    <div className="mx-auto max-w-3xl p-8">
      <Actions />
      <Metrics />
      <MostRecentWriting />
    </div>
  );
};

export default DashboardPage;

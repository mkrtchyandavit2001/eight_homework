import CurrentLearningCard from "../CurrentLearningCard/CurrentLearningCard";
import NextLessonCard from "../NextLessonCard/NextLessonCard";
import ProgressOverviewCard from "../ProgressOverviewCard/ProgressOverviewCard";
import QuickActionsCard from "../QuickActionsCard/QuickActionsCard";
import UpcomingLessonCard from "../UpcomingLessonCard/UpcomingLessonCard";



export default function LearningTab() {
  return (
    <div className="flex flex-col items-start gap-5 lg:flex-row">
      <div className="flex w-full min-w-0 flex-1 flex-col gap-5">
        <CurrentLearningCard />
        <ProgressOverviewCard />
        <UpcomingLessonCard />
      </div>

      <aside className="flex w-full shrink-0 flex-col gap-5 lg:w-[288px]">
        <QuickActionsCard />
        <NextLessonCard />
      </aside>
    </div>
  );
}
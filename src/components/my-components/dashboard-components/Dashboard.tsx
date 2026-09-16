import {
  DashboardDto,
  DashboardRecentActivityDto,
  DashboardRecentTaskDto,
} from "@/dto/Dashboard.dto";
import { DashboardCard } from "./DashboardCard";
import { DashboardRecentActivityCard } from "./DashboardRecentActivityCard";
import { DashboardRecentTaskCard } from "./DashboardRecentTaskCard";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { DashboardChart } from "./DashboardChart";

export const Dashboard = () => {
  return (
    <main>
      {/* header */}
      <div className="mb-8">
        <h1 className="text-4xl bg-green-100 text-green-700 p-4 rounded-lg inline-block font-semibold">
          Welcome, Pujan Prajapati! 👋
        </h1>
        <p className="text-neutral-600 text-3xl ml-2">
          Stay organized. Get things done efficiently.
        </p>
      </div>

      {/* cards */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {DashboardDto.map((item) => (
            <DashboardCard
              count={item.count}
              title={item.title}
              Icon={item.Icon}
              key={item.id}
            />
          ))}
        </div>

        {/* additional content */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* recent task */}
          <div className="border rounded-lg p-4">
            <h1 className="text-lg font-semibold mb-4">Recent Tasks</h1>
            <div className="space-y-4">
              {DashboardRecentTaskDto.map((item) => (
                <DashboardRecentTaskCard
                  status={item.status}
                  project={item.project}
                  title={item.title}
                  updatedAt={item.updatedAt}
                  key={item.id}
                />
              ))}
              <Link to="/" className="float-end">
                <Button variant={"link"}>View all tasks</Button>
              </Link>
            </div>
          </div>

          {/* chart */}
          <DashboardChart />

          {/* recent activities */}
          <div className="border rounded-lg p-4">
            <h1 className="text-lg font-semibold mb-4">Recent Activites</h1>
            <div className="space-y-4">
              {DashboardRecentActivityDto.map((item) => (
                <DashboardRecentActivityCard
                  description={item.description}
                  name={item.name}
                  status={item.status}
                  updatedAt={item.updatedAt}
                  key={item.id}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

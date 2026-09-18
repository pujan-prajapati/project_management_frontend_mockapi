import { DashboardCard } from "./DashboardCard";
import { DashboardRecentTaskCard } from "./DashboardRecentTaskCard";
import { DashboardChart } from "./DashboardChart";
import { Card, CardContent } from "@/components/ui/card";

export const DashboardPage = () => {
  const fullName = localStorage.getItem("fullName");

  return (
    <main className="flex flex-col h-full">
      <section className="space-y-6 flex-1">
        {/* header */}
        <div className="mb-8">
          <h1 className="text-4xl bg-green-50 text-green-700 p-4 rounded-lg inline-block font-semibold">
            Welcome, {fullName}! 👋
          </h1>
          <p className="italic text-neutral-600 text-3xl ml-2">
            Stay organized. Get things done efficiently.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          <DashboardCard />
        </div>

        {/* additional content */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* recent task */}
          <Card className="ring-gray-200 shadow-md shadow-gray-200">
            <CardContent className="space-y-3">
              <h1 className="text-lg font-semibold mb-4 text-gray-800">
                Recent Tasks
              </h1>

              <DashboardRecentTaskCard />
            </CardContent>
          </Card>

          {/* chart */}
          <DashboardChart />

          {/* recent activities */}
          <div className="rounded-lg shadow-md">
            <img
              src="https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?q=80&w=1039&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Recent Activity"
              className="rounded-lg h-full object-cover"
            />
          </div>
          {/* <Card className="h-fit ring-gray-200 shadow-md shadow-gray-200">
            <CardContent className="space-y-4">
              <h1 className="text-lg font-semibold mb-4 text-gray-800">
                Recent Activites
              </h1>
              {DashboardRecentActivityDto.map((item) => ( <DashboardRecentActivityCard
                  description={item.description}
                  name={item.name}
                  status={item.status}
                  updatedAt={item.updatedAt}
                  key={item.id}
                />
              ))}
            </CardContent>
          </Card> */}
        </div>
      </section>
    </main>
  );
};

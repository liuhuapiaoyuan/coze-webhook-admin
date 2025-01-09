import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardStats } from "@/components/dashboard/stats";
import { Welcome } from "./_components/welcome";
import { NewUsers } from "./_components/new-users";
import { UserService } from "@/service/user.service";
import { startOfDay } from "date-fns";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default async function DashboardPage() {
  const newUsers = await UserService.getUsers({
    where: {
      createdAt: {
        gte: startOfDay(new Date()),
      },
    },
    page: 1,
    pageSize: 20,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto space-y-8 py-10">
      <DashboardHeader />
      <Suspense fallback={<LoadingSpinner />}>
        <Welcome />
        <DashboardStats />
        <NewUsers users={newUsers.data} />
      </Suspense>
    </div>
  );
}

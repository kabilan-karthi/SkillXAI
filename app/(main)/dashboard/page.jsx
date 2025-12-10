import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { getUserOnboardingStatus } from "@/actions/user";
import DashboardView from "./_components/dashboard-view";

export default async function DashboardPage() {
  // 1. Check onboarding
  const { isOnboarded } = await getUserOnboardingStatus();

  if (!isOnboarded) {
    redirect("/onboarding");
  }

  // 2. Get current user
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in"); // or handle unauthorized
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { industry: true },
  });

  // 3. If no industry, no insights yet
  if (!user?.industry) {
    return (
      <div className="container mx-auto">
        <p>No industry selected yet.</p>
      </div>
    );
  }

  // 4. Fetch AI-generated IndustryInsight for user's industry
  const insights = await db.industryInsight.findUnique({
    where: {
      industry: user.industry,
    },
  });

  return (
    <div className="container mx-auto">
      {insights ? (
        <DashboardView insights={insights} />
      ) : (
        <p>No insights available yet.</p>
      )}
    </div>
  );
}

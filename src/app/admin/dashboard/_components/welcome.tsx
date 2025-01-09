import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import { getGreeting } from "@/lib/utils";

export async function Welcome() {
  const session = await auth();
  const greeting = getGreeting();

  if (!session?.user) return null;

  return (
    <div className="mb-8 flex items-center gap-4">
      <Avatar className="h-16 w-16">
        <AvatarImage src={session.user.image ?? ""} />
        <AvatarFallback className="bg-primary/10">
          {session.user.name?.[0] ?? "U"}
        </AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {greeting}，{session.user.name}
        </h2>
        <p className="text-muted-foreground">欢迎回到工作台，祝您工作愉快！</p>
      </div>
    </div>
  );
}

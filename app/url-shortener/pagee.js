"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ComingSoonPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-center">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            This feature is under development and will be available soon. Stay
            tuned!
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}

export default ComingSoonPage;

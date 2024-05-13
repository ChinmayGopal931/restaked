import { PageHeader, PageHeaderHeading } from "@/components/shadcn/page-header";
import { Card } from "@/components/shadcn/card";
import { useState } from "react";

import OperatorDashboard from "@/components/Dashboard/Dashboard";

export default function Dashboard() {
  return (
    <div>
      {/* {isModalOpen && <SignUp closeModal={closeModal} />} */}
      <PageHeader className="display flex justify-center">
        <PageHeaderHeading>Dashboard</PageHeaderHeading>
      </PageHeader>

      <div className="flex flex-col items-center justify-center">
        <Card className="w-[65%]">
          <OperatorDashboard />
        </Card>
      </div>
    </div>
  );
}

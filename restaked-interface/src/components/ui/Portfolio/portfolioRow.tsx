import { Card } from "@/components/shadcn/card";

export function PortfolioRow() {
  return (
    <Card className="w-full sm:w-[85%]">
      <div className="flex flex-col sm:flex-row justify-around items-center p-4">
        <div className="flex flex-col items-center mb-4 sm:mb-0 mr-6">
          <img src="/assets/sUSDC.svg" />
        </div>
        <div className="flex flex-col items-center mb-4 sm:mb-0 mr-6">
          <p className="text-[#F8FAFC]">sUSDC Price</p>
          <p className="text-[#94A3B8]">$1.10</p>
        </div>

        <div className="flex flex-col items-center mb-4 sm:mb-0 mr-6">
          <p className="text-[#F8FAFC]">Reserved Amount</p>
          <p className="text-[#94A3B8]">$1,1201.10</p>
        </div>

        <div className="flex flex-col items-center mb-4 sm:mb-0 mr-6">
          <p className="text-[#F8FAFC]">Holding Period</p>
          <p className="text-[#94A3B8]">14 Days</p>
        </div>

        <div className="flex flex-col items-center  mb-4 sm:mb-0 mr-6">
          <p className="text-[#F8FAFC]">Staked Amount</p>
          <p className="text-[#94A3B8]">$1,1201.10</p>
        </div>
      </div>
    </Card>
  );
}

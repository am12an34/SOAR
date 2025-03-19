
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

const DashboardCard = ({ title, icon, children, className }: DashboardCardProps) => {
  return (
    <div className={cn("rounded-xl border bg-card p-6 shadow-sm", className)}>
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-anarc-teal/10 p-2 rounded-full text-anarc-teal">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DashboardCard;

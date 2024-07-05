//CountStatsCard.tsx
import { ITotalStats } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const CountStatsCard = ({ title, count, icon }: ITotalStats) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{count}</div>
      </CardContent>
    </Card>
  );
};
export default CountStatsCard;

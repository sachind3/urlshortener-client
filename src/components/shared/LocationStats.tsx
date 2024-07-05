//LocationStats.tsx
import { ArcElement, Chart } from "chart.js";
import { defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { memo } from "react";
Chart.register(ArcElement);

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";

interface ClickData {
  city: string;
}

interface LocationStatsProps {
  data?: ClickData[];
}

const LocationStats = memo(({ data = [] }: LocationStatsProps) => {
  const cityCount = data.reduce(
    (acc: Record<string, number>, item: ClickData) => {
      if (acc[item.city]) {
        acc[item.city] += 1;
      } else {
        acc[item.city] = 1;
      }
      return acc;
    },
    {}
  );

  const cities = Object.entries(cityCount).map(([city, count]) => ({
    city,
    count,
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <Line
        data={{
          labels: cities.map((data) => data.city),
          datasets: [
            {
              label: "Count",
              data: cities.map((data) => data.count),
              backgroundColor: "#064FF0",
              borderColor: "#064FF0",
            },
          ],
        }}
        options={{
          elements: {
            line: {
              tension: 0,
            },
          },
        }}
      />
    </div>
  );
});

export default LocationStats;

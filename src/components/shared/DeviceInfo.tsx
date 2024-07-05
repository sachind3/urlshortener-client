//DeviceInfo.tsx
import { ArcElement, Chart } from "chart.js";
import { defaults } from "chart.js/auto";
import { memo } from "react";
import { Bar } from "react-chartjs-2";

Chart.register(ArcElement);

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";

interface ClickData {
  device: string;
}

interface DeviceInfoProps {
  data?: ClickData[];
}

const DeviceInfo = memo(({ data = [] }: DeviceInfoProps) => {
  const deviceCount = data.reduce(
    (acc: Record<string, number>, item: ClickData) => {
      if (!acc[item.device]) {
        acc[item.device] = 0;
      }
      acc[item.device]++;
      return acc;
    },
    {}
  );

  const result = Object.keys(deviceCount).map((device) => ({
    device,
    count: deviceCount[device],
  }));

  return (
    <>
      <div style={{ width: "100%", height: 300 }}>
        <Bar
          data={{
            labels: result.map((data) => data.device),
            datasets: [
              {
                label: "Count",
                data: result.map((data) => data.count),
              },
            ],
          }}
        />
      </div>
    </>
  );
});

export default DeviceInfo;

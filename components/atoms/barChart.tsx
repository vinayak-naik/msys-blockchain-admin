import React from "react";
import { Bar } from "react-chartjs-2";

// defaults.global.tooltips.enabled = false;
// defaults.global.legend.position = "bottom";

const BarChart = (props: any) => {
  const { array1, array2 } = props;
  // const p = props; //eslint-disable-line
  return (
    <div>
      <Bar
        data={{
          labels: [0, 1, 2, 3, 4, 5],
          datasets: [
            // {
            //   label: "# of votes",
            //   data: [12, 19, 3, 5, 2, 3],
            //   backgroundColor: [
            //     "rgba(255, 99, 132, 0.2)",
            //     "rgba(54, 162, 235, 0.2)",
            //     "rgba(255, 206, 86, 0.2)",
            //     "rgba(75, 192, 192, 0.2)",
            //     "rgba(153, 102, 255, 0.2)",
            //     "rgba(255, 159, 64, 0.2)",
            //   ],
            //   borderColor: [
            //     "rgba(255, 99, 132, 1)",
            //     "rgba(54, 162, 235, 1)",
            //     "rgba(255, 206, 86, 1)",
            //     "rgba(75, 192, 192, 1)",
            //     "rgba(153, 102, 255, 1)",
            //     "rgba(255, 159, 64, 1)",
            //   ],
            //   borderWidth: 1,
            // },
            {
              label: "Betting",
              data: array1,
              // data: [47, 52, 67, 58, 9, 50, 27, 38],
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "Lottery",
              data: array2,
              // data: [27, 32, 27, 18, 9, 70, 21, 58],
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        }}
        height={300}
        width={560}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 16,
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;

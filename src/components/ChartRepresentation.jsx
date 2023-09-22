import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartRepresentation = (props) => {
  // Sample data (you should replace this with your actual data)
  const data = {
    labels: ["Done", "Not Done"],
    datasets: [
      {
        data: props.data,
        backgroundColor: ["#3DA9FC", "#EF4444"],
        borderRadius: 0,
      },
    ],
  };

  return (
    <div className="text-center flex flex-col justify-center items-center">
      <h1 className="text-4xl">Questions Status</h1>
      <div className="mt-5 h-96 w-96">
        <Pie data={data} width={"50px"} height={"50px"} />
      </div>
    </div>
  );
};

export default ChartRepresentation;

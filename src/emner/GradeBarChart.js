import React from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from "recharts";

const LetterGradeBarChart = ({ graphData }) => {
  return (
    <div style={{ width: "60vw", height: "200px" }}>
      <ResponsiveContainer minWidth={10} minHeight={10}>
        <BarChart data={graphData} style={{ marginTop: "2rem" }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="antall" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LetterGradeBarChart;

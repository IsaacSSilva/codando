import React from "react";
import Tooltip from "./Tooltip";

export interface Day {
  date: string;
  count: number;
}

export interface GitHubHeatmapProps {
  data: Day[]; // lista de dias com contagem de commits
  weekDays?: string[];
}

const colorBase: string = "gray"
const colorProgresao: string = "indigo"

const colors = [
  `bg-gray-200`,
  `bg-indigo-100`,
  `bg-indigo-300`,
  `bg-indigo-500`,
  `bg-indigo-700`,
];

function getColor(count: number) {
  if (count === 0) return colors[0];
  if (count < 3) return colors[1];
  if (count < 6) return colors[2];
  if (count < 10) return colors[3];
  return colors[4];
}

export const CodeHeatmap: React.FC<GitHubHeatmapProps> = ({ data }) => {
  // transforma em matriz semanas x dias
  const weeks: Day[][] = [];
  let week: Day[] = [];

  data.forEach((day, i) => {
    week.push(day);
    if ((i + 1) % 7 === 0) {
      weeks.push(week);
      week = [];
    }
  });
  if (week.length) weeks.push(week);

  return (
    <div className="flex space-x-1">
      {weeks.map((week, i) => (
        <div key={i} className="flex flex-col space-y-1">
          {week.map((day) => (
            <Tooltip text={`${day.date}: ${day.count} commits`} position="top">
              <div
                key={day.date}
                className={`size-2.5 ${getColor(day.count)} rounded-sm`}
              />
            </Tooltip>
            
          ))}
        </div>
      ))}
    </div>
  );
};

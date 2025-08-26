import type { StatsProps } from "../types";

function Stats({ pointsCount, historyCount, futureCount }: StatsProps) {
  return (
    <div className="stats">
      <div className="stat-item">
        <span className="stat-label">Points on canvas:</span>
        <span className="stat-value">{pointsCount}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">History states:</span>
        <span className="stat-value">{historyCount}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Future states:</span>
        <span className="stat-value">{futureCount}</span>
      </div>
    </div>
  );
}

export default Stats;

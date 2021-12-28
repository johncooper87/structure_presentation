export interface BarOptions {
  barThickness: number;
  barPercentage: number;
  categoryPercentage: number;
}

function getSizeToFitBars(totalBars: number, options: BarOptions, totalPadding = 20) {
  const { barThickness, barPercentage = 0.9, categoryPercentage = 0.8 } = options;
  return (barThickness * totalBars) / barPercentage / categoryPercentage + totalPadding;
}

export default getSizeToFitBars;

/* eslint-disable no-continue */
import { Chart, LegendItem } from 'chart.js';

function generateLegendLabels(chart: Chart) {
  const {
    data: { datasets, labels },
  } = chart;

  const legendItems: LegendItem[] = [];
  for (const datasetIndex in datasets) {
    const dataset = datasets[datasetIndex];
    for (const dataIndex in dataset.data) {
      const label = labels[dataIndex];
      const value = dataset.data[dataIndex].toString();
      const color = dataset.backgroundColor[dataIndex].toString();
      if (value === '0') continue;
      legendItems.push({
        text: label + ': ' + value,
        fillStyle: color,
        datasetIndex: Number(datasetIndex),
        strokeStyle: 'transparent',
      });
    }
  }
  return legendItems;
}

export default generateLegendLabels;

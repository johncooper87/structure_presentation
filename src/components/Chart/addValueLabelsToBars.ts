import { Chart } from 'chart.js';
import { fontFamily, fontSize, fontColor } from './settings';

function addValueLabelsToBars(chart: Chart, vertical = false) {
  const {
    data: { datasets },
    // @ts-expect-error
    _metasets,
    ctx,
  } = chart;

  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.fillStyle = fontColor;

  const sign = vertical ? -1 : 1;

  for (const datasetIndex in datasets) {
    const dataset = datasets[datasetIndex];
    const metaset = _metasets[datasetIndex];
    for (const dataIndex in dataset.data) {
      const value = dataset.data[dataIndex].toString();
      // eslint-disable-next-line no-continue
      if (value === '0') continue;
      const element = metaset.data[dataIndex];
      ctx.fillText(value, element.x + sign * 4, element.y + sign * 4);
    }
  }
}

export default addValueLabelsToBars;

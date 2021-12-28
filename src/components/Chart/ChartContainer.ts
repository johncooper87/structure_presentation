import { Chart, ChartType, ChartData, ChartOptions } from 'chart.js';

class ChartContainer {
  private canvasEl: HTMLCanvasElement = null;
  private chart: Chart = null;

  constructor() {
    this.handleCanvasRefCallback = this.handleCanvasRefCallback.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  handleCanvasRefCallback(node: HTMLCanvasElement) {
    this.canvasEl = node;
  }

  initialize(type: ChartType) {
    this.chart = new Chart(this.canvasEl, {
      type,
      data: {
        datasets: [],
      },
    });
  }

  destroy() {
    this.chart.destroy();
    this.chart = null;
  }

  update(options: ChartOptions, data: ChartData) {
    const { chart } = this;
    if (chart === null) return;

    if (chart.options !== options) chart.options = options;
    if (chart.data !== data) chart.data = data;
    chart.update();
  }
}

export default ChartContainer;

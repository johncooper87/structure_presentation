import { ChartType, ChartData, ChartOptions } from 'chart.js';
import ChartContainer from './ChartContainer';

interface ChartProperties {
  type: ChartType;
  data?: ChartData;
  options?: ChartOptions;
  canvasProps?: React.CanvasHTMLAttributes<any>;
}

function Chart({ type, data, options, canvasProps }: ChartProperties) {
  const chartContainer = useMemo(() => new ChartContainer(), []);

  useEffect(() => {
    chartContainer.initialize(type);
    return chartContainer.destroy;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    chartContainer.update(options, data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, data, options]);

  return <canvas {...canvasProps} ref={chartContainer.handleCanvasRefCallback} />;
}

export default Chart;

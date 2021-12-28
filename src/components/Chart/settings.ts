import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  BarController,
  BarElement,
  PieController,
  ArcElement,
  Legend,
  LogarithmicScale,
  Tooltip,
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  BarController,
  BarElement,
  PieController,
  ArcElement,
  Legend,
  LogarithmicScale,
  Tooltip
);

export const fontFamily = `'Roboto', sans-serif`;
export const fontSize = 12;
export const fontColor = 'rgba(0, 0, 0, 0.87)';

Chart.defaults.font = {
  family: `'Roboto', sans-serif`,
  size: fontSize,
  ...Chart.defaults.font,
};
Chart.defaults.color = fontColor;

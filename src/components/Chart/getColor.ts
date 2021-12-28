// const allColors = [
//   '#f8b195',
//   '#f67280',
//   '#c06c84',
//   '#6c5b7b',
//   '#355c7',
//   '#99b898',
//   '#fecea8',
//   '#ff847c',
//   '#e84a5f',
//   '#2a363',
//   '#acdbc9',
//   '#dbebc2',
//   '#fdd2b5',
//   '#f7a7a6',
//   '#f48b9',
//   '#a8a7a8',
//   '#cc527a',
//   '#e8175d',
//   '#474747',
//   '#36363',
//   '#a6206a',
//   '#ec1c4b',
//   '#f16a43',
//   '#f7d969',
//   '#2f939',
//   '#e1f5c4',
//   '#ece473',
//   '#f9d423',
//   '#f6903d',
//   '#f0505',
//   '#e5eec1',
//   '#a2d4ab',
//   '#3eaca8',
//   '#547a82',
//   '#5a505',
//   '#ef4566',
//   '#f69a9a',
//   '#f9cdae',
//   '#c8c8a9',
//   '#83ae9',
// ];

export const allColors = [
  '#003f5c',
  '#2f4b7c',
  '#665191',
  '#a05195',
  '#d45087',
  '#f95d6a',
  '#ff7c43',
  '#ffa600',
];

function getColor(num: number) {
  return allColors[7 - (num % 7)];
}

export default getColor;

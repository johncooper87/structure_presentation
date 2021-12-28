import { Paper, Typography } from '@material-ui/core';
import MapTooltip from '../_Map/MapTooltip';

// MapTooltip.renderFn = (entityName, data) => {
//   return (
//     <div>
//       <div style={{ color: 'red' }}>{entityName}</div>
//       <div>{data?.toString()}</div>
//     </div>
//   );
// };

MapTooltip.renderFn = (entityName, data) => {
  return (
    <Paper elevation={4} style={{ padding: '8px' }}>
      <Typography style={{ fontSize: '12px' }}>{data}</Typography>
    </Paper>
  );
};

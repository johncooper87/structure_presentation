import { Box } from '@material-ui/core';
import SiteSubcontractorListItem from './SiteSubcontractorListItem';
import SiteSubcontractorStatusDialog from './SiteSubcontractorStatusDialog';

function SiteSubcontractorListView({ data }: { data: Subcontractor[] }) {
  return (
    <>
      <Box overflow="hidden" pl={1}>
        {data?.map(s => (
          <SiteSubcontractorListItem key={s.id} data={s} />
        ))}
      </Box>
      <SiteSubcontractorStatusDialog />
    </>
  );
}

export default SiteSubcontractorListView;

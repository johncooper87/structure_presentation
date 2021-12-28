/* eslint-disable react/no-unescaped-entities */
import { TopbarTitle, Fab } from 'components';
import { openDialog } from 'utils';

const handleUpdate = () => openDialog('SITES/UPDATE_SUBCONTRACTOR', {});

function SiteSubcontractorList({ name }: { name: string }) {
  return (
    <>
      <TopbarTitle>Субподрядчики объекта "{name}"</TopbarTitle>
      <Fab template="create" label="Назначить" onClick={handleUpdate} />
    </>
  );
}

export default SiteSubcontractorList;

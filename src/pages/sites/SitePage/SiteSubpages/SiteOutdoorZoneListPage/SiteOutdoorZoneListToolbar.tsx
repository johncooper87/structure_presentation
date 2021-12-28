/* eslint-disable react/no-unescaped-entities */
import { routeBack } from 'actions';
import { store } from 'app';
import { TopbarTitle, Toolbar, ToolbarItem, Fab } from 'components';
import { useSelectedData, useClearSelected } from 'hooks';
import { openDialog } from 'utils';

const handleCreate = () => openDialog('SITES/CREATE_ZONE', {});
const handleEdit = () => openDialog('SITES/EDIT_ZONE', store.getState().select.selectedDataList[0]);
const handleDelete = () =>
  openDialog('SITES/DELETE_ZONE', store.getState().select.selectedDataList[0]);

function SiteOutdoorZoneList({ name }: { name: string }) {
  // useClearSelected();
  const zones: Zone[] = useSelectedData();
  const selectedZone = zones[0];

  return (
    <>
      <TopbarTitle>Зоны объекта "{name}"</TopbarTitle>
      <Toolbar>
        <ToolbarItem main template="back" onClick={routeBack} />
        {selectedZone && [
          <ToolbarItem
            key="edit"
            alwaysVisible
            disabled={!selectedZone}
            template="edit"
            onClick={handleEdit}
          />,
          <ToolbarItem
            key="delete"
            alwaysVisible
            disabled={!selectedZone}
            template="delete"
            onClick={handleDelete}
          />,
        ]}
      </Toolbar>
      <Fab template="create" onClick={handleCreate} />
    </>
  );
}

export default SiteOutdoorZoneList;

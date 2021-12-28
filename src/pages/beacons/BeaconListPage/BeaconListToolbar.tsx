import { routeToCreatePage } from 'actions';
import { store } from 'app';
import { TopbarTitle, TopbarField, Form, Fab, Toolbar, ToolbarItem } from 'components';
import { useQueryParams, useSelectedData } from 'hooks';
import { getQueryParams, routeForward, updateQueryParams } from 'utils';
import IndoorSiteSelect from '../IndoorSiteSelect';

const handleSeeDetails = () =>
  routeForward('/beacons/' + (store.getState().select.selectedDataList[0] as Beacon).id);

declare global {
  interface Window {
    lastSelectedIndoorSiteId: string;
  }
}

window.lastSelectedIndoorSiteId = localStorage.getItem('lastSelectedIndoorSiteId');

function handleSelectedSiteIdChange({ siteId }: { siteId: string }) {
  const { siteId: currentSiteId } = getQueryParams() as BeaconListPageQueryParams;
  updateQueryParams({ siteId }, !currentSiteId);
}

function BeaconListToolbar() {
  const { siteId = window.lastSelectedIndoorSiteId } =
    useQueryParams() as BeaconListPageQueryParams;
  useEffect(() => {
    const { siteId: currentSiteId } = getQueryParams() as BeaconListPageQueryParams;
    if (!currentSiteId) updateQueryParams({ siteId }, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  window.lastSelectedIndoorSiteId = siteId;
  localStorage.setItem('lastSelectedIndoorSiteId', siteId);

  const selectedData: Beacon[] = useSelectedData();
  const hasSelectedBeacon = selectedData.length > 0;

  return (
    <>
      <TopbarTitle>Маяки</TopbarTitle>
      <TopbarField>
        <Form values={{ siteId }} onChange={handleSelectedSiteIdChange}>
          <IndoorSiteSelect
            name="siteId"
            selectFirst
            variant="standard"
            label=""
            placeholder="Выберите объект"
          />
        </Form>
      </TopbarField>
      <Toolbar>
        {/* <ToolbarItem
              alwaysVisible
              disabled={disabled}
              template="edit"
              onClick={setPageToEditMode}
            /> */}
        {hasSelectedBeacon && (
          <ToolbarItem alwaysVisible template="details" onClick={handleSeeDetails} />
        )}
      </Toolbar>
      <Fab template="create" onClick={routeToCreatePage} />
    </>
  );
}

export default BeaconListToolbar;

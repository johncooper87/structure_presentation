import LockIcon from '@material-ui/icons/Lock';
import UnlockIcon from '@material-ui/icons/LockOpen';
import { store } from 'app';
import { Form, Toolbar, ToolbarItem, TopbarField } from 'components';
import CustomizeWidgetsIcon from 'components/icons/DashboardCustomize';
import { ConstructionSiteSelect } from 'templates';
import { openMenu } from 'utils';
import { saveLayoutsToStore } from './utils';
import WidgetCustomizationMenu from './WidgetCustomizationMenu';

const lockIcon = <LockIcon />;
const unlockIcon = <UnlockIcon />;
const customizeWidgetsIcon = <CustomizeWidgetsIcon />;

const dashboardToolbarSelector = ({ dashboard: { isLocked, selectedSiteId } }: AppState) => ({
  isLocked,
  selectedSiteId,
});

const toogleLockedState = () => {
  store.dispatch({ type: 'TOGGLE_LOCKED_STATE' });
  const { layouts: gridLayouts, isLocked } = store.getState().dashboard;
  localStorage.setItem('dashboard/is-locked', isLocked.toString());
  if (isLocked) saveLayoutsToStore(gridLayouts);
};

const handleWidgetCustomization = (event: React.MouseEvent<Element, MouseEvent>) =>
  openMenu('DASHBOARD/WIDGET_CUSTOMIZATION', event.currentTarget);

function handleSelectedSiteIdChange({ constructionSiteId: siteId }: { constructionSiteId: string }) {
  if (siteId === null) return;
  store.dispatch({ type: 'SET_SELECTED_SITE_ID', siteId });
  localStorage.setItem('dashboard/selected-site-id', siteId);
}

function DashboardToolbar() {
  const { isLocked, selectedSiteId } = useSelector(dashboardToolbarSelector, shallowEqual);

  return (
    <>
      <TopbarField>
        <Form values={{ constructionSiteId: selectedSiteId }} onChange={handleSelectedSiteIdChange}>
          <ConstructionSiteSelect
            selectFirst
            onlyWithSigurSystem={null}
            variant="standard"
            label=""
            placeholder="Выберите объект"
          />
        </Form>
      </TopbarField>
      <Toolbar>
        <ToolbarItem
          alwaysVisible
          icon={isLocked ? lockIcon : unlockIcon}
          text={isLocked ? 'Редактировать' : 'Фиксировать и сохранить'}
          onClick={toogleLockedState}
        />
        <ToolbarItem
          alwaysVisible
          icon={customizeWidgetsIcon}
          text="Настроить"
          onClick={handleWidgetCustomization}
        />
      </Toolbar>
      <WidgetCustomizationMenu />
    </>
  );
}

export default DashboardToolbar;

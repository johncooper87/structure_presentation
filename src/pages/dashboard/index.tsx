import { store } from 'app';
import { Layout, Layouts, Responsive, ResponsiveProps, WidthProvider } from 'react-grid-layout';
import { ConstructionSiteSelectOption } from 'templates';
import DashboardToolbar from './DashboardToolbar';
import GridItem from './GridItem';
import {
  allBreakpoints, convertToLayoutsProp,
  convertToLayoutsState,
  getStoreLayouts,
} from './utils';
import widgets from './widgets';
import styles from './styles.module.scss'

const ResponsiveGridLayout = WidthProvider(Responsive);

const breakpoints = { lg: 1280, md: 960, sm: 600, xs: 480 };
const staticProps: ResponsiveProps = {
  rowHeight: 30,
  breakpoints,
  cols: { lg: 12, md: 10, sm: 6, xs: 4 },
};

const handleLayoutChange = (currentLayout: Layout[], layouts: Layouts) =>
  store.dispatch({ type: 'SET_LAYOUTS', layouts: convertToLayoutsState(layouts) });

const dashboardSelector = ({ dashboard: { layouts, isLocked, selectedSiteId } }: AppState) => ({
  layouts,
  isLocked,
  selectedSiteId,
});

function handleRef(ref: any) {
  if (ref == null) return;
  const elementWidth = (ref.elementRef.current as Element).clientWidth;
  for (const breakpoint of allBreakpoints.reverse()) {
    if (elementWidth >= breakpoints[breakpoint]) {
      store.getState().dashboard.currentBreakpoint = breakpoint;
      break;
    }
  }
}
function handleBreakpointChange(breakpoint) {
  store.getState().dashboard.currentBreakpoint = breakpoint;
}

function Dashboard() {
  const { layouts, isLocked, selectedSiteId } = useSelector(dashboardSelector, shallowEqual);
  const _layouts = useMemo(() => convertToLayoutsProp(layouts), [layouts]);

  const { data: allSites } = useQuery<ConstructionSiteSelectOption[]>([
    'SELECT/CONSTRUCTION_SITE',
    null,
  ]);
  const sigurObject = useMemo(
    () => allSites?.find(site => site.id === selectedSiteId)?.sigurObject,
    [selectedSiteId, allSites]
  );

  useEffect(() => {
    return () => {
      store.dispatch({ type: 'SET_LAYOUTS', layouts: getStoreLayouts() });
    };
  }, []);

  return (
    <>
      <DashboardToolbar />
      <ResponsiveGridLayout
        // style={{ width: 'calc(100vw - var(--rightbar-width, 0px) - var(--leftbar-width, 0px) - 48px)' }}
        className={styles.responsiveGridLayout}
        measureBeforeMount
        draggableHandle=".draggable"
        {...staticProps}
        layouts={_layouts}
        isDraggable={!isLocked}
        isResizable={!isLocked}
        ref={handleRef}
        onBreakpointChange={handleBreakpointChange}
        onLayoutChange={handleLayoutChange}
      >
        {Object.keys(layouts)
          .filter(key => (sigurObject ? key === 'Map' : true))
          .map(key => {
            const { title, component: Widget } = widgets[key];
            return (
              <div key={key}>
                <GridItem gridKey={key} title={title}>
                  <Widget siteId={selectedSiteId} />
                </GridItem>
              </div>
            );
          })}
      </ResponsiveGridLayout>
    </>
  );
}

export default Dashboard;

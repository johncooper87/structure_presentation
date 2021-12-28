import AbsentWorkersWidget from './AbsentWorkersWidget';
// import BiometryWidget from './BiometryWidget';
import EnterprisesPresenceWidget from './EnterprisesPresenceWidget';
import MapWidget from './MapWidget';
import SiteMonitorWidget from './SiteMonitorWidget';
import TotalWorkersWidget from './TotalWorkersWidget';
import WorkersArrivalWidget from './WorkersArrivalWidget';
import WorkersMonitorWidget from './WorkersMonitorWidget';
import WorkersPresenceWidget from './WorkersPresenceWidget';

// function AnyWidget() {
//   return React.createElement('div', {}, 'asdasd asdasdasd asdgfdgfgfgfg dfgdfg dfgfgdf gdfgfg fdfgdfgfdgdf gfg dfgfgdfg gdfg dfgdfgfg dfg dfdfgdgfgg dfdfgg');
// }

interface Widget {
  title: string;
  component: FunctionComponent<{ siteId?: string }>;
  defaultLayouts: GridItemDefaultLayouts;
  sizeLimits: GridItemSizeLimits;
  defaultDisplayed?: boolean;
}

const widgets: Record<string, Widget> = {
  Map: {
    title: 'Карта',
    component: MapWidget,
    defaultLayouts: {
      lg: {
        left: 0,
        top: 0,
        width: 8,
        height: 16,
      },
    },
    sizeLimits: {
      lg: {
        minWidth: 4,
        minHeight: 4,
      },
    },
  },
  SiteMonitor: {
    title: 'Мониторинг объекта',
    component: SiteMonitorWidget,
    defaultLayouts: {
      lg: {
        height: 7,
        left: 5,
        top: 16,
        width: 3,
      },
    },
    sizeLimits: {
      lg: {
        minWidth: 3,
        maxWidth: 5,
        minHeight: 6,
        maxHeight: 7,
      },
    },
  },
  WorkersMonitor: {
    title: 'Мониторинг сотрудников',
    component: WorkersMonitorWidget,
    defaultLayouts: {
      lg: {
        height: 15,
        left: 0,
        top: 38,
        width: 8,
      },
    },
    sizeLimits: {
      lg: {
        minWidth: 8,
        minHeight: 14,
      },
      sm: {
        minWidth: 6,
      },
      xs: {
        minWidth: 4,
      },
    },
  },
  TotalWorkers: {
    title: 'Количество сотрудников на объекте',
    component: TotalWorkersWidget,
    defaultLayouts: {
      lg: {
        height: 7,
        left: 8,
        top: 0,
        width: 4,
      },
    },
    sizeLimits: {
      lg: {
        minWidth: 4,
        minHeight: 7,
        maxWidth: 4,
        maxHeight: 7,
      },
    },
  },
  AbsentWorkers: {
    title: 'Отсутствуют на объекте',
    component: AbsentWorkersWidget,
    defaultLayouts: {
      lg: {
        height: 16,
        left: 8,
        top: 7,
        width: 4,
      },
    },
    sizeLimits: {
      lg: {
        minWidth: 3,
        maxWidth: 5,
        minHeight: 6,
        maxHeight: 16,
      },
    },
  },
  WorkersArrival: {
    title: 'Прибытие специалистов',
    component: WorkersArrivalWidget,
    defaultLayouts: {
      lg: {
        height: 11,
        left: 0,
        top: 16,
        width: 5,
      },
    },
    sizeLimits: {
      lg: {
        minWidth: 4,
        maxWidth: 10,
        minHeight: 9,
        maxHeight: 16,
      },
    },
  },
  WorkersPresence: {
    title: 'Специалисты на объекте',
    component: WorkersPresenceWidget,
    defaultLayouts: {
      lg: {
        height: 11,
        left: 4,
        top: 27,
        width: 4,
      },
    },
    sizeLimits: {
      lg: {
        minWidth: 4,
        minHeight: 7,
      },
    },
  },
  EnterprisesPresence: {
    title: 'Компании на объекте',
    component: EnterprisesPresenceWidget,
    defaultLayouts: {
      lg: {
        height: 11,
        left: 0,
        top: 27,
        width: 4,
      },
    },
    sizeLimits: {
      lg: {
        minWidth: 4,
        minHeight: 8,
      },
    },
  },
  // Biometry: {
  //   title: 'Запрос биометрии',
  //   component: BiometryWidget,
  //   defaultLayouts: {
  //     lg: {
  //       height: 8,
  //       left: 0,
  //       top: 0,
  //       width: 2,
  //     },
  //   },
  //   sizeLimits: {
  //     lg: {
  //       minWidth: 2,
  //       minHeight: 8,
  //       maxWidth: 2,
  //       maxHeight: 8,
  //     },
  //   },
  // },
};

export default widgets;

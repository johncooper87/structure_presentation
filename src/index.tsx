import ReactDOM from 'react-dom';
import { ToastContainer, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { queryClient, socket } from 'app';
import 'app/yupLocale';
import AppProvider from 'app/AppProvider';
import ErrorBoundary from 'components/ErrorBoundary';
import { notify } from 'utils';
import Routing from 'routing';
import PrintTable from 'PrintTable';
import './styles.module.scss';

import 'components/MapElements/renderTooltip';

import { prefetchIndoorSiteListForSelect } from 'pages/beacons/IndoorSiteSelect';

prefetchIndoorSiteListForSelect();

const toastOptions: ToastContainerProps = {
  position: 'bottom-left',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  rtl: false,
  newestOnTop: true,
};

const notifier = (
  <AppProvider>
    <ToastContainer {...toastOptions} />
  </AppProvider>
);
ReactDOM.render(notifier, document.getElementById('notifier-container'));

const main = (
  <AppProvider>
    <ErrorBoundary>
      <Routing />
    </ErrorBoundary>
  </AppProvider>
);
ReactDOM.render(main, document.getElementById('main-container'));

const printTable = (
  <AppProvider>
    <PrintTable />
  </AppProvider>
);

ReactDOM.render(printTable, document.getElementById('print-container'));

socket.subscribe('ALERT_RECEIVED', data => notify.error('Получена новая тревога'));

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('/sw.js');
      // eslint-disable-next-line no-console
      console.log('Service worker registered');
    } catch (error) {
      //
    }
  });
}

// window.onerror = event => console.log(event);
// window.addEventListener('error', event => console.log(event));

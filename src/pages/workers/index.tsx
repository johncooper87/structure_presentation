import { Route } from 'react-router-dom';
import WorkerAddListDialog from './WorkerAddListDialog';
import WorkerDeleteDialog from './WorkerDeleteDialog';
import WorkerListPage from './WorkerListPage';
import WorkerPage from './WorkerPage';

const WorkersRouting = () => {
  return (
    <>
      <Route exact path="/workers" component={WorkerListPage} />
      <Route exact path="/workers/:id/(edit)?" component={WorkerPage} />
      <WorkerDeleteDialog />
      <WorkerAddListDialog />
    </>
  );
};

export default WorkersRouting;

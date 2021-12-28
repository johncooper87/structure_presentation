import { Route } from 'react-router-dom';
import EnterpriseListPage from './EnterpriseListPage';
import EnterprisePage from './EnterprisePage';
import EnterpriseDeleteDialog from './EnterpriseDeleteDialog';

const EnterprisesRouting = () => {
  return (
    <>
      <Route exact path="/enterprises" component={EnterpriseListPage} />
      <Route exact path="/enterprises/:id/(edit)?" component={EnterprisePage} />
      <EnterpriseDeleteDialog />
    </>
  );
};

export default EnterprisesRouting;

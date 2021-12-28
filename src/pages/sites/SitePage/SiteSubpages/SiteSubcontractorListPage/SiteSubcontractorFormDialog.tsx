import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import {
  Dialog,
  LinearProgress,
  DialogButton,
  Form,
  SubmitButton,
  CircularProgress,
  Checkbox,
} from 'components';
import { useDialogState } from 'hooks';
import { DialogCancelButton } from 'templates';
import { closeDialog, http, refetchActiveQuery } from 'utils';
import updateSiteSubcontactors from '../../../mutations/updateSiteSubcontactors';

interface EnterpriseSelectOption {
  id: string;
  name: string;
}
const toEnterpriseSelectOption = ({
  enterprise: { id, name },
}: EnterpriseDTO): EnterpriseSelectOption => ({
  id,
  name,
});
const fields = 'enterprise[id,name]';
async function getEnterpriseListForSelect() {
  const { result }: QueryableResponse<EnterpriseDTO[]> = await http.get('/api/kbi/enterprises', {
    fields,
  });
  return result.map(toEnterpriseSelectOption);
}

function handleSuccess() {
  closeDialog();
  refetchActiveQuery('SITES/SITE_SUBCONTRACTORS');
}

function SiteSubcontractorFormDialog({ subcontractors }: { subcontractors: Subcontractor[] }) {
  const { id: siteId } = usePathParams<SitePagePathParams>();

  const { open } = useDialogState('SITES/UPDATE_SUBCONTRACTOR');

  const { data: enterpriseList = [], isFetching } = useQuery(
    'SELECT/ENTERPRISE',
    getEnterpriseListForSelect,
    { cacheTime: 10 * 60 * 1000 }
  );

  const submit = (data: SiteSubcontractorsSubmitData) => updateSiteSubcontactors(siteId, data);
  const { mutate, isLoading } = useMutation(submit, {
    onSuccess: handleSuccess,
  });

  const initialValues: SiteSubcontractorsFormValues = useMemo(
    () => ({
      enterpriseIds: subcontractors?.map(sc => sc.id),
    }),
    [subcontractors]
  );

  return (
    <Dialog open={open} disabled={isLoading}>
      <DialogTitle>Обновить список субподрядчиков</DialogTitle>
      <Form initialValues={initialValues} enableReinitialize onSubmit={mutate}>
        <DialogContent style={{ width: '600px', maxWidth: '100%' }}>
          <CircularProgress display={isFetching} />
          {!isFetching &&
            enterpriseList?.map(({ id, name }) => (
              <div key={id}>
                <Checkbox name="enterpriseIds" value={id} label={name} labelPlacement="end" />
              </div>
            ))}
        </DialogContent>
        <DialogActions>
          <LinearProgress display={isLoading} />
          <DialogCancelButton />
          <DialogButton render={<SubmitButton template="save" />} />
        </DialogActions>
      </Form>
    </Dialog>
  );
}

export default SiteSubcontractorFormDialog;

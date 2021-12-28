import { useFormState } from 'components/Form';

import { setPageToEditMode, cancelPageEditMode, routeBack, finishPageCreateMode } from 'actions';
import { TopbarTitle, Toolbar, ToolbarItem } from 'components';
import { useFormPageMode } from 'hooks';
import { openDialog, getActiveQueryData } from 'utils';

const handleDelete = () => openDialog('SITES/DELETE', getActiveQueryData('SITES/SITE'));

function SiteToolbar({ disabled }: CommonToolbarProps) {
  const formMode = useFormPageMode();
  const { tab = 'info' } = usePathParams<{ tab: string }>();
  const { values } = useFormState<SiteFormValues>();

  const titles = {
    info: 'Информация об объекте',
    'outdoor-zones': 'Зоны объекта ' + values.name,
    'indoor-zones': 'Помещения объекта ' + values.name,
    subcontractors: 'Cубподрядчики объекта ' + values.name,
  };

  return (
    <>
      {formMode === 'create' && (
        <>
          <TopbarTitle>Новый объект</TopbarTitle>
          <Toolbar>
            <ToolbarItem main template="cancel" onClick={finishPageCreateMode} />
          </Toolbar>
        </>
      )}
      {formMode === 'read' && (
        <>
          <TopbarTitle>{titles[tab]}</TopbarTitle>
          <Toolbar>
            <ToolbarItem main template="back" onClick={routeBack} />
            {tab === 'info' && [
              <ToolbarItem
                key="edit-item"
                alwaysVisible
                disabled={disabled}
                template="edit"
                onClick={setPageToEditMode}
              />,
              <ToolbarItem
                key="delete-item"
                alwaysVisible
                disabled={disabled}
                template="delete"
                onClick={handleDelete}
              />,
            ]}
          </Toolbar>
        </>
      )}
      {formMode === 'edit' && (
        <>
          <TopbarTitle>Редактирование объекта</TopbarTitle>
          <Toolbar>
            <ToolbarItem main template="cancel" onClick={cancelPageEditMode} />
          </Toolbar>
        </>
      )}
    </>
  );
}

export default SiteToolbar;

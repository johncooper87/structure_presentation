import { setPageToEditMode, cancelPageEditMode, routeBack, finishPageCreateMode } from 'actions';
import { TopbarTitle, Toolbar, ToolbarItem } from 'components';
import { useFormPageMode } from 'hooks';
import { openDialog, getActiveQueryData } from 'utils';

const handleDelete = () =>
  openDialog('ENTERPRISES/DELETE', getActiveQueryData('ENTERPRISES/ENTERPRISE'));

function EnterpriseToolbar({ disabled }: CommonToolbarProps) {
  const formMode = useFormPageMode();

  return (
    <>
      {formMode === 'create' && (
        <>
          <TopbarTitle>Новая компания</TopbarTitle>
          <Toolbar>
            <ToolbarItem main template="cancel" onClick={finishPageCreateMode} />
          </Toolbar>
        </>
      )}
      {formMode === 'read' && (
        <>
          <TopbarTitle>Информация о компании</TopbarTitle>
          <Toolbar>
            <ToolbarItem main template="back" onClick={routeBack} />
            <ToolbarItem
              alwaysVisible
              disabled={disabled}
              template="edit"
              onClick={setPageToEditMode}
            />
            <ToolbarItem
              alwaysVisible
              disabled={disabled}
              template="delete"
              onClick={handleDelete}
            />
          </Toolbar>
        </>
      )}
      {formMode === 'edit' && (
        <>
          <TopbarTitle>Редактирование компании</TopbarTitle>
          <Toolbar>
            <ToolbarItem main template="cancel" onClick={cancelPageEditMode} />
          </Toolbar>
        </>
      )}
    </>
  );
}

export default EnterpriseToolbar;

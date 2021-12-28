import { setPageToEditMode, cancelPageEditMode, routeBack, finishPageCreateMode } from 'actions';
import { TopbarTitle, Toolbar, ToolbarItem } from 'components';
import { useFormPageMode } from 'hooks';
import { openDialog, getActiveQueryData } from 'utils';

const handleDelete = () => openDialog('SITES/DELETE', getActiveQueryData('SITES/SITE'));

function SiteInfoToolbar({ disabled }: CommonToolbarProps) {
  const formMode = useFormPageMode();

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
          <TopbarTitle>Информация об объекте</TopbarTitle>
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
          <TopbarTitle>Редактирование объекта</TopbarTitle>
          <Toolbar>
            <ToolbarItem main template="cancel" onClick={cancelPageEditMode} />
          </Toolbar>
        </>
      )}
    </>
  );
}

export default SiteInfoToolbar;

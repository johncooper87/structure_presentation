import { Grid, ListItem, ListItemText, Tooltip } from '@material-ui/core';
import SiteIcon from '@material-ui/icons/LocationOn';
import { socket } from 'app';
import RespondedIcon from 'components/icons/CheckCircleFilled';
import UnrespondedIcon from 'components/icons/ErrorFilled';
import { ListItemEnterprise, ListItemMoreAction } from 'templates';
import { openMenu } from 'utils';

export function ListItemSite({ name }: { name: string }) {
  return (
    <Grid container alignItems="center" wrap="nowrap">
      <Tooltip title="Объект">
        <SiteIcon />
      </Tooltip>
      {name}
    </Grid>
  );
}

const respondedIcon = <RespondedIcon fontSize="small" className="success" />;
const unrespondedIcon = <UnrespondedIcon fontSize="small" className="alert" />;
export function ListItemRespondedStatus({ responded }: { responded: boolean }) {
  return (
    <Grid container alignItems="flex-start" wrap="nowrap" spacing={1}>
      <Grid item>
        <Tooltip title="Объект">
          <span>{responded ? respondedIcon : unrespondedIcon}</span>
        </Tooltip>
      </Grid>
      <Grid item>
        <p>{responded ? 'Отреагированная' : 'Неотреагированная'}</p>
      </Grid>
    </Grid>
  );
}

function handleMoreAction(event: React.MouseEvent, alert) {
  openMenu('ALERTS/ALERT_ITEM', event.currentTarget, alert);
}

const alertTypeLabels = {
  1: 'Падение',
  2: 'По кнопке SOS',
  3: 'Отсутствует движение',
};

interface AlertListItemProps {
  data: Partial<AlertDTO>;
}

function AlertListItem({ data }: AlertListItemProps) {
  const [socketData, setSocketData] = useState<AlertSocketData>();
  const {
    alertId,
    workerFullName,
    dateAlert,
    enterpriseName,
    zoneGroupName,
    isLooked,
    comment,
    alertType,
  } = {
    ...data,
    ...socketData,
  };

  useEffect(() => {
    const unsubscribe = socket.subscribe('ALERT_RESPONDED', (data: AlertRespondeSocketData) => {
      if (data.alertId === alertId)
        setSocketData({
          comment: data.comment,
          isLooked: true,
        });
    });
    return unsubscribe;
  }, [alertId]);

  return (
    <ListItem>
      <Grid container>
        <Grid item xs={12} sm={4}>
          <ListItemText
            primary={workerFullName}
            secondary={
              <span>
                <strong>{alertTypeLabels[alertType]}</strong>
                {', '}
                {new Date(dateAlert).toLocaleString('ru')}
              </span>
            }
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <ListItemText
            className="col-2"
            primary={<ListItemEnterprise data={{ displayName: enterpriseName }} />}
            secondary={zoneGroupName && <ListItemSite name={zoneGroupName} />}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ListItemText
            className="col-2"
            primary={<ListItemRespondedStatus responded={isLooked} />}
            secondary={<p>{comment}</p>}
          />
        </Grid>
      </Grid>
      <ListItemMoreAction data={data} onClick={handleMoreAction} />
    </ListItem>
  );
}

export default AlertListItem;

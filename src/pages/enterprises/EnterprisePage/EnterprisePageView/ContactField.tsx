import { Box, Grid, IconButton, Paper, Tooltip, Typography } from '@material-ui/core';
import DeleteContactIcon from '@material-ui/icons/Clear';
import { TextField, Field } from 'components';

const ContactField = ({ index, onDelete, readOnly }) => {
  return (
    <Paper elevation={2}>
      <Box padding="16px">
        <Field name={`contacts[${index}]`}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Grid container justifyContent="space-between" alignItems="center">
                <Typography>Контакт №{index + 1}</Typography>
                {!readOnly && (
                  <Tooltip title="Удалить контакт">
                    <span>
                      <IconButton onClick={onDelete}>
                        <DeleteContactIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                )}
              </Grid>
            </Grid>
            <Grid item>
              <TextField fullWidth name="name" label="ФИО" />
            </Grid>
            <Grid item>
              <TextField fullWidth name="position" label="Должность" />
            </Grid>
            <Grid item>
              <TextField fullWidth name="phone" label="Телефон" />
            </Grid>
            <Grid item>
              <TextField fullWidth name="email" label="Эл. почта" />
            </Grid>
          </Grid>
        </Field>
      </Box>
    </Paper>
  );
};

export default ContactField;

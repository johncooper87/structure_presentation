import React from 'react';
import { Grid, Button } from '@material-ui/core';
import AddAlertIcon from '@material-ui/icons/AddAlert';
// import { useFieldValues } from 'hooks';
import { FieldArray } from 'components/Form';
import { UserInformingField } from 'templates';

function UserInforming() {
    // const [
    //     sendAlertPhone,
    //     alertPhone,
    //     sendAlertEmail,
    //     alertEmail,
    // ] = useFieldValues('sendAlertPhone', 'alertPhone', 'sendAlertEmail', 'alertEmail');
    // const canAddInforming = !(sendAlertPhone && sendAlertEmail);

    return (
      <Grid container direction="column">
        <Grid item>
          Информирование
        </Grid>
        <FieldArray name="informingContacts">
          {({ map, push, remove, length, readOnly }) => (
            <>
              {map(index => (
                  // eslint-disable-next-line react/no-array-index-key
                <Grid key={index} item>
                  <UserInformingField index={index} readOnly={readOnly} onDelete={() => remove(index)} />
                </Grid>
                )) || null}
              {/* {canAddInforming &&  */}
              {(length < 2 && !readOnly) &&
                <Grid item>
                  <Button variant="outlined" onClick={() => push({})}>
                    <AddAlertIcon className="leading-icon" />
                    Добавить
                  </Button>
                </Grid>}
            </>
          )}
        </FieldArray>
      </Grid>
    );
}

export default UserInforming;

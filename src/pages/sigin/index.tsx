/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Route, Switch } from 'react-router-dom';
import { InputAdornment, IconButton, Box } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import { history, store } from 'app';
import { Form, SubmitButton, TextField, Checkbox, TextFieldProps } from 'components';
import { useQueryParams } from 'hooks';
import { http, notify } from 'utils';
import About from './About';
import styles from './styles.module.scss';

interface SignInFormValues {
  username: string;
  password: string;
  rememberMe: boolean;
}

function PasswordField(props: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      className={styles.signinInput}
      variant="standard"
      name="password"
      label="Пароль"
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(value => !value)}
              onMouseDown={event => event.preventDefault()}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
}

async function handleSubmit({
  values: { username, password, rememberMe },
}: SubmitData<SignInFormValues>) {
  const { result }: APIResponse<any> =
    (await http.post('/api/Auth/login', {
      login: username,
      password,
      rememberMe,
    })) ?? {};
  if (result) {
    const { result: user }: APIResponse<AuthState> = await http.get('/api/Auth/profile');
    store.dispatch({ type: 'SIGNIN', user });
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    notify.error('Неверное имя пользователя или пароль');
  }
}

const handleForgotPassword = () => history.push('/restore-password');

function SignInForm() {
  return (
    <>
      <Form onSubmit={handleSubmit} initialValues={{ rememberMe: true }}>
        <TextField
          className={styles.signinInput}
          variant="standard"
          name="username"
          label="Имя пользователя"
        />
        <PasswordField />
        <Box marginTop="16px" textAlign="center">
          <Checkbox name="rememberMe" label="Запомнить меня" />
        </Box>
        <SubmitButton className={styles.submitButton}>Войти</SubmitButton>
      </Form>
      <Box marginTop="24px" textAlign="center">
        <div className={styles.forgotPasswordLink} onClick={handleForgotPassword}>
          Забыли пароль?
        </div>
      </Box>
    </>
  );
}

async function handleRestorePassword({ values: { email } }) {
  await http.post(
    `/api/kbi/users/credentials?mail=${email}`,
    {},
    {
      onSuccess: () =>
        notify.success('Письмо для восстановления пароля отправлено на указанный адрес эл. почты'),
    }
  );
}

const handleBackToAuthorization = () => history.push('');

function RestorePasswordForm() {
  return (
    <>
      <Form onSubmit={handleRestorePassword}>
        <TextField
          className={styles.signinInput}
          variant="standard"
          name="email"
          label="Адрес эл. почты"
        />
        <SubmitButton className={styles.submitButton} label="Восстановить" />
      </Form>
      <Box marginTop="24px" textAlign="center">
        <div className={styles.forgotPasswordLink} onClick={handleBackToAuthorization}>
          Вернуться к авторизации
        </div>
      </Box>
    </>
  );
}

interface ChangePasswordFormValues {
  newPassword: string;
  repeatedPassword: string;
}

async function handleChangePassword(
  id: string,
  code: string,
  { values: { newPassword } }: SubmitData<ChangePasswordFormValues>
) {
  await http.put(
    `/api/kbi/users/changepassword?id=${id}&code=${code}&newPassword=${newPassword}`,
    {},
    {
      onSuccess: () => {
        notify.success('Пароль успешно изменен');
        handleBackToAuthorization();
      },
    }
  );
}

function validateChangePasswordForm({ newPassword, repeatedPassword }: ChangePasswordFormValues) {
  const errors: any = {};
  if (newPassword !== repeatedPassword) errors.repeatedPassword = 'Пароли должны совпадать';
  return errors;
}
function validateNewPassword(value: string) {
  if (!value) return 'Необходимо указать новый пароль';
}
function validateRepeatedPassword(value: string) {
  if (!value) return 'Необходимо повторить';
}

function ChangePasswordForm() {
  const { id } = usePathParams<{ id: string }>();
  const { code } = useQueryParams() as { code: string };

  const { mutate } = useMutation(
    ['CHANGE_PASSWORD'],
    (values: SubmitData<ChangePasswordFormValues>) => handleChangePassword(id, code, values)
  );

  return (
    <>
      <Form onSubmit={mutate} validate={validateChangePasswordForm}>
        <PasswordField name="newPassword" label="Новый пароль" validate={validateNewPassword} />
        <PasswordField
          name="repeatedPassword"
          label="Повторите пароль"
          validate={validateRepeatedPassword}
        />
        <SubmitButton className={styles.submitButton} label="Изменить" />
      </Form>
      <Box marginTop="24px" textAlign="center">
        <div className={styles.forgotPasswordLink} onClick={handleBackToAuthorization}>
          Вернуться к авторизации
        </div>
      </Box>
    </>
  );
}

function SignInPage() {
  return (
    <div className={styles.root}>
      <div className={styles.leftBar}>
        <div className={styles.appName}>{process.env.REACT_APP_NAME}</div>
        <div className={styles.inputs}>
          <Switch>
            <Route exact path="/restore-password" component={RestorePasswordForm} />
            <Route exact path="/user/userchangepassword/:id" component={ChangePasswordForm} />
            <Route component={SignInForm} />
          </Switch>
        </div>
      </div>
      <div className={styles.sliderContainer}>
        <About />
      </div>
    </div>
  );
}

export default SignInPage;

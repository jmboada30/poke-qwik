import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './login.css?inline';
import { Form, routeAction$, z, zod$ } from '@builder.io/qwik-city';

export const useLoginUserAction = routeAction$((data, {cookie, redirect}) => {

  if (data.email === 'mail@mail.com' && data.password === '1234') {
    cookie.set('jwt', 'esto_es_un_token', {secure: true, path: '/'});
    redirect(301, '/');
    return {
      success: true,
      jwt: 'esto_es_un_token',
    };
  }

  return {
    success: false,
    error: 'Usuario o contraseña incorrectos',
  };
}, zod$({
  email: z.string().email('Email no válido'),
  password: z.string().min(3, 'La contraseña debe tener al menos 3 caracteres'),
}));

export default component$(() => {
  useStylesScoped$(styles);
  const action = useLoginUserAction();

  return (
    <Form action={action} class="login-form">
      <div class="relative">
        <input name="email" type="text" placeholder="Email address" />
        <label for="email">Email Address</label>
      </div>

      <div class="relative">
        <input name="password" type="password" placeholder="Password" />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button>Ingresar</button>
      </div>

      <p>
        {action.value?.success && (
          <code>Autenticado con el JWT: {action.value.jwt}</code>
        )}
      </p>

      <code>{JSON.stringify(action.value, undefined, 2)}</code>
    </Form>
  );
});

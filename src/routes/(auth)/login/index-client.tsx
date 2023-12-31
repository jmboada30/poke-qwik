import {
  $,
  component$,
  useComputed$,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';

import styles from './login.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  const formState = useStore({
    email: '',
    password: '',
    formPosted: false,
  });

  const emailError = useComputed$(() => {
    if (formState.email.includes('@')) return '';
    return 'not-valid';
  });

  const passwordError = useComputed$(() => {
    if (formState.password.length > 3) return '';
    return 'not-valid';
  });

  const formIsValid = useComputed$(() => {
    return (
      emailError.value === 'not-valid' || passwordError.value === 'not-valid'
    );
  });

  const onSubmit = $(() => {
    formState.formPosted = true;

    if (!formIsValid.value) {
      console.log('onSubmit', formState);
    }
  });

  return (
    <form onSubmit$={onSubmit} class="login-form" preventdefault:submit>
      <div class="relative">
        <input
          value={formState.email}
          onInput$={(e) =>
            (formState.email = (e.target as HTMLInputElement).value)
          }
          class={formState.formPosted ? emailError.value : ''}
          name="email"
          type="text"
          placeholder="Email address"
        />
        <label for="email">Email Address</label>
      </div>

      <div class="relative">
        <input
          value={formState.password}
          onInput$={(e) =>
            (formState.password = (e.target as HTMLInputElement).value)
          }
          class={formState.formPosted ? passwordError.value : ''}
          name="password"
          type="password"
          placeholder="Password"
        />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button>Ingresar</button>
      </div>

      <code>{JSON.stringify(formState, undefined, 2)}</code>
    </form>
  );
});

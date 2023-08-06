import { component$, Slot, useStyles$ } from '@builder.io/qwik';

import NavBar from '~/components/shared/navbar/navbar';

import styles from './styles.css?inline';
import { PokemonProvider } from '~/context';

// Este componente es el que se va a renderizar en todas las paginas
// Es un buen lugar para inyectar un navbar, un footer, etc
// Al igual que los providers como PokemonProvider
export default component$(() => {
  useStyles$(styles);
  return (
    <PokemonProvider>
      <NavBar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
    </PokemonProvider>
  );
});

import { component$, Slot } from '@builder.io/qwik';

import NavBar from '~/components/shared/navbar/navbar';

import { PokemonProvider } from '~/context';

// Este componente es el que se va a renderizar en todas las paginas
// Es un buen lugar para inyectar un navbar, un footer, etc
// Al igual que los providers como PokemonProvider
export default component$(() => {
  return (
    <PokemonProvider>
      <NavBar />
      <main class="flex flex-col justify-center items-center ">
        <Slot />
      </main>
    </PokemonProvider>
  );
});

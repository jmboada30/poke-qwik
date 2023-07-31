import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return <>pokemon List SSR</>
});

export const head: DocumentHead = {
  title: 'Client SSR',
  meta: [
    {
      name: 'description',
      content: 'Esta pagina es renderizada en el servidor',
    },
  ],
};
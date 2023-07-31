import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return <>pokemon List CLIENT</>
});

export const head: DocumentHead = {
  title: 'Client List',
  meta: [
    {
      name: 'description',
      content: 'Esta pagina es renderizada en el cliente',
    },
  ],
};
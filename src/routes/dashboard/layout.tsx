import { Slot, component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import Navbar from '~/components/shared/navbar/navbar';

export const useCheckAuthCookie = routeLoader$(({cookie, redirect})=> {
  const jwtCookie = cookie.get('jwt');
  if (!jwtCookie) throw redirect(302, '/login');
  if(jwtCookie.value !== 'esto_es_un_token') throw redirect(302, '/login');
  
});

export default component$(() => {
  return (
    <>
      <Navbar />
      <div class="flex flex-col justify-center items-center mt-10">
        <span class="text-5xl">Dashboard Layout</span>
        <Slot />
      </div>
    </>
  );
});

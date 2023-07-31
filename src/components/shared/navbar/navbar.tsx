import { component$ } from '@builder.io/qwik';
import styles from './navbar.module.css';
import { QwikLogo } from '~/components/icons/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={['container', styles.wrapper]}>
        <div class={styles.logo}>
          <Link href="/">
            <QwikLogo height={50} />
          </Link>
        </div>
        <ul>
          <li>
            <Link href="/pokemons/list-ssr/">SSR</Link>
          </li>
          <li>
            <Link href="/pokemons/list-client/">Client</Link>
          </li>
        </ul>
      </div>
    </header>
  );
});

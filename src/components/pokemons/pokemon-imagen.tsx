import {
  component$,
  useComputed$,
  useSignal,
  useTask$,
} from '@builder.io/qwik';

interface Props {
  id: number;
  size?: number;
  backImage?: boolean;
  isVisible?: boolean;
}

export const PokemonImage = component$((props: Props) => {
  const { id, size = 160, backImage = false, isVisible = true } = props;
  const imageLoaded = useSignal(false);
  const imageUrl = useComputed$(() => {
    return backImage
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  });

  useTask$(({ track }) => {
    track(() => id);
    imageLoaded.value = false;
  });
  return (
    <div
      class="flex items-center justify-center"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {!imageLoaded.value && <span>Cargando...</span>}

      <img
        src={imageUrl.value}
        alt="Imagen Pokemon"
        width={size}
        height={size}
        onLoad$={() => (imageLoaded.value = true)}
        class={[
          {
            hidden: !imageLoaded.value,
            'brightness-0': !isVisible,
          },
          'transition-all duration-500 ease-in-out',
        ]}
      />
    </div>
  );
});

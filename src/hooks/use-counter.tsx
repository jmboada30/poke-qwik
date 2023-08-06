import { $, useComputed$, useSignal } from '@builder.io/qwik';

// Esto es un hook de Qwik que se puede usar en cualquier componente
// para crear un contador basico.
export const useCounter = (initialValue: number) => {
  const counter = useSignal(initialValue);

  const decreaseCounter = $(() => {
    counter.value--;
  });

  const increaseCounter = $(() => {
    counter.value++;
  });

  return {
    counter: useComputed$(() => counter.value),
    decrease: decreaseCounter,
    increase: increaseCounter,
  };
};

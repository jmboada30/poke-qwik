import {
  type PropFunction,
  Slot,
  component$,
  useStylesScoped$,
} from '@builder.io/qwik';
import ModalStyles from './modal.css?inline';

interface Props {
  showModal: boolean;
  persistent?: boolean;
  size?: 'sm' | 'md' | 'lg';

  closeFn: PropFunction<() => void>;
}

export const BasicModal = component$((props: Props) => {
  const { showModal, persistent = false, size = 'md', closeFn } = props;
  useStylesScoped$(ModalStyles);

  return (
    <div
      id="modal-content"
      onClick$={(e) => {
        const elementId = (e.target as HTMLElement).id;
        if (elementId === 'modal-content' && !persistent) closeFn();
      }}
      class={showModal ? 'modal-background' : 'hidden'}
    >
      <div class={['modal-content', `modal-${size}`]}>
        <div class="mt-3 text-center">
          <h3 class="modal-title">
            <Slot name="title" />
          </h3>

          <div class="mt-2 px-7 py-3">
            <div class="modal-content-text">
              <Slot name="content" />
            </div>
          </div>

          {/* Botton */}
          <div class="items-center px-4 py-3">
            <button id="ok-btn" onClick$={closeFn} class="modal-button">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

'use client';

import { useEffect } from 'react';

const INTERACTIVE_SELECTOR = [
  'input:not([type="hidden"])',
  'textarea',
  'select',
  '[contenteditable="true"]',
  '.ProseMirror',
].join(', ');

function isInteractiveTarget(target: EventTarget | null): target is HTMLElement {
  return target instanceof HTMLElement && target.closest(INTERACTIVE_SELECTOR) !== null;
}

export default function InputPerformanceMode() {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const body = document.body;

    const enable = () => {
      body.dataset.inputActive = 'true';
    };

    const disableIfIdle = () => {
      const activeElement = document.activeElement;

      if (!(activeElement instanceof HTMLElement) || activeElement.closest(INTERACTIVE_SELECTOR) === null) {
        delete body.dataset.inputActive;
      }
    };

    const handleFocusIn = (event: FocusEvent) => {
      if (isInteractiveTarget(event.target)) {
        enable();
      }
    };

    const handleFocusOut = () => {
      window.requestAnimationFrame(disableIfIdle);
    };

    disableIfIdle();

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      delete body.dataset.inputActive;
    };
  }, []);

  return null;
}

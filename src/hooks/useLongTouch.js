import { useRef } from 'react';

function useLongTouch(callback, disable = false) {
  const recent = useRef({}).current;

  if (!recent.initialized) {
    recent.initialized = true;

    recent.startTimeout = (event) => {
      if (recent.disable) return;
      recent.timeout = setTimeout(() => callback(event), 1000);
    };
    recent.clearTimeout = () => clearTimeout(recent.timeout);
    recent.handleContextMenu = (event) => {
      if (recent.disable) return;
      event.preventDefault();
    };

    recent.refCalllback = (node) => {
      if (node != null) {
        recent.node = node;
        node.addEventListener('touchstart', recent.startTimeout);
        node.addEventListener('touchend', recent.clearTimeout);
        node.addEventListener('contextmenu', recent.handleContextMenu);
        node.addEventListener('mousedown', recent.startTimeout);
        node.addEventListener('mouseup', recent.clearTimeout);
      }
    };
  }

  recent.callback = callback;
  recent.disable = disable;

  return recent.refCalllback;
}

export default useLongTouch;

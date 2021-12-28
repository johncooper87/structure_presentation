interface PortalContainer {
  inner: HTMLSpanElement;
  outer: ReactNode;
}

const containerList = new Map<string, PortalContainer>();

function createPortalContainer(key: string): PortalContainer {
  const inner = document.createElement('span');
  inner.style.setProperty('display', 'contents');

  function appendInner(node: HTMLSpanElement) {
    if (node) {
      node.appendChild(inner);
      node.style.setProperty('display', 'contents');
    }
  }

  return {
    inner,
    outer: <span id={key} ref={appendInner} />,
  };
}

function _getContainer(key: string) {
  let container = containerList.get(key);
  if (!container) {
    container = createPortalContainer(key);
    containerList.set(key, container);
  }
  return container;
}

export function getPortalContainer(key: string) {
  const container = _getContainer(key);
  return container.inner;
}

export function renderPortalContainer(key: string) {
  const container = _getContainer(key);
  return container.outer;
}

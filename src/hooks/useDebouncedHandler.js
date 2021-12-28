/* eslint-disable prettier/prettier */
/* eslint-disable no-async-promise-executor */
function useDebouncedHandler(handler, delay) {
  const recent = useRef({}).current;
  recent.delay = delay;
  recent.handler = handler;

  if (recent.debouncedHandler == null) {
    recent.debouncedHandler = (...args) => {
      clearTimeout(recent.timeout);
      return new Promise(resolve => {
        recent.timeout = setTimeout(() => {
          if (recent.handler.constructor.name === 'AsyncFunction')
            recent.handler(...args).then(resolve);
          else resolve(recent.handler(...args));
        }, recent.delay);
      });
    };
  }

  return recent.debouncedHandler;
}

export default useDebouncedHandler;

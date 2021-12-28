/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-restricted-globals */
const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
const host =
  process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_WS_HOST : window.location.host;

const events = new Map();

function subscribe(event: string, callback: any) {
  let listeners = events.get(event);
  if (listeners === undefined) {
    listeners = new Set();
    events.set(event, listeners);
  }
  listeners.add(callback);
  return () => listeners.delete(callback);
}

let socket: WebSocket;

function connect(userId: string) {

  const url = `${protocol}//${host}/ws/`;
  console.log(`[WebSocket] Connecting to "${url}"`);
  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log('[WebSocket] Open');

    socket.addEventListener('message', ({ data: message }) => {
      console.log('[WebSocket] Receive message:', message);

      try {
        const { event, data } = JSON.parse(message);
        if (event) {
          const listeners = events.get(event);
          // eslint-disable-next-line no-restricted-syntax
          if (listeners !== undefined) for (const callback of listeners) callback(data);
        } else {
          console.error('[WebSocket] The message must contain an event:', data);
        }
      } catch (error) {
        console.error('[WebSocket] Invalid message:', message);
      }
    });

    const registerClaim = {
      claim: 'REGISTER',
      data: {
        userId,
      },
    };
    console.log(`[WebSocket] Register claim:`, userId);
    socket.send(JSON.stringify(registerClaim));
  };

  socket.onclose = event => {
    console.log('[WebSocket] Close:', event.reason);
    setTimeout(connect, 1000);
  };

  socket.onerror = error => {
    console.error('[WebSocket] Error:', error);
    socket.close();
  };
}

export default {
  connect,
  subscribe,
  close: () => {
    if (socket?.OPEN) socket.close();
  },
};

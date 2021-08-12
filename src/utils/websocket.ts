export class Socket {
  ws!: WebSocket;
  url: string = '';
  isOpen: boolean = false;

  constructor(url: string) {
    this.url = url;
  }

  init(callback?: Function) {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => {
      console.log('Connection to server opened');
      this.isOpen = true;
      if (callback) {
        callback();
      }
    };
    this.ws.onerror = err => {
      console.error('websocket error', err);
    };

    this.ws.onmessage = e => {
      // a message was received
      console.log('websocket message', e.data);
    };

    this.ws.onclose = e => {
      console.log('websocket onclose', e);
    };
  }

  sendMsg(message: string) {
    this.ws.send(message);
  }

  close() {
    console.log('websocket close');
    this.ws.close();
  }
}

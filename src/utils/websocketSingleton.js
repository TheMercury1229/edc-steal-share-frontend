class WebSocketSingleton {
  static instance = null;

  constructor() {
    if (!WebSocketSingleton.instance) {
      this.ws = new WebSocket(`ws://localhost:3000/`);
      WebSocketSingleton.instance = this;
    }
    return WebSocketSingleton.instance;
  }

  getConnection() {
    return this.ws;
  }
}

export default WebSocketSingleton;

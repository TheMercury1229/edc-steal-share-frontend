class WebSocketSingleton {
  static instance = null;

  constructor() {
    if (!WebSocketSingleton.instance) {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in local storage");
      }
      this.ws = new WebSocket(`ws://3.109.212.132:8080?token=${token}`);
    }
    return WebSocketSingleton.instance;
  }

  getConnection() {
    return this.ws;
  }
}

export default WebSocketSingleton;

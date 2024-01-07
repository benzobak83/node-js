import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
const PORT = 3e3;
const DOMAIN = "http://localhost";
const BASE_URL = `${DOMAIN}:${PORT}`;
const getParsedUrl = (req) => {
  const parsedUrl = new URL(req.url || "/", BASE_URL);
  return parsedUrl;
};
class EventBus {
  constructor() {
    this._listeners = {};
  }
  on(event, callback) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }
    this._listeners[event].push(callback);
  }
  off(event, callback) {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this._listeners[event] = this._listeners[event].filter(
      (listener) => listener !== callback
    );
  }
  emit(event, ...args) {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this._listeners[event].forEach(function(listener) {
      listener(...args);
    });
  }
}
var Events = /* @__PURE__ */ ((Events2) => {
  Events2[Events2["ORDER:CREATED"] = 0] = "ORDER:CREATED";
  return Events2;
})(Events || {});
const eventBus = new EventBus();
let ai = 1;
const create = (req, res) => {
  const order = { id: ai++, createdAt: /* @__PURE__ */ new Date() };
  eventBus.emit(Events["ORDER:CREATED"], order);
  res.statusCode = 200;
  res.end(JSON.stringify(order));
};
class Channel {
  constructor() {
    this._subscribers = /* @__PURE__ */ new Map();
  }
  addSubscriber(res) {
    const subscriber = { res, createdAt: /* @__PURE__ */ new Date() };
    this._subscribers.set(res, subscriber);
    res.on("close", () => this.removeSubscriber(res));
  }
  removeSubscriber(res) {
    this._subscribers.delete(res);
  }
  messageForAllSubscribers(data) {
    this._subscribers.forEach((subscriber) => {
      if (subscriber.res.closed) {
        console.log("proverka");
        return;
      }
      subscriber.res.end(JSON.stringify(data));
    });
  }
}
var ChannelNames = /* @__PURE__ */ ((ChannelNames2) => {
  ChannelNames2[ChannelNames2["ORDER_FLOW"] = 0] = "ORDER_FLOW";
  return ChannelNames2;
})(ChannelNames || {});
class Broadcast {
  constructor() {
    this.channels = {};
  }
  createChannel(channelName) {
    const channel = new Channel();
    this.channels[channelName] = channel;
    return channel;
  }
  getChannel(channelName) {
    var _a;
    return ((_a = this.channels) == null ? void 0 : _a[channelName]) ?? null;
  }
}
const broadcast = new Broadcast();
const orders = [];
const orderChannel = broadcast.createChannel(ChannelNames.ORDER_FLOW);
eventBus.on(Events["ORDER:CREATED"], (order) => {
  orders.push(order);
  orderChannel.messageForAllSubscribers(order);
});
const subscribeOnNewOrder = (req, res) => {
  const TIMEOUT = 3e4;
  orderChannel.addSubscriber(res);
  setTimeout(() => {
    res.end(`Application wasnt created for ${TIMEOUT / 1e3} seconds`);
  }, TIMEOUT);
};
const get = (req, res) => {
  res.end(JSON.stringify(orders));
};
function getDirName(moduleUrl) {
  const filename = fileURLToPath(moduleUrl);
  return path.dirname(filename);
}
const favicon = (req, res) => {
  res.end("img not found");
};
const home = (req, res) => {
  const pathUrl = path.resolve(
    getDirName(import.meta.url),
    "../../../views/index.html"
  );
  console.log(pathUrl);
  res.end(readFileSync(pathUrl).toString("utf-8"));
};
const ROUTES = {
  "/": home,
  "/favicon.ico": favicon,
  "/api/order/create": create,
  "/api/order/get": get,
  "/api/order/subscribe": subscribeOnNewOrder
};
function trigger404(req, res) {
  return () => {
    res.statusCode = 404;
    res.end("Page not found");
  };
}
const requestListener = (req, res) => {
  const { pathname } = getParsedUrl(req);
  const reqFn = (ROUTES == null ? void 0 : ROUTES[pathname]) ?? trigger404(req, res);
  reqFn(req, res);
};
if ({}.NODE_ENV === "production") {
  const app = createServer(requestListener);
  app.listen(3e3, () => {
    console.log("Server is running on http://localhost:3000");
  });
}
const viteNodeApp = requestListener;
export {
  viteNodeApp
};

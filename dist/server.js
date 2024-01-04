import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
let orderLength = 0;
const subscribersOnOrderLength = [];
let ai = 1;
function subscribeUserOnChangeOrderLength(req, res) {
  const timeout = 3e4;
  const user = { id: ai++, res };
  subscribersOnOrderLength.push(user);
  res.on("close", () => {
    unsubscribeUserOnChangeOrderLength(user.id);
  });
  setTimeout(() => {
    res.end(`Application wasnt created for ${timeout / 1e3} seconds`);
  }, timeout);
}
function unsubscribeUserOnChangeOrderLength(userId) {
  subscribersOnOrderLength.filter((subscriber) => subscriber.id !== userId);
}
function sendOderLengthForSubscribers() {
  subscribersOnOrderLength.forEach((subscriber) => {
    subscriber.res.end(String(orderLength));
  });
}
function createOrder() {
  orderLength++;
  sendOderLengthForSubscribers();
}
const create = (req, res) => {
  createOrder();
  res.end("Order created");
};
const get = (req, res) => {
  res.end(String(orderLength));
};
const subscribeOnNewLength = (req, res) => {
  subscribeUserOnChangeOrderLength(req, res);
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
  "/api/order/subscribe": subscribeOnNewLength
};
const PORT = 3e3;
const DOMAIN = "http://localhost";
const BASE_URL = `${DOMAIN}:${PORT}`;
const getParsedUrl = (req) => {
  const parsedUrl = new URL(req.url || "/", BASE_URL);
  return parsedUrl;
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

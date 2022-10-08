import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import uuid from "uuid";

import { SERVER_PORT, ENV } from "./lib/config";
import API_ROUTER_V1 from "./routes/api_v1";
import WS_ROUTER_V1 from "./routes/ws_v1";
import Auth from "./middlewares/Auth";
import ResponseBodyInterceptor from "./middlewares/ResponseBodyInterceptor";

const startUpTime = new Date();

const app = express();
app.use(cors());
app.use(express.json());
app.use(ResponseBodyInterceptor);

app.use("/api/v1", API_ROUTER_V1);

app.get("/heartbeat", (_, res) => {
  const beat = { startUpTime };
  console.log(new Date(), "I am alive");
  res.json(beat);
});

app.use((req, res, next, err) => {
  if (!err) res.end();
  else {
    console.log("error:", err);
    res
      .status(500)
      .json(
        ENV === "DEVELOPMENT"
          ? err
          : { message: "NO STACK IN PROD", params: req.params, body: req.body }
      );
  }
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  path: "/ws",
  cors: {
    origin: "*",
  },
});

WS_ROUTER_V1(io);

main();

async function main() {
  httpServer.listen(SERVER_PORT, () =>
    console.log(`Server in "${ENV}" mode & listening on ${SERVER_PORT}!`)
  );
}

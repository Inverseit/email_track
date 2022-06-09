import { fastify } from "fastify";
import pino from "pino";
import db from "./database/database";
import router from "./routes/index";
import "dotenv/config";

const Port = process.env.FASTIFY_PORT || 7000;
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Not MONGO_URI found");
}

const server = fastify({
  logger: pino({ level: "info" }),
});

// Activate plugins below:
server.register(db, { uri });
server.register(router);

const start = async () => {
  try {
    await server.listen(Port);
    console.log("Server started successfully");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();

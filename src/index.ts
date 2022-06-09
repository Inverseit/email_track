import { fastify } from "fastify";
import pino from "pino";
import db from "./database/database";
import router from "./routes/index";
import "dotenv/config";

const FASTIFY_PORT = process.env.FASTIFY_PORT || 7000;
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
    await server.listen(FASTIFY_PORT, "0.0.0.0", (error) => {
      if (error) {
        process.exit(1);
      }
    });
    
    
    console.log(`🚀  Fastify server running on port ${FASTIFY_PORT}`);
    console.log(`Route index: /`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();

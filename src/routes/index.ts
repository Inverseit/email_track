import { FastifyInstance } from "fastify";
import trackerController from "./tracker";

export default async function router(fastify: FastifyInstance) {
  fastify.register(trackerController, { prefix: "/tracker" });
}

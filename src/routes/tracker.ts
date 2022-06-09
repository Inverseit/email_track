import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import mongoose from "mongoose";
import { sendNotificaton } from "../notifications/telegram";
import { image, baseUrl } from "../consts";

import { Db } from "../database/database";
import { ImageAttrs } from "../database/models/images";

// Declaration merging
declare module "fastify" {
  export interface FastifyInstance {
    db: Db;
  }
}

interface createParams {
  sender_email: string;
  reciever_email: string;
  title: string;
}

interface getParams {
  filename: string;
}

export default async function indexController(server: FastifyInstance) {
  server.get("/", {}, async (request, reply) => {
    try {
      const { Image } = server.db.models;

      const trackers = await Image.find({});

      return reply.code(200).send(trackers);
    } catch (error) {
      request.log.error(error);
      return reply.send(500);
    }
  });

  server.post(
    "/create/",
    async (
      request: FastifyRequest<{ Body: createParams }>,
      reply: FastifyReply
    ) => {
      try {
        const { Image } = server.db.models;

        const id: string = new mongoose.Types.ObjectId().toHexString() + ".png";

        const newTracker: ImageAttrs = {
          sender_email: request.body.sender_email,
          reciever_email: request.body.reciever_email,
          records: [],
          filename: id,
          _id: id,
          title: request.body.title,
        };

        console.log(newTracker);

        const url = `${baseUrl}/tracker/image/${id}`;
        const tracker = await Image.addOne(newTracker);

        await tracker.save();
        return reply.code(201).send({ url });
      } catch (error) {
        request.log.error(error);
        return reply.status(500).send("Error");
      }
    }
  );

  server.get(
    "/image/:filename",
    async function (
      request: FastifyRequest<{ Params: getParams }>,
      reply: FastifyReply
    ) {
      try {
        const filename = request.params.filename;
        const { Image } = server.db.models;
        const tracker = await Image.findOne({ filename });
        if (!tracker) {
          return reply.status(404).send("Not found");
        }
        sendNotificaton(tracker);
        reply.header("Content-Type", "image/png").send(image);
        return;
      } catch (error) {
        console.log(error);
        reply.header("Content-Type", "image/png").send(image);
        return;
      }
    }
  );
}

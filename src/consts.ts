import "dotenv/config";


if (!process.env.BASE_URL) {
    throw "NO BASE_URL";
  }
export const baseUrl = process.env.BASE_URL;

const base64Image: string =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=";
export const image: Buffer = Buffer.from(base64Image, "base64");

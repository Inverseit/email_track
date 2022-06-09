import { ImageDocument } from 'src/database/models/images';
import { Telegram } from 'telegraf';
import "dotenv/config";

const telegram: Telegram = new Telegram(process.env.BOT_TOKEN as string);

const chatId = process.env.ULAN_CHAT_ID as string;

export const sendNotificaton = async (tracker: ImageDocument & {
    _id: any;
}) => {
    try {   
        await telegram.sendMessage(
            chatId,
            `${tracker.reciever_email} opened your ${tracker.title} email`
        );
    } catch (error) {
        console.log(error);
        throw error;
    }
}

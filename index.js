const TelegramAPI = require("node-telegram-bot-api");
const { COMMAND, helpOptions } = require("./options");

// const TG_TOKEN = "5747222529:AAGI7CHGxA485tkEiN376LkFnrqriKMcVqM";
const token = process.env.TG_TOKEN
console.log({token});
const bot = new TelegramAPI(token, { polling: true });

const state = {}

const startBot = (bot) => {
  bot.setMyCommands([
    {
      command: COMMAND.START,
      description: "Вітання",
    },
    {
      command: COMMAND.INFO,
      description: "Інформація",
    },
  ]);

  bot.on("message", async (message) => {
    // console.log({ message });
    const text = message.text;
    const chatId = message.chat.id;

    switch (message.text) {
      case COMMAND.START:
        await bot.sendSticker(
          chatId,
          `https://tlgrm.eu/_/stickers/9a7/7f7/9a77f786-1e16-3095-a0f8-8cdeae5a0326/3.webp`
        );
        await bot.sendMessage(
          chatId,
          `Hello ${message.chat.username}! Your message ${text}`,
          helpOptions
        );
        break;
      case COMMAND.INFO:
        await bot.sendMessage(chatId, `Твоє імя ${message.from.first_name}`);
        break;
      default:
        await bot.sendMessage(chatId, `Я тебе не розумію, спробуй ще раз...`);
    }
  });

  bot.on("callback_query", (message) => {
    const data = message.data;
    const chatId = message.message.chat.id;

    bot.sendMessage(chatId, `Ви вибрали ${data}`);
    console.log({ data: message.data });
  });
};

startBot(bot);

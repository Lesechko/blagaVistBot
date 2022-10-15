module.exports = {
  helpOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [[{ text: "Отримати допомогу", callback_data: "help" }]],
    }),
  },
  COMMAND : {
    START: "/start",
    INFO: "/info"
  }
};

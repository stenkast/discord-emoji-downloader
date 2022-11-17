export const API = {
  baseUrl: "https://discord.com/api/v10",
  guilds: "/users/@me/guilds",
  emojis: (guildId: string) => `/guilds/${guildId}/emojis`,
  request: async (method: string, endPoint: string, token: string) => {
    return await fetch(API.baseUrl + endPoint, {
      method,
      headers: {
        Authorization: token,
      },
    });
  },
};

export const emojiURL = (emojiId: string, animated: boolean = false) =>
  `https://cdn.discordapp.com/emojis/${emojiId}.${animated ? "gif" : "png"}?v=1`;

export const cleanGuildName = (guildName: string) =>
  guildName.replace(/\s/g, "_").replace(/\W/g, "");

export const guildIcon = (guildId: string, guildIcon: string) =>
  guildIcon ? `https://cdn.discordapp.com/icons/${guildId}/${guildIcon}.png` : "/default.png";

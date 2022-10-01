import JSZip, { OutputType } from "jszip";
import { API, emojiURL, cleanGuildName } from "./constants";
import { Emoji, Guild, Done } from "./types";
import { saveAs } from "file-saver";

export const getGuilds = async (token: string) => {
  let res = await API.request("GET", API.guilds, token);
  if (!res.ok) {
    return {
      guilds: [],
      error: true,
      message: "Could not fetch guilds.",
    };
  }
  const guilds = await res.json();
  return {
    guilds: guilds,
    error: false,
    message: "",
  };
};

export const filterGuilds = (guilds: Guild[], search: string) => {
  return search === ""
    ? guilds
    : guilds.filter((server) => {
        return server.name.toLowerCase().includes(search.toLowerCase());
      });
};

export const getGuildEmojis = async (guildId: string, token: string) => {
  let res = await API.request("GET", API.emojis(guildId), token);
  if (!res.ok) {
    return {
      emojis: [],
      error: true,
      message: "Could not fetch guild emojis.",
    };
  }
  const emojis = await res.json();
  return {
    emojis: emojis,
    error: false,
    message: "",
  };
};

type ReturnValue = Blob | Done;

export const downloadEmojis = async (
  emojis: Emoji[],
  guildName: string
): Promise<ReturnValue> => {
  const uniqueNamedEmojis: Emoji[] = [];
  const hasSameName: { [key: string]: string | undefined } = {};

  emojis.forEach(async (emoji) => {
    const name = emoji.name;
    const alreadyExistingCount = hasSameName[name] || 0;
    hasSameName[name] = (Number(alreadyExistingCount) + 1).toString();
    if (alreadyExistingCount > 0) {
      const newName = `${name}~${alreadyExistingCount}`;
      uniqueNamedEmojis.push({ ...emoji, name: newName });
    } else {
      uniqueNamedEmojis.push(emoji);
    }
  });

  const zip = new JSZip();
  for (const emoji of emojis) {
    const res = await fetch(emojiURL(emoji.id, emoji.animated)).then(
      async (res) => res.blob()
    );
    zip.file(`${emoji.name}.${emoji.animated ? "gif" : "png"}`, res);
  }

  const numberOfEntries = Object.keys(zip.files).length;

  if (numberOfEntries === 0) {
    return {
      error: true,
      message: "Failed to download emojis, did u select any?",
      type: "failure",
    };
  }

  const zipFile = await zip.generateAsync({ type: "blob" });

  return zipFile;

  // zip.generateAsync({ type: "blob" }).then(function (content) {
  //   saveAs(content, `Emojis_${cleanGuildName(guildName)}.zip`);
  // });
};

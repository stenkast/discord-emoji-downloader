import Div100vh from "react-div-100vh";
import { useState } from "react";
import { Emoji, Done, Guild } from "./utils/types";
import { getGuildEmojis, getGuilds, prepareEmojis } from "./utils/functions";
import { saveAs } from "file-saver";
import { cleanGuildName } from "./utils/constants";
import { FaceSmileIcon, FaceFrownIcon } from "@heroicons/react/24/outline";
import { Button, EmojiList, GuildList, InfoHeader, InfoModal } from "./components";
import { getTokenFromLocalStorage, saveTokenToLocalStorage } from "./utils/localStorage";

export default function App() {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);
  const [token, setToken] = useState<string>(getTokenFromLocalStorage);
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [guildName, setGuildName] = useState<string>("");
  const [done, setDone] = useState<Done | null>(null);
  const [emojisToDownload, setEmojisToDownload] = useState<Emoji[]>(emojis ? emojis : []);
  const [downloadable, setDownloadable] = useState<Blob | null>(null);

  const saveEmojis = async () => {
    if (fetching) return;
    setDone(null);
    if (emojisToDownload.length < 0) return;
    setFetching(true);
    setDone({
      error: false,
      message: "Readying your Emojis...",
      type: "archiving",
    });

    const preparedEmojis = await prepareEmojis(emojisToDownload, guildName);

    if ("error" in preparedEmojis) {
      setDone({ error: true, message: preparedEmojis.message, type: "failure" });
      setFetching(false);
      return;
    }
    setEmojisToDownload([]);
    setDownloadable(preparedEmojis);
    setDone({ error: false, message: "Your Emojis are Ready!", type: "ready" });
    setFetching(false);
  };

  const fetchEmojis = async (guild: Guild) => {
    setDone(null);
    setEmojisToDownload([]);
    setDownloadable(null);
    setFetching(false);
    if (!token)
      return {
        emojis: [],
        error: true,
        message: "Please Provide Token.",
      };
    setFetching(true);
    const { emojis, error, message } = await getGuildEmojis(guild.id, token);
    if (error) {
      setFetching(false);
      setDone({ error, message, type: "failure" });
      return;
    }
    saveTokenToLocalStorage(token);
    setGuildName(guild.name);
    setFetching(false);
    setEmojis(emojis);
  };

  const fetchServers = async () => {
    setDone(null);
    setFetching(false);
    if (!token)
      return {
        emojis: [],
        error: true,
        message: "Please Provide Token.",
      };
    setFetching(true);
    const { guilds, error, message } = await getGuilds(token);
    if (error) {
      setFetching(false);
      setDone({ error, message, type: "failure" });
      return;
    }
    setFetching(false);
    setGuilds(guilds);
  };

  const showFetchServersButton = emojis.length === 0 && guilds.length === 0;
  const showEmojiList = emojis.length !== 0;
  const showGuildsList = guilds.length !== 0;

  const downloadEmojis = () => {
    if (!downloadable) return;
    saveAs(downloadable, `Emojis_${cleanGuildName(guildName)}.zip`);
    setEmojisToDownload([]);
    setDownloadable(null);
    setDone({ error: false, message: "Your Emojis have been downloaded!", type: "ready" });
  };

  return (
    <Div100vh>
      <div className="h-full flex justify-center bg-gray text-white">
        <div className="max-w-xl mt-8">
          <InfoHeader />
          <div className="flex flex-col gap-1 max-w-xl mx-auto w-full">
            {showGuildsList ? (
              <GuildList guildName={guildName} guilds={guilds} fetchEmojis={fetchEmojis} />
            ) : (
              <>
                <label className="font-semibold text-left">
                  User Token{" "}
                  <span
                    className="text-blue cursor-pointer hover:text-dark-blue"
                    onClick={() => setIsInfoModalOpen(true)}
                  >
                    (?)
                  </span>
                </label>
                <input
                  className="w-full p-2 rounded-md bg-dark-gray text-white placeholder:text-light-gray"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  type="password"
                  placeholder="Ek8Mof0kYrCSp.WlNM7SNDZ4x3ZqL01YjOA6INjdz2D4I.NwFdHLxoH2yGpN3RRzdQhP8G"
                />
              </>
            )}
          </div>
          {showFetchServersButton && (
            <Button
              label="Fetch Servers"
              disabled={false}
              fetching={fetching}
              onClick={fetchServers}
            />
          )}
          <div className="text-white mt-4 h-10 text-xl">
            {showEmojiList && (
              <>
                <EmojiList
                  emojis={emojis}
                  emojisToDownload={emojisToDownload}
                  setEmojisToDownload={setEmojisToDownload}
                />
                <div className="flex gap-2">
                  <Button
                    label="Archive Emojis"
                    disabled={downloadable ? true : fetching ? true : false}
                    fetching={false}
                    onClick={saveEmojis}
                  />

                  {downloadable && (
                    <Button
                      label="Download Emojis"
                      fetching={false}
                      disabled={false}
                      onClick={downloadEmojis}
                    />
                  )}
                </div>
              </>
            )}
            {done && done.type === "failure" && (
              <p className="mt-4 flex gap-2 items-center">
                <FaceFrownIcon className="w-12 h-12 text-red-600" />
                {done.message}
              </p>
            )}
            {done && done.type === "archiving" && (
              <p className="mt-4 flex gap-2 items-center">
                <svg
                  className="animate-spin h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {done.message}
              </p>
            )}
            {done && done.type === "ready" && (
              <p className="mt-4 flex gap-2 items-center">
                <FaceSmileIcon className="w-12 h-12 text-green-600" />
                {done.message}
              </p>
            )}
          </div>
        </div>
        <InfoModal isInfoModalOpen={isInfoModalOpen} setIsInfoModalOpen={setIsInfoModalOpen} />
      </div>
    </Div100vh>
  );
}

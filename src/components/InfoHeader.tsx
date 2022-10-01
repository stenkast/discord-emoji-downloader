import { InformationCircleIcon } from "@heroicons/react/24/solid";

export const InfoHeader = () => {
  return (
    <div className="flex gap-2 font-medium mb-4 border-2 rounded-md border-light-blue bg-light-blue/10 p-1">
      <div>
        <InformationCircleIcon className="w-8 h-8 fill-light-blue" />
      </div>
      <p>
        Sharing your token can be dangerous. This page does not use your token
        in any harmful way, but uses it to authenticate with Discord to get your
        server list and their emojis.{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/stenkast/discord-emoji-downloader"
          className="underline"
        >
          Source can be found here
        </a>
      </p>
    </div>
  );
};

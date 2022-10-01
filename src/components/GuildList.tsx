import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { Combobox, Transition } from "@headlessui/react";
import { Guild } from "../utils/types";
import { useState } from "react";
import { filterGuilds } from "../utils/functions";

type Props = {
  guilds: Guild[];
  fetchEmojis: (value: Guild) => void;
  guildName: string;
};

export const GuildList = ({ guilds, fetchEmojis, guildName }: Props) => {
  const [search, setSearch] = useState<string>("");

  const filteredGuilds = filterGuilds(guilds, search);

  return (
    <Combobox
      value={guildName ? guildName : "Select Server"}
      onChange={setSearch}
    >
      <div className="relative w-full bg-blue rounded-lg text-sm font-medium flex px-2">
        <Combobox.Input
          onChange={(event) => setSearch(event.target.value)}
          className="text-white bg-transparent w-full focus:outline-none px-4 py-2.5 inline-flex items-center justify-between"
        />
        <Combobox.Button>
          <ChevronUpDownIcon className="h-6 w-6" />
        </Combobox.Button>
      </div>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Combobox.Options className="max-h-96 overflow-y-auto overflow-x-hidden">
          {filteredGuilds.map((guild) => (
            <Combobox.Option
              key={guild.id}
              value={guild.name}
              onClick={() => fetchEmojis(guild)}
              className="flex cursor-pointer p-2 items-center whitespace-nowrap rounded text-light-gray hover:bg-dark-gray w-full text-sm font-medium"
            >
              {guild.name}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
};

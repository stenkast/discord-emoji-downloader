import {
  ChevronUpDownIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { Combobox, Transition } from "@headlessui/react";
import { Emoji } from "../utils/types";

type Props = {
  emojis: Emoji[];
  emojisToDownload: Emoji[];
  setEmojisToDownload: (emojis: Emoji[]) => void;
};

export const EmojiList = ({
  emojis,
  emojisToDownload,
  setEmojisToDownload,
}: Props) => {
  const selectOrDeselectButton = () => {
    if (emojis.length === emojisToDownload.length) {
      setEmojisToDownload([]);
    } else {
      setEmojisToDownload(emojis);
    }
  };

  return (
    <Combobox value={emojisToDownload} onChange={setEmojisToDownload} multiple>
      <div className="w-full bg-blue rounded-lg text-sm font-medium flex px-2">
        <Combobox.Button className="text-white bg-transparent w-full focus:outline-none px-4 py-2.5 text-left">{`Select Emojis ${emojisToDownload.length}/${emojis.length}`}</Combobox.Button>
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
        className="flex flex-col"
      >
        <Combobox.Options className="max-h-96 w-full overflow-y-auto overflow-x-hidden">
          {emojis.map((emoji) => (
            <Combobox.Option
              key={emoji.id}
              value={emoji}
              className="flex cursor-pointer p-2 items-center whitespace-nowrap rounded text-light-gray hover:bg-dark-gray w-full text-sm font-medium"
            >
              {({ selected }) => (
                <div
                  className="flex items-center justify-center gap-2"
                  key={emoji.id}
                >
                  {selected && (
                    <CheckCircleIcon className="w-6 h-6 fill-green-700" />
                  )}
                  {!selected && (
                    <XCircleIcon className="w-6 h-6 fill-red-700" />
                  )}
                  <div className="w-6 h-6 flex items-center justify-center">
                    <img
                      className="h-6"
                      alt=""
                      src={`https://cdn.discordapp.com/emojis/${emoji.id}.${
                        emoji.animated ? "gif" : "png"
                      }?v=1`}
                    />
                  </div>
                  {emoji.name}
                </div>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
        <button
          onClick={selectOrDeselectButton}
          type="button"
          className="my-2 h-8 w-24 self-end rounded-md bg-blue text-base font-bold text-white shadow-sm hover:bg-dark-blue outline-none"
        >
          {emojis.length === emojisToDownload.length
            ? "Deselect All"
            : "Select All"}
        </button>
      </Transition>
    </Combobox>
  );
};

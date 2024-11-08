import React from "react";
import Image from "next/image";
import { IConnection } from "@/types/types";
import { useSendConnectionRequest } from "@/utils/api";
import { useToast } from "@/context/toast/toast";

interface SingleSuggestionProps {
  user: IConnection;
  handleConnectionSent: () => void;
}

const SingleSuggestion: React.FC<SingleSuggestionProps> = ({ user, handleConnectionSent }) => {

  const { showSuccessToast } = useToast();
  const { sendConnectionRequest } = useSendConnectionRequest();

  const renderButton = () => {

    const handleConnectClick = async () => {
      const requestSent = await sendConnectionRequest(user.userId);
      if (requestSent) {
        showSuccessToast("Connection request sent");
        await handleConnectionSent();
      }
    };

    if (!user.isFollowing && !user.isRequested) {
      return (
        <button
          title="Connect"
          type="button"
          className="text-font_main flex items-center justify-center rounded-md bg-primary px-3 py-1 text-base outline-none transition-all duration-300"
          onClick={handleConnectClick}
        >
          Connect
        </button>
      );
    } else if (user.isFollowing) {
      return (
        <button
          title="Chat"
          type="button"
          className="text-font_main flex items-center justify-center rounded-md bg-primary px-3 py-1 text-base outline-none transition-all duration-300"
          onClick={() => {/* Logic to initiate chat */ }}
        >
          Chat
        </button>
      );
    } else if (user.isRequested) {
      return (
        <button
          title="Sent"
          type="button"
          className="text-font_main flex items-center justify-center rounded-md bg-transparent border border-primary px-3 py-1 text-base outline-none transition-all duration-300 cursor-not-allowed"
          disabled
        >
          Sent
        </button>
      );
    }
  };

  return (
    <div className="flex items-center p-3 hover:bg-bg_card2 cursor-pointer relative">
      <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
        <Image
          src={user.avatarUrl || "/pfp.jpg"}
          width={50}
          height={50}
          alt="desc"
          className="object-cover w-fit h-fit rounded-full"
        />
      </div>
      <div className="ml-4 flex flex-col flex-grow justify-between">
        <h4 className="font-light tracking-wide text-font_main">{user.username}</h4>
        <p className="text-sm text-gray-600 truncate">
          {user.bio}
        </p>
      </div>
      {renderButton()}
      <span className="absolute bottom-0 left-14 right-0 h-[2px] bg-bg_card2" />
    </div>
  );
};

export default SingleSuggestion;

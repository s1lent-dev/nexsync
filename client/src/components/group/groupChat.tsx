"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SingleGroupChat from "./singleGroupChat";
import { useSelector } from "react-redux";
import { useGetGroupChats } from "@/hooks/chat";
import { RootState } from "@/context/store";

const GroupChat = () => {
  
  const [searchQuery, setSearchQuery] = useState<string>("");
  const groups = useSelector((state: RootState) => state.chat.groupChats);
  const { getGroupChats } = useGetGroupChats();

  useEffect(() => {
    getGroupChats();
  }, []);

  const filteredGroups = groups.filter((group) => group.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <section className="flex flex-col p-4 w-full gap-6 h-full">
      {/* Header with title and icons */}
      <div className="flex flex-row justify-between">
        <h2 className="font-sfpro text-font_main text-xl font-bold antialiased">
          Groups
        </h2>
        <div className="flex flex-row gap-6">
          <Image src="/new-chat.svg" width={25} height={25} alt="New Chat"/>
          <Image src="/menu.svg" width={25} height={25} alt="Menu" />
        </div>
      </div>

      {/* Search Input */}
      <div className="w-full bg-bg_card1 p-1 rounded-lg flex items-center">
        <Image src="/search.svg" width={25} height={25} alt="Search Icon" />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-10/12 bg-transparent placeholder:text-font_light placeholder:font-thin placeholder:font-segoe ml-2 focus:outline-none"
        />
      </div>

      {/* Chat List with scrollable div */}
      <div className="flex-grow overflow-y-scroll custom-scrollbar scrollbar-thin pr-2 space-y-2">
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => (
            <SingleGroupChat key={group.chatId} group={group} />
          ))
        ) : (
          <p className="text-font_dark text-center">No Groups found</p>
        )}
      </div>
    </section>
  );
};

export default GroupChat;


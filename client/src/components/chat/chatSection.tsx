import React, { useState } from 'react';
import Image from 'next/image';
import Profile from './profile';

const ChatSection = () => {
  // State to manage sidebar visibility
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Function to handle sidebar close action
  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <section className="flex h-full w-full">
      {/* Main Chat Section */}
      <div className={`flex flex-col h-full ${isSidebarOpen ? 'w-1/2' : 'w-full'} transition-width duration-300`}>
        {/* Navbar */}
        <nav className="flex justify-between items-center px-4 py-2 bg-bg_card1">
          {/* User Info */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSidebarOpen(true)}>
            <Image src='/pfp.jpg' width={40} height={40} alt='desc' className="rounded-full cursor-pointer" />
            <div>
              <h3 className="font-semibold text-font_main">Username</h3>
              <p className="text-sm text-primary">Online</p>
            </div>
          </div>
          {/* Icons */}
          <div className="flex gap-6">
            <Image src='/delete.svg' width={27.5} height={27.5} alt='delete' className="cursor-pointer" />
            <Image src='/search.svg' width={27.5} height={27.5} alt='search' className="cursor-pointer" />
            <Image src='/menu.svg' width={27.5} height={27.5} alt='menu' className="cursor-pointer" />
          </div>
        </nav>

        {/* Messages Section */}
        <article className="flex-grow overflow-y-scroll p-4 bg-bg_dark2 custom-scrollbar space-y-4">
          {/* Placeholder for messages */}
          <p className="text-center text-gray-400">No messages yet</p>
        </article>

        {/* Footer */}
        <footer className="flex items-center gap-3 p-3 bg-bg_card1">
          <Image src='/emojis.svg' width={25} height={25} alt='emojis' className="cursor-pointer" />
          <Image src='/attach.svg' width={30} height={30} alt='attach' className="cursor-pointer" />
          <input
            type='text'
            placeholder='Type a message'
            className="flex-grow placeholder:text-slate-50 px-4 py-2 rounded-lg bg-slate-600 opacity-30 focus:outline-none"
          />
          <Image src='/mic.svg' width={25} height={25} alt='mic' className="cursor-pointer" />
        </footer>
      </div>

      {/* Profile Sidebar */}
      {isSidebarOpen && (
        <div className="flex flex-col h-full w-1/2 bg-bg_dark1">
          <Profile onClose={handleSidebarClose} />
        </div>
      )}
    </section>
  );
};

export default ChatSection;

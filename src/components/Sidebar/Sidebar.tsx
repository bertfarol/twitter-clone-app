import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  DotsCircleHorizontalIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import SidebarMenu from "./SidebarMenu";
import { useState, useEffect, useRef } from "react";

export default function Sidebar() {
  const { data: session } = useSession();
  const [logoutBoxOpen, setLogoutBoxOpen] = useState(false);

  let logoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const handler = (e: MouseEvent) => {
    if (!logoutRef.current?.contains(e.target as Element)) {
      setLogoutBoxOpen(false);
    }
  };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="relative items-center col-span-1 lg:px-4 md:col-span-2 md:items-start">
      <div className="lg:fixed flex flex-col justify-between lg:h-full lg:min-w-[224px]">
        <div>
          <img
            className="w-10 h-10 m-3"
            src="https://links.papareact.com/drq"
            alt=""
          />
          <SidebarMenu Icon={HomeIcon} title="Home" />
          <SidebarMenu Icon={HashtagIcon} title="Explore" />
          <SidebarMenu Icon={BellIcon} title="Notification" />
          <SidebarMenu Icon={MailIcon} title="Messages" />
          <SidebarMenu Icon={BookmarkIcon} title="Bookmarks" />
          <SidebarMenu
            onClick={session ? signOut : signIn}
            Icon={UserIcon}
            title={session ? "Sign out" : "Sign in"}
          />
          <SidebarMenu Icon={DotsCircleHorizontalIcon} title="More" />
        </div>
        {session && (
          <div className="relative" ref={logoutRef}>
            <div
              onClick={() => setLogoutBoxOpen(!logoutBoxOpen)}
              className="flex p-3 mb-4 rounded-full cursor-pointer hover:bg-zinc-100"
            >
              <img
                className="object-cover w-10 h-10 rounded-full"
                src={session?.user?.image || "https://links.papareact.com/gll"}
                alt=""
              />
              <div
                className="flex items-center justify-between ml-3 md:inline-flex grow"
                onClick={() => setLogoutBoxOpen(!logoutBoxOpen)}
              >
                <div>
                  <p className="font-bold">{session?.user?.name}</p>
                  <p className="text-gray-500">
                    @{session?.user?.name?.replace(/\s+/g, "").toLowerCase()}
                  </p>
                </div>
                <DotsHorizontalIcon className="w-6 h-6" />
              </div>
            </div>

            {logoutBoxOpen && (
              <div className="absolute drop-shadow-lg bg-white px-3.5 py-2 top-[-47px] left-2/4 translate-x-[-50%] rounded-lg	hover:bg-zinc-100 cursor-pointer w-48">
                <div className="font-bold" onClick={() => {
                  session ? signOut : signIn;
                }}>
                  Log out @{session?.user?.name?.replace(/\s+/g, "").toLowerCase()}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface SidebarMenu {
  Icon: any;
  title: string;
  onClick?: () => void;
  disable?: boolean;
}

function SidebarMenu({ Icon, title, onClick, disable }: SidebarMenu) {

  const className = disable
    ? "text-gray-400"
    : "cursor-pointer hover:bg-zinc-100 duration-200 rounded-full transition-all";

  return (
    <div
      onClick={() => onClick?.()}
      className={`${className} flex items-center px-3 py-4 space-x-3 md:px-4 max-w-fit`}
    >
      <Icon className="w-7 h-7" />
      <p className="hidden text-base font-normal md:inline-flex lg:text-xl">
        {title}
      </p>
    </div>
  );
}

export default SidebarMenu;

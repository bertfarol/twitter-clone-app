interface SidebarMenu {
  Icon: any;
  title: string;
  onClick?: () => void;
}

function SidebarMenu({ Icon, title, onClick }: SidebarMenu) {
  return (
    <div
      onClick={() => onClick?.()}
      className="flex items-center px-3 py-4 space-x-3 transition-all duration-200 rounded-full cursor-pointer md:px-4 max-w-fit hover:bg-zinc-100"
    >
      <Icon className="w-7 h-7" />
      <p className="hidden text-base font-normal md:inline-flex lg:text-xl">
        {title}
      </p>
    </div>
  );
}

export default SidebarMenu;

import { Menu } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import type { FC } from "react";

const Nav: FC<{
  user: {
    id: string;
  } & {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}> = (props) => {
  return (
    <nav className="flex h-16 items-center bg-zinc-900 px-8">
      <div className="text-xl font-light uppercase tracking-widest">Matter</div>

      <div className="flex-1"></div>

      <div className="relative">
        <Menu>
          <Menu.Button>
            <Image
              src={props.user.image ?? "https://i.pravatar.cc/300"}
              alt="User avatar"
              width={32}
              height={32}
              className="cursor-pointer rounded-full object-cover"
            />
          </Menu.Button>
          <Menu.Items className="absolute top-16 right-0 min-w-[200px] rounded bg-zinc-900">
            <Menu.Item>
              {() => (
                <button
                  className="w-full rounded p-2 hover:bg-sky-600"
                  onClick={() => {
                    signOut().catch((err) => console.log(err));
                  }}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </nav>
  );
};

export default Nav;

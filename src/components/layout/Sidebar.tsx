"use client";

import { Drawer } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import Button from "../shared/Button";
import Avatar from "../Avatar";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import BurgerMenuClose from "@/../public/icons/burger-menu-close.svg";

const Sidebar = ({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) => {
  const user = useAuth();
  const router = useRouter();
  return (
    <>
      <Drawer
        className="w-5/6 bg-primary !p-0 "
        open={isOpen}
        onClose={handleClose}
      >
        <Drawer.Items className="!p-5">
          <div className="mx-auto flex w-full max-w-full flex-col justify-between px-0 text-white lg:hidden">
            <div className="flex w-full items-center justify-between bg-primary">
              <Link href="/">
                <Image
                  src="/images/future-surprise-logo.png"
                  height={47}
                  width={197}
                  alt="logo"
                />
              </Link>
              <Image
                src={BurgerMenuClose}
                alt="menu"
                className="mr-4 cursor-pointer md:hidden"
                onClick={() => handleClose()}
              />
            </div>
            <div className="flex flex-col items-start gap-8 overflow-y-auto py-10">
              <Link
                className="flex font-bold hover:underline"
                href="/FAQs"
              >
                FAQ
              </Link>
              <Link
                className="flex font-bold hover:underline"
                href="/collections"
              >
                Gallery
              </Link>
              <Link
                className="flex font-bold hover:underline"
                href="/contact-us"
              >
                Contact
              </Link>

              {!user?.id ? (
                <>
                  <Button
                    variant="transparent"
                    className="!px-0 font-bold hover:underline"
                    onClick={() => {
                      router.push("/login");
                    }}
                  >
                    Sign in
                  </Button>
                  <Link
                    className="flex rounded-md !border bg-primary px-3 py-2 font-bold text-white hover:bg-primary"
                    href="/surprise"
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <li className="list-none">
                  <Avatar user={user} />
                </li>
              )}
            </div>
          </div>
        </Drawer.Items>
      </Drawer>
    </>
  );
};

export default Sidebar;

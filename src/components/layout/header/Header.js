import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { dataNavbar } from "@/constant/navbar";
import { Arrow, IconCart, IconMenu } from "@/constant/Icon";
import LogoLevion from "@/public/images/LogoLevion.png";
import ButtonBase, { buttonType } from "@/components/button/ButtonBase";
import { Logo } from "@/constant/image";
import Menu from "./menu";

function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);

  const handleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpenMenu(false);
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  const handleResize = () => {
    if (window.innerWidth > 680) {
      setIsOpenMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.addEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className="flex flex-row items-center w-full justify-between px-20 py-8 shadow-xl max-xl:px-10 max-lg:px-4">
        <Link href="/">
          <Image
            src={LogoLevion}
            alt="logo-levion"
            width={156}
            height={44}
            className="block max-sm:hidden "
          />
          <Logo
            className="sm:hidden"
            currentColor="#9453FF"
            width={40}
            height={40}
          />
        </Link>
        <ul className="flex flex-row gap-6 max-lg:hidden">
          {dataNavbar.map((navbar) => {
            const isActive = pathname.startsWith(navbar.href);
            const isLearningResources = navbar.title === "Learning Resources";
            return (
              <div key={navbar.id}>
                <div className="flex flex-row items-center">
                  <Link
                    href={navbar.href}
                    className={isActive ? "text-primary" : "text-gray"}
                  >
                    <p className="font-bold text-base">{navbar.title}</p>
                  </Link>
                  {isLearningResources && (
                    <Arrow
                      onClick={handleDropdown}
                      isDropdown={isDropdown}
                      className={
                        isDropdown
                          ? "cursor-pointer rotate-90"
                          : "cursor-pointer"
                      }
                    />
                  )}
                </div>
                {isDropdown && (
                  <div
                    className={
                      navbar.title === "Learning Resources"
                        ? "flex flex-col pl-4 pr-4 pt-4 pb-4 gap-4 absolute bg-white "
                        : ""
                    }
                  >
                    {navbar.menu?.map((item) => (
                      <Link key={item.id} href={item.href}>
                        <p className="text-gray">{item.title}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </ul>

        <div className="flex flex-row-reverse gap-4 items-center">
          <div className="max-lg:hidden flex flex-row gap-4">
            <ButtonBase
              type={buttonType.noBackground}
              onClick={() => router.push("/login")}
            >
              <p className="font-bold">Sign in</p>
            </ButtonBase>
            <ButtonBase
              type={buttonType.background}
              onClick={() => router.push("/register")}
            >
              <p className="font-bold">Sign up</p>
            </ButtonBase>
          </div>
          <div className="flex flex-row gap-4">
            <IconCart />
            <IconMenu
              onClick={handleOpenMenu}
              isOpenMenu={isOpenMenu}
              className="lg:hidden cursor-pointer"
            />
          </div>
        </div>
      </div>
      {isOpenMenu && <Menu />}
    </div>
  );
}

export default Header;

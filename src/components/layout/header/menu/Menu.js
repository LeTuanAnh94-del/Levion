import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import ButtonBase, { buttonType } from "@/components/button/ButtonBase";
import { Arrow } from "@/constant/Icon";
import { dataNavbar } from "@/constant/navbar";

export default function Menu() {
  const router = useRouter();
  const [isDropdown, setIsDropdown] = useState(false);

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  return (
    <div className="flex w-full justify-end absolute px-4 bg-white">
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-4">
          <ButtonBase
            type={buttonType.secondary}
            onClick={() => router.push("/login")}
            className="px-6 py-2 hover:text-white"
          >
            <p className="font-bold transition-all ease-in duration-75">
              Sign in
            </p>
          </ButtonBase>
          <ButtonBase
            type={buttonType.primary}
            onClick={() => router.push("register")}
            className="px-6 py-2"
          >
            <p className="font-bold transition-all ease-in duration-75">
              Sign up
            </p>
          </ButtonBase>
        </div>
        <div className="flex flex-col pt-3">
          {dataNavbar.map((navbar) => {
            const isLearningResources = navbar.title === "Learning Resources";
            return (
              <div
                key={navbar.id}
                className="px-4 py-3 transition-all ease-in duration-75 hover:bg-pink"
              >
                <div className="flex flex-row gap-1">
                  <Link href={navbar.href}>
                    <p className="font-bold text-grey_light">{navbar.title}</p>
                  </Link>
                  {isLearningResources && (
                    <Arrow
                      onClick={handleDropdown}
                      isDropdown={isDropdown}
                      className={
                        isDropdown
                          ? "cursor-pointer transition-transform duration-200 transform rotate-90"
                          : "cursor-pointer transition-transform duration-200 transform"
                      }
                    />
                  )}
                </div>
                {isDropdown && (
                  <div
                    className={
                      navbar.title === "Learning Resources"
                        ? "flex flex-col pl-4 pt-4 gap-4"
                        : ""
                    }
                  >
                    {navbar.menu?.map((item) => (
                      <Link key={item.id} href={item.href}>
                        <p className="text-grey_light">{item.title}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

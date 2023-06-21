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
            type={buttonType.noBackground}
            onClick={() => router.push("/login")}
          >
            <p className="font-bold text-primary">Sign in</p>
          </ButtonBase>
          <ButtonBase
            type={buttonType.background}
            onClick={() => router.push("register")}
          >
            <p className="font-bold text-white">Sign up</p>
          </ButtonBase>
        </div>
        <div className="flex flex-col pt-3">
          {dataNavbar.map((navbar) => {
            const isLearningResources = navbar.title === "Learning Resources";
            return (
              <div key={navbar.id} className="px-4 py-3 hover:bg-[#F7F5FA]">
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
                        ? "flex flex-col pl-4 pt-4 gap-4 text-grey_light" 
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
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";

import LogoLevion from "../../public/images/LogoLevion.png";
import BannerCongratulation from "../../public/images/BannerCongratulation.png";
import ButtonBase, { buttonType } from "@/components/button/ButtonBase";

export default function Congratulation() {
  return (
    <div className="bg-purple-200 w-full h-[100vh] flex justify-center items-center">
      <div className="flex justify-center items-center px-16 py-10 bg-white mx-4 w3-animate-zoom max-sm:px-4 max-sm:py-6">
        <div className="flex flex-col items-center gap-8 max-sm:gap-6">
          <Image src={LogoLevion} alt="LogoLevion" className="max-sm:w-36" />
          <Image
            src={BannerCongratulation}
            alt="BannerCongratulation"
            className="max-sm:w-[280px]"
          />
          <div className="flex flex-col items-center gap-1">
            <p className="font-bold text-2xl text-success text-center">
              Your Password has changed Successful
            </p>
            <p className="text-xl text-grey text-center max-sm:text-base">
              Let’s Discover Vietnamese with us
            </p>
          </div>
          <Link href={"/login"} className="w-full">
            <ButtonBase type={buttonType.background} className="w-full">
              <p className="text-center text-white text-lg leading-6 font-bold max-sm:text-base">
                Let’s Start
              </p>
            </ButtonBase>
          </Link>
        </div>
      </div>
    </div>
  );
}

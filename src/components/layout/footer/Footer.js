import { Logo, LogoFacebook, LogoIns } from "@/constant/image";
import { dataNavbar } from "@/constant/navbar";
import Link from "next/link";

function Footer() {
  return (
    <div className="w-full bg-[#362355] px-[48.5px] py-16 flex items-center justify-center">
      <div className="flex flex-col gap-6 items-center justify-center">
        <Logo width="64" height="64" currentColor="#FFFFFF" />
        <div className="flex flex-wrap gap-x-6 gap-y-4 justify-center">
          <Link href={"/"} className="flex items-end">
            <p className="text-white">Home</p>
          </Link>
          {dataNavbar.map((navbar) => (
            <Link key={navbar.id} href={navbar.href}>
              <p className="text-white">{navbar.title}</p>
            </Link>
          ))}
        </div>
        <div className="flex flex-row gap-6">
          <LogoFacebook />
          <LogoIns />
          <LogoFacebook />
          <LogoIns />
        </div>
        <p className="text-white">©2022 Levion. All copyrights reserved</p>
      </div>
    </div>
  );
}

export default Footer;

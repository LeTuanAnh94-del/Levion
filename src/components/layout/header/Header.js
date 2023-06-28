import Link from "next/link";
import Image from "next/image";

import LogoVietGangz from "../../../public/images/LogoVietGang.png";
import { getAuth, signOut } from "firebase/auth";
import { appFirebase } from "../../../firebase/firebase";
import { useRouter } from "next/router";

function Header() {
  const auth = getAuth(appFirebase);
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        console.log("Logout failed:", error);
      });
  };

  return (
    <div>
      <div className="flex flex-row items-center w-full justify-between px-20 shadow-xl max-xl:px-10 max-lg:px-4">
        <Link href="/">
          <Image src={LogoVietGangz} alt="LogoLevion" width={100} height={40} />
        </Link>
        <button
          onClick={handleLogout}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}

export default Header;

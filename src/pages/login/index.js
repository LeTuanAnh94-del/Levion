import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";

import { appFirebase } from "../../firebase/firebase";
import BaseInput from "@/components/baseInput/BaseInput";
import ButtonBase, { buttonType } from "@/components/button/ButtonBase";
import { ShowToast } from "@/utils/ShowToast";
import LogoLevion from "../../public/images/LogoLevion.png";
import LogoGoogle from "../../public/images/LogoGoogle.png";
import { Loading } from "@/constant/Icon";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your password"),
  password: Yup.string().required("Please enter your password"),
});

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth(appFirebase);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleLogin(values.email, values.password);
    },
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is logged in", user);
      } else {
        console.log("User is logged out");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const handleLogin = async (email, password) => {
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      ShowToast("Login Successful", "success");
      router.push("/");
    } catch (error) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        const errorMessage = "Invalid email or password";
        formik.setErrors({
          email: errorMessage,
          password: errorMessage,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Lỗi đăng nhập:", errorCode, errorMessage);
      });
  };

  return (
    <div className="bg-purple-200 w-full h-[100vh] flex justify-center items-center xl:h-full">
      <div className="w3-animate-zoom bg-white gap-6 flex flex-col items-center w-full mx-4 my-[55px] px-6 py-4 rounded sm:mx-[10%] md:mx-[15%] md:px-16 md:py-10 lg:mx-[20%] xl:mx-[30%]">
        <div className="flex flex-col gap-6 items-center w-full md:gap-8">
          <Image src={LogoLevion} alt="LegoLevion" />
          <p className="font-bold text-2xl text-[#281C42] xl:gap-8 xl:text-[32px] xl:leading-10 text-center">
            Sign in to your account
          </p>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col items-center w-full xl:gap-2"
          >
            <div className="flex flex-col items-start justify-start w-full xl:pt-2">
              <div className="flex flex-row gap-1">
                <p className="font-bold text-sm">Email</p>
                <span className="text-warning">*</span>
              </div>
              <div className="pb-6 w-full">
                <BaseInput
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  placeholder="Your Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="text-sm text-warning absolute w3-animate-opacity">
                    {formik.errors.email}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="w-full xl:pt-2">
              <div className="flex flex-row gap-1">
                <p className="font-bold text-sm ">Password</p>
                <span className="text-warning">*</span>
              </div>
              <div className="pb-6 w-full">
                <BaseInput
                  id="password"
                  name="password"
                  type="password"
                  value={formik.values.password}
                  placeholder="Your Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.email ? (
                  <p className="text-sm text-warning absolute w3-animate-opacity">
                    {formik.errors.email}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-3 items-center w-full">
              <ButtonBase
                type={isLoading ? buttonType.disabled : buttonType.background}
                className="w-full gap-4 lg:px-6 lg:py-4"
                disabled={isLoading ? true : ""}
              >
                <p className="font-bold text-white text-base lg:text-lg flex">
                  {isLoading ? "...loading" : "Sign In"}
                </p>
                <div className="relative">{isLoading ? <Loading /> : ""}</div>
              </ButtonBase>
              <p className="font-bold text-base text-[#554766] cursor-pointer">
                <Link href={"/forgot-password"}>Forgot Password</Link>
              </p>
              <p className="text-base text-[#9387A8] cursor-pointer flex flex-row gap-2">
                <p>Dont’ have an account?</p>
                <b className="text-[#554766]">
                  <Link href={"/register"}>Sign up</Link>
                </b>
              </p>
            </div>
          </form>
          <div className="flex flex-row w-full items-center gap-[23px]">
            <div className="h-[2px] w-full bg-[#CAC1D8]"></div>
            <p className="text-[#CAC1D8]">OR</p>
            <div className="h-[2px] w-full bg-[#CAC1D8]"></div>
          </div>
          <ButtonBase
            onClick={handleLoginGoogle}
            type={buttonType.noBackground}
            className="border-[#9387A8] w-full gap-2 flex flex-row items-center"
          >
            <Image src={LogoGoogle} alt="LogoGoogle" />
            <p className="font-bold text-base text-[#362355]">
              Continue with Google
            </p>
          </ButtonBase>
        </div>
      </div>
    </div>
  );
}

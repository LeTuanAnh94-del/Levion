import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  getAuth,
} from "firebase/auth";
import Image from "next/image";
import { useFormik } from "formik";
import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";

import { appFirebase } from "../../firebase/firebase";
import BaseInput from "@/components/baseInput/BaseInput";
import ButtonBase, { buttonType } from "@/components/button/ButtonBase";
import ValidationSchema from "@/utils/Validate";
import LogoLevion from "../../public/images/LogoLevion.png";
import { Loading } from "@/constant/Icon";
import { ShowToast } from "@/utils/ShowToast";
import { delay } from "@/utils/Delay";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth(appFirebase);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      try {
        await handleRegister(values.email, values.password);
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
  });

  const handleRegister = async (email, password) => {
    setIsLoading(true);

    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        const errorMessage = "Email is already use";
        formik.setFieldError("email", errorMessage);
        setIsLoading(false);
      }

      await createUserWithEmailAndPassword(auth, email, password);

      setIsLoading(false);
      ShowToast("Registration successful", "success");
      await delay(2000);
      router.push("/login");
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="bg-purple-200 w-full h-[100vh] flex justify-center items-center">
      <div className=" w3-animate-zoom bg-white gap-6 flex flex-col items-center w-full mx-4 my-[55px] px-6 py-4 rounded sm:mx-[10%] md:mx-[15%] md:px-16 md:py-10 lg:mx-[20%] xl:mx-[30%]">
        <div className="flex flex-col gap-6 items-center w-full md:gap-8">
          <Image src={LogoLevion} alt="LogoLevion" />
          <p className="font-bold text-2xl text-darker_grey text-center md:text-[32px] md:leading-10">
            Create an account
          </p>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col items-center w-full gap-2"
          >
            <div className="flex flex-col w-full ">
              <label className="text-sm pb-2 font-bold">
                Email <span className="text-warning">*</span>
              </label>
              <div className="pb-6">
                <BaseInput
                  id="email"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Your Email"
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="text-sm text-warning absolute w3-animate-opacity">
                    {formik.errors.email}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="text-sm flex flex-col w-full">
              <label className="pb-2 font-bold">
                Password <span className="text-warning">*</span>
              </label>
              <div className="pb-6">
                <BaseInput
                  id="password"
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Your password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-sm text-warning absolute w3-animate-opacity">
                    {formik.errors.password}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="text-sm flex flex-col w-full">
              <label className="pb-2 font-bold">
                Confirm Password <span className="text-warning">*</span>
              </label>
              <div className="pb-8">
                <BaseInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Your confirm password"
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <p className="text-sm text-warning absolute w3-animate-opacity">
                    {formik.errors.confirmPassword}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full items-center">
              <ButtonBase
                type={isLoading ? buttonType.disabled : buttonType.background}
                className="w-full text-white font-bold text-base flex items-center"
                disabled={isLoading ? true : ""}
              >
                {isLoading ? <Loading /> : ""}
                <p>{isLoading ? "...loading" : "Create Account"}</p>
              </ButtonBase>
              <p className="text-base text-grey_light text-center">
                Already have an account? <b>Sign in</b>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

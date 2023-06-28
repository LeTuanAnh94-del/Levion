import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Image from "next/image";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";

import BaseInput from "@/components/baseInput/BaseInput";
import { appFirebase, checkAdminRole } from "../../firebase/firebase";
import { ShowToast } from "@/utils/ShowToast";
import Logo from "../../public/images/LogoVietGang.png";

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

  const handleLogin = async (email, password) => {
    setIsLoading(true);

    const isAdmin = await checkAdminRole(email);

    if (isAdmin) {
      try {
        await signInWithEmailAndPassword(auth, email, password);

        ShowToast("Đăng nhập thành công", "success");

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
      }
    } else {
      ShowToast("Bạn không có quyền truy cập", "error");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-grey w-full h-[100vh] flex justify-center items-center">
      <div className="w3-animate-zoom bg-white gap-6 flex flex-col items-center w-full mx-4 my-[55px] px-6 py-4 rounded sm:mx-[10%] md:mx-[15%] md:px-16 md:py-10 lg:mx-[20%] xl:mx-[30%]">
        <div className="flex flex-col gap-6 items-center w-full md:gap-8">
          <Image src={Logo} alt="Logo" width={100} height={50} />
          <p className="font-bold text-2xl text-darker_grey xl:gap-8 xl:text-[32px] xl:leading-10 text-center">
            Đăng nhập
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
              <button
                disabled={isLoading ? true : ""}
                className="w-full justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-4 text-center mr-2 inline-flex items-center"
              >
                {isLoading && (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
                <b className="text-base">Đăng nhập</b>
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

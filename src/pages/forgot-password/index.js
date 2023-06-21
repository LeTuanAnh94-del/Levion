import Image from "next/image";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import LogoLevion from "../../public/images/LogoLevion.png";
import BaseInput from "@/components/baseInput/BaseInput";
import ButtonBase, { buttonType } from "@/components/button/ButtonBase";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string().required("Please enter your password"),
  confirm_password: Yup.string().required("Please enter your confirm password"),
});

export default function ForgotPassword() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleChangePassword(
        values.email,
        values.password,
        values.confirm_password
      );
    },
  });

  const handleChangePassword = async (email, password, confirm_password) => {
    if (password !== confirm_password) {
      return;
    }

    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent successfully");
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
  };

  return (
    <div className="bg-purple-200 w-full h-[100vh] flex justify-center items-center xl:h-[100vh]">
      <div className="w3-animate-zoom bg-white gap-6 flex flex-col items-center w-full mx-4 my-[55px] px-6 py-4 rounded sm:mx-[10%] md:mx-[15%] md:px-16 md:py-10 lg:mx-[20%] xl:mx-[30%]">
        <div className="flex flex-col gap-6 items-center w-full md:gap-8">
          <Image src={LogoLevion} alt="LogoLevion" />
          <p className="font-bold text-2xl text-[#281C42] xl:gap-8 xl:text-[32px] xl:leading-10 text-center">
            Create New Password
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
                  placeholder="Email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="text-sm text-warning absolute w3-animate-opacity">
                    {formik.errors.email}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col items-start justify-start w-full xl:pt-2">
              <div className="flex flex-row gap-1">
                <p className="font-bold text-sm">Password</p>
                <span className="text-warning">*</span>
              </div>
              <div className="pb-6 w-full">
                <BaseInput
                  id="password"
                  name="password"
                  type="password"
                  placeholder="New Password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-sm text-warning absolute w3-animate-opacity">
                    {formik.errors.password}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="w-full xl:pt-2">
              <div className="flex flex-row gap-1">
                <p className="font-bold text-sm ">Confirm Password</p>
                <span className="text-warning">*</span>
              </div>
              <div className="pb-6 w-full">
                <BaseInput
                  id="confirm-password"
                  name="confirm_password"
                  type="password"
                  placeholder="Confirm New Password"
                  value={formik.values.confirm_password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.confirm_password &&
                formik.errors.confirm_password ? (
                  <p className="text-sm text-warning absolute w3-animate-opacity">
                    {formik.errors.confirm_password}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-3 items-center w-full">
              <ButtonBase
                type={buttonType.background}
                className="w-full lg:px-6 lg:py-4"
              >
                <p className="font-bold text-white text-base lg:text-lg">
                  Create New Password
                </p>
              </ButtonBase>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

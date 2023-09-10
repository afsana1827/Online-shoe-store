"use client";
import postRegisterData from "@/action/user/PostRegisterData";
import { Input } from "@/components/ui/input";
import { SignupSchema, SignupType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FiLoader } from "react-icons/fi";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";

const Register = () => {
  const [show, setShow] = useState({ password: false, cpassword: false });
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting, errors },
  } = useForm<SignupType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
    resolver: zodResolver(SignupSchema),
  });
  const onSubmit = async (data: SignupType) => {
    try {
      const { cpassword, ...rest } = data;
      const newUser = await postRegisterData({ ...rest, role: "ADMIN" });
      if (newUser) {
        reset();
        toast.success("Admin Created");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-8 h-8 mr-2" src="/logo.svg" alt="logo" />
          <h3 className="">SneakerHive</h3>
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-blue-900 md:text-2xl dark:text-white">
              Create New Admin
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center gap-5"
            >
              <div>
                <div className="input-group">
                  <Input
                    type="text"
                    {...register("name")}
                    placeholder="Username"
                    className="input-text"
                  />
                  <span className="flex items-center px-4 icon">
                    <HiOutlineUser size={25} />
                  </span>
                </div>
                <p className="text-red-500 "> {errors.name?.message} </p>
              </div>
              <div>
                <div className="input-group">
                  <Input
                    type="email"
                    {...register("email")}
                    placeholder="Email"
                    className="input-text"
                  />
                  <span className="flex items-center px-4 icon">
                    <HiAtSymbol size={25} />
                  </span>
                </div>
                <p className="text-red-500 "> {errors.name?.message} </p>
              </div>

              <div>
                <div className="input-group">
                  <Input
                    type={`${show.password ? "text" : "password"}`}
                    {...register("password")}
                    placeholder="password"
                    className="input-text"
                  />
                  <span
                    className="flex items-center px-4 icon"
                    onClick={() =>
                      setShow({ ...show, password: !show.password })
                    }
                  >
                    <HiFingerPrint size={25} />
                  </span>
                </div>
                <p className="text-red-500 "> {errors.name?.message} </p>
              </div>

              <div>
                <div className="input-group">
                  <Input
                    type={`${show.cpassword ? "text" : "password"}`}
                    {...register("cpassword")}
                    placeholder="Confirm Password"
                    className="input-text"
                  />
                  <span
                    className="flex items-center px-4 icon"
                    onClick={() =>
                      setShow({ ...show, password: !show.cpassword })
                    }
                  >
                    <HiFingerPrint size={25} />
                  </span>
                </div>
                <p className="text-red-500 "> {errors.name?.message} </p>
              </div>

              {/* login */}
              <div className="input-button">
                <button
                  disabled={!isValid || isSubmitting}
                  type="submit"
                  className="button cursor-pointer max-w-[280px]"
                >
                  {!isSubmitting ? (
                    <span>Submit</span>
                  ) : (
                    <span className="flex items-center gap-1 ">
                      <span>Submitting...</span>
                      <FiLoader className=" animate-spin" />
                    </span>
                  )}
                </button>
              </div>
            </form>
            {/* for google */}
            {/* <div className="flex justify-center input-button">
              <button
                type="button"
                onClick={() => {
                  signIn("google", { callbackUrl: "/" });
                }}
                className="button-custom"
              >
                Sign in with Goggle
                <Image
                  src="/goggle.png"
                  width={20}
                  height={20}
                  alt="google icon"
                />
              </button>
            </div> */}
            {/* bottom */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

"use client";
import { useRef } from "react";
import { aboutAuthorTopData } from "@/components/shared/data/data";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wapper";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema, ContactType } from "@/types";
import emailjs from "emailjs-com";
import { toast } from "react-hot-toast";

function Contact() {
  const form = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ContactType>({
    resolver: zodResolver(ContactSchema),
  });
  const onSubmit = async (data: ContactType, e: any) => {
    console.log(data);
    e.preventDefault();
    await toast.promise(
      emailjs.sendForm(
        `${process.env.NEXT_PUBLIC_SERVICE_ID}`,
        `${process.env.NEXT_PUBLIC_TEMPLATE_ID}`,
        form.current,
        `${process.env.NEXT_PUBLIC_USER_ID}`
      ),
      {
        loading: "Sending...",
        success: () => {
          form.current.reset();
          return "Message sent successfully";
        },
        error: (error) => {
          console.log(error);
          return "Something went wrong";
        },
      }
    );
  };

  return (
    <Wrapper>
      <div className="my-10 lg:my-16 w-full">
        <div className="mb-10 lg:mb-14">
          <h1 className=" text-theme-primary text-center text-[19px] lg:text-[27px]">
            Contact with Us
          </h1>
        </div>
        <div className=" flex flex-col lg:flex-row items-start gap-12">
          <form
            ref={form}
            onSubmit={handleSubmit(onSubmit)}
            className="w-full lg:w-[50%] space-y-6"
          >
            <div className=" flex items-center gap-4">
              <input
                type="text"
                {...register("name")}
                className=" w-full border border-[#94D7D3] px-2 py-2 pb-4 rounded placeholder:text-[#999] p15"
                placeholder="Name"
              />
              <input
                type="text"
                {...register("email")}
                className=" w-full border border-[#94D7D3] px-2 py-2 pb-4 rounded placeholder:text-[#999] p15"
                placeholder="Email"
              />
            </div>
            <input
              type="text"
              {...register("subject")}
              className=" w-full border border-[#94D7D3] px-2 py-2 pb-4 rounded placeholder:text-[#999] p15"
              placeholder="Subject"
            />
            <textarea
              {...register("message")}
              placeholder=" Type Your Message"
              className=" w-full border border-[#94D7D3] px-2 py-2 pb-10 rounded text-[#999] p15"
            />

            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? "Sending..." : " Send Message"}
            </Button>
          </form>
          <div className="w-full lg:w-[30%] ">
            <p className=" p15 text-theme-gray ">
              Our friendly and knowledgeable customer support team is available
              to assist you with any inquiries you may have. Feel free to
              connect us by filling the form. We are here to answer your
              questions, help you find the perfect pair of shoes, or address any
              concerns.
            </p>

            <p className="mt-8 lg:mt-0 p15 text-theme-gray pt-2">
              afsanat547@gmail.com
            </p>
            <p className=" p15 text-theme-gray pt-2">+88-01753555745</p>
            <p className=" p15 text-theme-gray pt-2 pb-8">
              Uttara, Dhaka, Bangladesh
            </p>

            {/* for social button */}
            <h5 className=" text-theme-black capitalize">Follow on:</h5>
            <div className=" flex items-center gap-4 mt-4">
              {aboutAuthorTopData.map((item, index) => {
                return (
                  <Link
                    target=" _blank"
                    href={item.link}
                    key={index}
                    className="cursor-pointer"
                  >
                    <item.icon className="w-6 h-6 text-[#999] border border-theme-light-gray rounded hover:border-none hover:text-white p-1 hover:bg-orange-500" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Contact;

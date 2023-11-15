"use client";

// import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

// import { blogs } from "../page";

const Blog = () => {
  const params = useParams();
  // const [blogData, setBlogData] = useState<any>();

  useEffect(() => {
    // let data = blogs?.filter(
    //   item => item?.id === Number(params?.id),
    // )[0];
    // if (data) setBlogData(data);
  }, [params?.id]);

  return (
    <div className="mx-auto max-w-[800px] px-3 py-[30px] md:px-5 lg:my-[96px] lg:px-0">
      <h1 className="heading-gradient my-[30px] w-full text-start text-[26px] font-bold lg:text-[30px]">
        {/* {blogData?.title} */}
      </h1>
      {/* <Image
        className="h-auto w-full object-cover"
        src={blogData?.image}
        alt="blog"
      /> */}
      <p className="mt-10 font-mainText text-[14px] leading-8 md:text-[16px]">
        Future Surprises is an innovative gift-giving
        platform that simplifies the process for users. Our
        platform allows users to easily. Lorem ipsum is a
        placeholder text commonly used in the printing and
        typesetting industry. It is used to demonstrate the
        visual form of a document or a typeface without the
        distraction of meaningful content. The text is
        typically in Latin and is intentionally nonsensical,
        making it an ideal choice for placeholder text. Here
        is an example of the Lorem ipsum text: Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Sed do
        eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore
        eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum. Designers,
        developers, and content creators use Lorem ipsum to
        fill space where the final content will go so they
        can focus on the layout and design of a project.
      </p>
    </div>
  );
};

export default Blog;

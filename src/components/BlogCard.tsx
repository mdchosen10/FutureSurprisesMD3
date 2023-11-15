import React from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";

export type Blog = {
  image: StaticImport;
  title: string;
  content: string;
  date: string;
  id: number;
};

const BlogCard = ({ blog }: { blog: Blog }) => {
  const { image, content, date, title, id } = blog;
  return (
    <Link
      href={`/blogs/${id}`}
      className="flex w-full cursor-pointer flex-col p-2 text-left hover:shadow-md"
    >
      <Image
        className="h-[250px] w-full rounded-[5px] object-cover sm:h-[300px] md:h-[250px]"
        src={image}
        alt="blog"
      />
      <p className="mt-[20px] font-mainText text-[14px] font-[400] text-[#A93CC9]">
        {date}
      </p>
      <p className="mt-[15px] font-mainText text-[16px] font-[400] text-[#2C2434]">
        {title}
      </p>
      <p className="mt-[10px] font-mainText text-[15px] leading-6 text-[#6C6672]">
        {content}
      </p>
    </Link>
  );
};

export default BlogCard;

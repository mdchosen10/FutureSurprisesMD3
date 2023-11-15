import React from "react";

// import BlogOne from "../../../../public/images/blogs/blog-1.jpg";
// import BlogTwo from "../../../../public/images/blogs/blog-2.png";
// import BlogThree from "../../../../public/images/blogs/blog-3.png";
// import BlogFour from "../../../../public/images/blogs/blog-4.png";
// import BlogFive from "../../../../public/images/blogs/blog-5.png";
// import BlogSix from "../../../../public/images/blogs/blog-6.png";
// import BlogCard from "@/components/BlogCard";

// export const blogs = [
//   {
//     id: 0,
//     image: BlogOne,
//     title: "Lorem ipsum is a placeholder ",
//     date: "August 16, 2021",
//     content:
//       "Future Surprises is an innovative gift-giving platform that simplifies the process for users. Our platform allows users to easily ",
//   },
//   {
//     id: 1,
//     image: BlogTwo,
//     title: "Lorem ipsum is a placeholder ",
//     date: "August 16, 2021",
//     content:
//       "Future Surprises is an innovative gift-giving platform that simplifies the process for users. Our platform allows users to easily ",
//   },
//   {
//     id: 2,
//     image: BlogThree,
//     title: "Lorem ipsum is a placeholder ",
//     date: "August 16, 2021",
//     content:
//       "Future Surprises is an innovative gift-giving platform that simplifies the process for users. Our platform allows users to easily ",
//   },
//   {
//     id: 3,
//     image: BlogFour,
//     title: "Lorem ipsum is a placeholder ",
//     date: "August 16, 2021",
//     content:
//       "Future Surprises is an innovative gift-giving platform that simplifies the process for users. Our platform allows users to easily ",
//   },
//   {
//     id: 4,
//     image: BlogFive,
//     title: "Lorem ipsum is a placeholder ",
//     date: "August 16, 2021",
//     content:
//       "Future Surprises is an innovative gift-giving platform that simplifies the process for users. Our platform allows users to easily ",
//   },
//   {
//     id: 5,
//     image: BlogSix,
//     title: "Lorem ipsum is a placeholder ",
//     date: "August 16, 2021",
//     content:
//       "Future Surprises is an innovative gift-giving platform that simplifies the process for users. Our platform allows users to easily ",
//   },
// ];

export default function Blogs() {
  return (
    <div className="px-3 py-[30px] md:px-5 lg:my-[96px] lg:px-10 3xl:px-0">
      <h1 className="heading-gradient mx-auto mb-[30px] w-full text-center text-[30px] font-bold lg:text-[36px]">
        Blogs
      </h1>
      <div className="grid grid-cols-1 gap-x-[20px] gap-y-[25px] md:grid-cols-2 lg:grid-cols-3">
        {/* {blogs?.map(blog => (
          <BlogCard key={blog?.id} blog={blog} />
        ))} */}
      </div>
    </div>
  );
}

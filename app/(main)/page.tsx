"use client";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Post {
  id: string;
  title: string;
  blogContent: string;
  description: string;
}

const BlogPost = () => {
  const callGetPosts = async () => {
    const { data } = await axios.get("/api/post");
    return data;
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: callGetPosts,
  });

  if (error) {
    toast.error("Error in fetching posts");
  }

  return (
    <div>
      {isLoading && <p>Blogs is loading...</p>}
      <ul className="space-y-3">
        {data &&
          data.map((post: Post, i: number) => (
            <li
              key={post.id}
              className="border border-gray-400 rounded-md hover:shadow-md"
            >
              <Link href={`/post/${post.id}`}>
                <div className="text-lg  p-4">
                  <h1 className="text-lg text-blue-600">
                    {i + 1}. {post.title}
                  </h1>
                  <p className="text-base">{post.description}</p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

const MainPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold py-5">Our Blog posts: </h1>
      <BlogPost />
    </div>
  );
};

export default MainPage;

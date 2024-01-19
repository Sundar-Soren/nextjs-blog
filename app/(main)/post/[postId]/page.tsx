"use client";
import { useParams } from "next/navigation";
import React, { Suspense } from "react";
import PostContent from "@/app/(main)/_components/post-content";
import CommentSection from "@/app/(main)/_components/comment";

const PostPage = () => {
  const params = useParams<{ postId: string }>();

  return (
    <div className="max-w-screen-md mx-auto">
      <Suspense fallback={<p>Loading content...</p>}>
        <PostContent postId={params.postId} />
      </Suspense>
      <CommentSection blogId={params.postId} />
    </div>
  );
};

export default PostPage;

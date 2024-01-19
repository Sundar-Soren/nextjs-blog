import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import UserComment from "./user-comment";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { User } from "@prisma/client";

interface BlogCommentProps {
  blogId: string;
}

interface CommentWithUser {
  postId: string;
  content: string;
  createdAt: string;
  user: User;
}

const CommentSection: React.FC<BlogCommentProps> = ({ blogId }) => {
  const postComment = async () => {
    return await axios.post(`/api/post/${blogId}/comment`, { content });
  };
  const getComments = async () => {
    const { data } = await axios.get(`/api/post/${blogId}/comment`);
    return data;
  };
  const [content, setContent] = useState("");
  const [isDataPost, setIsDataPost] = useState(false);

  const { isPending, mutate } = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      refetch();
    },
  });

  const { data, refetch } = useQuery({
    queryFn: getComments,
    queryKey: ["CommentsOfPost"],
    enabled: !!blogId || isDataPost,
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsDataPost(true);
    mutate();
  };

  return (
    <div>
      <section className="bg-white dark:bg-gray-900 my-4 antialiased">
        <div className=" mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Discussion ( {data && data.length} )
            </h2>
          </div>
          <form className="mb-6 " onSubmit={onSubmit}>
            <div className="mb-6">
              <Label htmlFor="comment" className="sr-only">
                Your comment
              </Label>
              <Textarea
                id="comment"
                placeholder="Write a comment..."
                required
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={isPending}>
              Post comment
            </Button>
          </form>
          {data &&
            data.map((comment: CommentWithUser, i: number) => (
              <UserComment
                createdAt={comment.createdAt}
                postId={comment.postId}
                key={i}
                content={comment.content}
                user={comment.user}
              />
            ))}
        </div>
      </section>
    </div>
  );
};

export default CommentSection;

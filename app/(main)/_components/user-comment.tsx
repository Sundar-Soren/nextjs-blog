import React from "react";
import { format } from "date-fns";
import { User } from "@prisma/client";

interface CommentWithUser {
  postId: string;
  content: string;
  createdAt: string;
  user: User;
}

const UserComment: React.FC<CommentWithUser> = ({
  postId,
  content,
  user,
  createdAt,
}) => {
  return (
    <div>
      <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
              <img
                className="mr-2 w-6 h-6 rounded-full"
                src="https://fastly.picsum.photos/id/981/200/300.jpg?hmac=H3LDLzNJiLGQYdx_Q7g_Us-x8VxR-aK5TglLyGlQHDk"
                alt="John beter"
              />
              {user.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time title="February 8th, 2022">
                {format(createdAt, "MMM d, yyyy HH:mm:ss")}
              </time>
            </p>
          </div>
        </footer>
        <p className="text-gray-500 dark:text-gray-400">{content && content}</p>
      </article>
    </div>
  );
};

export default UserComment;

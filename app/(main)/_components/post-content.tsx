// components/PostContent.tsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles

interface PostContentProps {
  postId: string;
}

const PostContent: React.FC<PostContentProps> = ({ postId }) => {
  const fetchPost = async (postId: string) => {
    const { data } = await axios.get(`/api/post/${postId}`);
    return data;
  };

  const {
    data: post,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetchPost(postId),
    enabled: !!postId,
  });

  if (error) {
    toast.error("Error while fetching the post");
  }

  return (
    <div>
      {isLoading && <p>Loading blog....</p>}
      {post && (
        <>
          <h1 className="text-4xl py-5 pl-4 font-bold">{post.title}</h1>

          <ReactQuill
            theme="snow"
            value={post.blogContent}
            readOnly={true}
            modules={{
              toolbar: false,
            }}
            className="ReadOnlyEditor"
          />
        </>
      )}
    </div>
  );
};

export default PostContent;

"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import RichTextEditor from "./_components/rich-texteditor";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";

const AdminDashboard = () => {
  const [editorContent, setEditorContent] = useState<string>("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const submitPost = async () => {
    try {
      setLoading(true);
      await axios.post("/api/post", { title, description, editorContent });
      toast.success("post created");
    } catch (error) {
      toast.error("Error while create post");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex  border-b border-gray-300 pb-2 mb-4 justify-between">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="mr-28">
          <Button onClick={submitPost} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Publish
          </Button>
        </div>
      </div>
      <div>
        <div className="mb-4">
          <label htmlFor="title" className="text-sm">
            Add Title
          </label>
          <Input
            id="title"
            placeholder="Add your title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="text-sm">
            Add Description
          </label>
          <Textarea
            id="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <RichTextEditor setEditorContent={setEditorContent} />
      </div>
    </div>
  );
};

export default AdminDashboard;

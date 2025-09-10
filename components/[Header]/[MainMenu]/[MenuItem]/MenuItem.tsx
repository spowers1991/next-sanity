"use client";

import React from "react";
import Link from "next/link";
import { Post } from "@/lib/sanity/types/Post";
import { useFilters } from "@/components/[Filters]/state/FiltersContext";

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const { STATE_setShowAnimation } = useFilters();

  const handleClick = () => {
    STATE_setShowAnimation(false);
  };

  return (
    post._type === "post" ?
        <li key={post._id} className="hover:underline">
            <Link href={`/${post?.slug?.current}`}>
                <div onClick={handleClick}>
                    {
                        post.title ? post.title : post.name
                    }
                </div>
            </Link>
        </li>
    :
        <li key={post._id} className="hover:underline">
            <Link href={`/${post._type}s/${post?.slug?.current}`}>
                <div onClick={handleClick}>
                    {
                        post.title ? post.title : post.name
                    }
                </div>
            </Link>
        </li>
  );
};

export default PostItem;

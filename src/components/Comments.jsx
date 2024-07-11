// components/Comments.js
import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getCommentsByRecipeId,
  createComment,
  likeComment,
  reactToComment,
} from "../utils/fetchComments";
import { useSocket } from "../context/SocketContext";

const Comments = ({ recipeId, userId, isLogged }) => {
  const [newComment, setNewComment] = useState("");
  const [parentId, setParentId] = useState(null); // For nested replies
  const socket = useSocket();
  const queryClient = useQueryClient();

  const {
    data: comments = [],
    isLoading,
    error,
  } = useQuery(
    ["comments", recipeId],
    () => getCommentsByRecipeId(recipeId, "en", userId, isLogged),
    {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5000,
      cacheTime: 10000,
    }
  );

  const createCommentMutation = useMutation(
    (newComment) => createComment(recipeId, newComment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", recipeId]);
      },
    }
  );

  const likeCommentMutation = useMutation(likeComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", recipeId]);
    },
  });

  const reactToCommentMutation = useMutation(reactToComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", recipeId]);
    },
  });

  useEffect(() => {
    if (socket) {
      socket.on("newComment", (comment) => {
        queryClient.invalidateQueries(["comments", recipeId]);
      });

      socket.on("likeComment", ({ commentId, likes }) => {
        queryClient.invalidateQueries(["comments", recipeId]);
      });

      socket.on("reactComment", ({ commentId, reaction }) => {
        queryClient.invalidateQueries(["comments", recipeId]);
      });
    }
  }, [socket, queryClient, recipeId]);

  const handleCreateComment = () => {
    createCommentMutation.mutate({
      comment: newComment,
      parentCommentId: parentId,
    });
    setNewComment("");
    setParentId(null);
  };

  const handleLikeComment = (commentId) => {
    likeCommentMutation.mutate(commentId);
  };

  const handleReactToComment = (commentId, reaction) => {
    reactToCommentMutation.mutate({ commentId, reaction });
  };

  const renderComments = (comments, parentId = null) => {
    return comments
      ?.filter((comment) => comment.parentCommentId === parentId)
      .map((comment) => (
        <div key={comment._id} style={{ marginLeft: parentId ? 20 : 0 }}>
          <p>{comment.comment}</p>
          <button onClick={() => handleLikeComment(comment._id)}>
            Like ({comment.likes})
          </button>
          <button onClick={() => handleReactToComment(comment._id, "😀")}>
            React 😀
          </button>
          <button onClick={() => setParentId(comment._id)}>Reply</button>
          {renderComments(comments, comment._id)}
        </div>
      ));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h2>Comments</h2>
      {renderComments(comments)}
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleCreateComment}>Add Comment</button>

      <div>
        <h2>Create new comments</h2>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button onClick={handleCreateComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default Comments;

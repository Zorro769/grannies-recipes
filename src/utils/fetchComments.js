import { axiosPrivate } from "../api/axios";

export const getCommentsByRecipeId = async (recipeId) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/recipes/comments/${recipeId}`;

  const response = await axiosPrivate.get(url);

  return response?.data;
};
export const createComment = async (recipeId, comment) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/recipes/comments/${recipeId}`;

  const response = await axiosPrivate.post(url, comment);

  return response;
};

export const likeComment = async (commentId) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/recipes/comments/${commentId}/like`;

  const response = await axiosPrivate.put(url);

  return response;
};

export const reactToComment = async (commentId, reaction) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/recipes/comments/${commentId}/react`;

  const response = await axiosPrivate.put(url, { reaction });

  return response;
};

export const updateComment = async (commentId, comment) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/recipes/comments/${commentId}`;

  const response = await axiosPrivate.put(url, comment);

  return response;
};

export const deleteComment = async (commentId) => {
  const url = `${process.env.REACT_APP_SERVER_URL}/comments/${commentId}`;

  const response = await axiosPrivate.delete(url);

  return response;
};

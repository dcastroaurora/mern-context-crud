import { useState, createContext, useContext, useEffect } from "react";
import { createPostsRequest, deletePostsRequest, getPostRequest, getPostsRequest, updatePostRequest } from "../api/posts";

const context = createContext();

export const usePosts = () => useContext(context);

export const PostProvider = ({children}) => {    
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        const response = await getPostsRequest();
        setPosts(response.data);
    }

    const createPost = async (post) => {
        try {
            const response = await createPostsRequest(post);
            setPosts([...posts, response.data]);
        } catch (error) {
            console.error(error);
        }
    }

    const deletePost = async (id) => {
        await deletePostsRequest(id);
        setPosts(posts.filter(post => post._id !== id));
    }

    const getPost = async (id) => {
        return await getPostRequest(id);
    }

    const updatePost = async (id, post) => {
        const response = await updatePostRequest(id, post);
        console.log('sdsdsdsd', response);
        setPosts(posts.map((post) => post._id === id ? response.data : post));
    }

    useEffect(() => {
        getPosts();
    }, [])
    

    return (
        <context.Provider value={{posts, createPost, deletePost, getPost, updatePost}}>
            {children}
        </context.Provider>
    )
}
import Post from '../models/Post.js';
import { uploadImage, deleteImage } from '../libs/cloudinary.js';
import fs from 'fs-extra';

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};
export const createPosts = async (req, res) => {
    try {
        let image;

        if(req.files?.image){  
            const result = await uploadImage(req.files.image.tempFilePath);
            image = {
                url: result.secure_url,
                public_id: result.public_id,
            };
            await fs.remove(req.files.image.tempFilePath)
        }

        const post = new Post({ ...req.body, image });

        await post.save();
        res.json(post);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}
export const updatePosts = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(post);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}
export const deletePosts = async (req, res) => {
    try {
        const postRemoved = await Post.findByIdAndDelete(req.params.id);
        if(!postRemoved) return res.sendStatus(404);
        if(postRemoved.image.public_id) await deleteImage(postRemoved.image.public_id);
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}
export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) return res.sendStatus(404);
        return res.json(post);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}
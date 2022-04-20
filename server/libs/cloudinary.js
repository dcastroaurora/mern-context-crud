import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name: 'dl6wckgra',
    api_key: '772744628541397',
    api_secret: 'k4FLeRHmsHZWUqbF_8J3Pi65W3Q',
})

export const uploadImage = async filePath => {
    return await cloudinary.uploader.upload(filePath,{
        folder: 'posts'
    });
}

export const deleteImage = async id => {
    return await cloudinary.uploader.destroy(id);
}
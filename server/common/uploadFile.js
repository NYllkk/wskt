const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: "do7fwlqpn",
    api_key: "184276342363441",
    api_secret: "djMIkbWThwKF2A7mu3CO52c69FA",
    secure: true
});
console.log(cloudinary.config, "in cloudinary ")

const uploadImage = async (imagePath) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: "images"
        });
        console.log("in here in upoad images ")
        console.log(result, "here in result ");
        return info = result.public_id
    } catch (error) {
        console.error(error);
        return error
    }
};
const deleteImage = async (res, imagekey) => {
    try {
        let image = await cloudinary.uploader.destroy(imagekey);
        return
        // return RES(res, STATUS.OK, "Successfully deleted", image);
    } catch (error) {
        console.log(error);
        return
    }
};
const upadteimage = async (res, imagekey, imagePath) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            public_id: imagekey
        });
        return
        // return RES(res, STATUS.OK, "IMAGE updated ", result);
    } catch (error) {
        console.error(error);
        return
        // return RES(res, STATUS.INTERNAL_SERVER_ERROR, "no image UPloaded ");
    }
};
const testUserUpload = async (imagePath) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: "videos"
        });
        console.log("In uploadVideo function");
        console.log(result, "Result for video upload");
        return result.public_id;
    } catch (error) {
        console.error("Error uploading video:", error);
        throw error;
    }
};

module.exports = { uploadImage, deleteImage, upadteimage, testUserUpload }

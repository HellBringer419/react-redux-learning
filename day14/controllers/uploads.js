exports.postImage = (req, res, next) => {
    if (!req.file) {
        const error = new Error("No image provided");
        error.statusCode = 422;
        throw error;
    }
    res.status(200).json({
        message: "File Uploaded",
        path: req.file.path.replace("\\", "/"),
    });
};

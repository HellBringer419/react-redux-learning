exports.notFound = (req, res, next) => {
    const currentTimeStamp = Date.now();
    res.status(404).send({Error: 'Not Found', status: '404', timestamp:  (new Date()).toJSON()});
}
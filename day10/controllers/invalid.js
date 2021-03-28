exports.notFound = (req, res, next) => {
    res.status(404).send({Error: 'Not Found', status: '404', timestamp:  (new Date()).toJSON()});
}

exports.noSuchProduct = (req, res, next) => {
    res.status(404).send({Error: 'No Such Product Found', status: '404', timestamp:  (new Date()).toJSON()});
}
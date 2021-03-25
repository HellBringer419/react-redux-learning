const products = [];

exports.getAddProduct = (req, res, next) => {
    res.send({ pageTitle: 'Add Product', path: '/admin/product', activateAddProduct: true});
}

exports.postAddProduct = (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    res.send({products: products, pageTitle: 'shop', path: '/', hasProducts: products.length > 0, activeShops: true});
}
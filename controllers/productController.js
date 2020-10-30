const Product = require('../models/productModel')
const { getPostData } = require('../utils')

//@desc gets all products
//@route GET /api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll()

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(products));
    } catch(error) {
        console.log(error);        
    }
}

//@desc gets single product
//@route GET /api/products/:id
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id)
        
        if (!product) {
            
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({message: 'xter Not Found'}));
        } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(product));
        }
        
    } catch(error) {
        console.log(error);        
    }
}

//@desc create single product
//@route POST /api/products
async function createProduct(req, res) {
    try {
        const body = await getPostData(req)
        
        const { name, email} = JSON.parse(body)

        const product = {
          name,
          email
        };

        const newProduct = await Product.create(product);

        res.writeHead(201, { "Content-Type": "application.json" });
        res.end(JSON.stringify(newProduct));
    } catch(error) {
        console.log(error);        
    }
}

//@desc update single product
//@route PUT /api/products/:id
async function updateProduct(req, res, id) {
    try {
        const product = await Product.findById(id)

         if (!product) {
           res.writeHead(404, { "Content-Type": "application/json" });
           res.end(JSON.stringify({ message: "xter Not Found" }));
         } else {
            const body = await getPostData(req);

            const { name, email } = JSON.parse(body);

            const productData = {
                name: name || product.name,
                email: email || product.email
            };

            const updProduct = await Product.update(id, productData);

            res.writeHead(200, { "Content-Type": "application.json" });
            res.end(JSON.stringify(updProduct));
         }

        
    } catch(error) {
        console.log(error);        
    }
}

//@desc delete a product
//@route DELETE /api/products/:id
async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "xter Not Found" }));
    } else {
        await Product.remove(id)
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({message: `Product ${id} removed`}));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
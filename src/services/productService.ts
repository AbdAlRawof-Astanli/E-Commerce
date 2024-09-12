import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  //   const products = [
  //     { title: "Product 1", image: "image1.jpg", price: 100, stock: 100 },
  //     { title: "Product 2", image: "image2.jpg", price: 50, stock: 50 },
  //     { title: "Product 3", image: "image3.jpg", price: 1, stock: 10 },
  //     { title: "Product 4", image: "image4.jpg", price: 10, stock: 30 },
  //     { title: "Product 5", image: "image5.jpg", price: 5, stock: 15 },
  //     { title: "Product 6", image: "image6.jpg", price: 5, stock: 20 },
  //     { title: "Product 7", image: "image7.jpg", price: 7, stock: 40 },
  //     { title: "Product 8", image: "image8.jpg", price: 9.99, stock: 50 },
  //     { title: "Product 9", image: "image9.jpg", price: 10, stock: 76 },
  //     { title: "Product 10", image: "image10.jpg", price: 10, stock: 44 },
  //   ];

  const products = [
    {
      title: "Dell laptop",
      image:
        "data:image/jpeg;base64,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",
      price: 100,
      stock: 100,
    },
  ];
  const existingProducts = await getAllProducts();
  if (existingProducts.length === 0) {
    await productModel.insertMany(products);
  }
};

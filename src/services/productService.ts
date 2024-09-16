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
  try {
    const products = [
      {
        title: "Dell laptop",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNhP85PVVXLf4_Er4SlveOnMZf0T5k8fjGzw&s",
        price: 100,
        stock: 100,
      },
    ];
    const existingProducts = await getAllProducts();
    if (existingProducts.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (error) {
    console.error("Cannot see database", error);
  }
};

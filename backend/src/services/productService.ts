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
        price: 1000,
        stock: 100,
      },
      {
        title: "asus laptop",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLAXwRCP5SDxhpKFBMxeJps4hR0Ofh1c_PsQ&s",
        price: 2500,
        stock: 100,
      },
      {
        title: "Hp laptop",
        image:"data:image/jpeg;base64,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",
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

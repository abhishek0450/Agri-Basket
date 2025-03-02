import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Products = () => {
  const [vegetables, setVegetables] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVegetables(productList);
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-green-50 p-8 h-full">
      <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>
      <div className="flex flex-wrap justify-center">
        {vegetables.map((vegetable) => (
          <div
            key={vegetable.id}
            className="bg-white rounded-lg shadow-lg m-4 p-4 w-48 text-center"
          >
            <img
              src={vegetable.image || "https://via.placeholder.com/150"}
              alt={vegetable.name}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold">{vegetable.name}</h3>
            <p className="text-gray-700">₹{vegetable.price}</p>
            <p className="text-gray-700">Min Order: {vegetable.minOrder}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Filter products based on category
  const filteredProducts = products.filter((product) => {
    if (filter === "All") return true;
    return product.type === filter;
  });

  return (
    <div className="bg-green-50 p-8">
      
      <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>
      
      {/* Filter Options */}
      <div className="mb-4 text-center">
        <select 
          value={filter} 
          onChange={handleFilterChange} 
          className="border rounded-md p-2"
        >
          <option value="All">All</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Dairy">Dairy</option>
          <option value="Pulses">Pulses</option>
          <option value="Seeds">Seeds</option>
        </select>
      </div>

      <div className="flex flex-wrap justify-center">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg m-4 p-4 w-48 text-center"
          >
            <img
              src={product.image || "https://placehold.co/150"}
              alt={product.name}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-700">Price: ₹{product.price}</p>
            <p className="text-gray-700">Min Order: {product.minOrder}</p>
            <button className="mt-6 block text-center w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition">
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

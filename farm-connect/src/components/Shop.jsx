import React, { useState } from 'react';

const Shop = () => {
  // Sample data for the shop items
  const items = [
    {
      id: 1,
      category: 'Dairy',
      name: 'Milk',
      price: '₹40/litre',
      freshness: 7,
      image: 'https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2024/11/AdobeStock_354060824-768x512.jpeg',
    },
    {
      id: 2,
      category: 'Dairy',
      name: 'Cheese',
      price: '₹30/packet',
      freshness: 14,
      image: 'https://parade.com/.image/t_share/MjAxNTY2MDE5MjQ2ODkyNDE3/what-happens-to-your-body-if-you-eat-cheese-every-day.jpg',
    },
    {
      id: 3,
      category: 'Fruits',
      name: 'Apple',
      price: '₹120/kg',
      freshness: 10,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/800px-Red_Apple.jpg',
    },
    {
      id: 4,
      category: 'Fruits',
      name: 'Banana',
      price: '₹60/kg',
      freshness: 7,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/800px-Banana-Single.jpg',
    },
    {
      id: 5,
      category: 'Vegetables',
      name: 'Carrot',
      price: '₹40/kg',
      freshness: 5,
      image: 'https://5.imimg.com/data5/TT/UH/MY-18041834/fresh-carrot-1000x1000.png',
    },
    {
      id: 6,
      category: 'Vegetables',
      name: 'Broccoli',
      price: '₹40',
      freshness: 4,
      image: 'https://static.toiimg.com/thumb/msid-114193352,imgsize-117908,width-400,resizemode-4/114193352.jpg',
    },
    {
      id: 7,
      category: 'Fruits',
      name: 'Orange',
      price: '₹100/kg',
      freshness: 5,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJttvKpQEYllL8hilL_PdxM4v8Glnst6iDFg&s',
    },
    {
      id: 8,
      category: 'Dairy',
      name: 'Yogurt',
      price: '₹35/litre',
      freshness: 10,
      image: 'https://www.daringgourmet.com/wp-content/uploads/2021/01/How-to-Make-Yogurt-7.jpg',
    },
    {
      id: 9,
      category: 'Vegetables',
      name: 'Spinach',
      price: '₹40',
      freshness: 3,
      image: 'https://www.trustbasket.com/cdn/shop/articles/Spinach.webp?v=1686909241',
    },
  ];

  const [filter, setFilter] = useState('All');

  // Function to handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Filter items based on the selected category
  const filteredItems = items.filter((item) => {
    if (filter === 'All') return true;
    return item.category === filter;
  });

  return (
    <div className="bg-green-50 p-8">
      
      <h1 className="text-3xl font-bold mb-6 text-center">Shop</h1>
      
      {/* Filter Options */}
      <div className="mb-4 text-center">
        <select 
          value={filter} 
          onChange={handleFilterChange} 
          className="border rounded-md p-2"
        >
          <option value="All">All</option>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Dairy">Dairy</option>
        </select>
      </div>

      <div className="flex flex-wrap justify-center">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-lg m-4 p-4 w-48 text-center"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-700">Price: {item.price}</p>
            <p className="text-gray-700">Freshness: {item.freshness} days</p>
            <button  className="mt-6 block text-center  w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition" data-translate="View Fruits">
                  Buy
                </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
import React from 'react';

// Sample data for dairy items
const dairyItems = [
  {
    id: 1,
    name: 'Milk',
    price: '₹40/litre',
    freshness: 7,
    image: 'https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2024/11/AdobeStock_354060824-768x512.jpeg',
  },
  {
    id: 2,
    name: 'Cheese',
    price: '₹30/packet',
    freshness: 14,
    image: 'https://parade.com/.image/t_share/MjAxNTY2MDE5MjQ2ODkyNDE3/what-happens-to-your-body-if-you-eat-cheese-every-day.jpg',
  },
  {
    id: 3,
    name: 'Yogurt',
    price: '₹35/packet',
    freshness: 10,
    image: 'https://www.daringgourmet.com/wp-content/uploads/2021/01/How-to-Make-Yogurt-7.jpg',
  },
  
];

const Diary = () => {
  return (
    <div className="bg-green-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Dairy Products List</h1>
      <div className="flex flex-wrap justify-center">
        {dairyItems.map((item) => (
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Diary;
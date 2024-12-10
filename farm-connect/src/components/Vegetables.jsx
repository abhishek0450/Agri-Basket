import React from 'react';

// Sample data for vegetables
const vegetables = [
  {
    id: 1,
    name: 'Carrot',
    price: '$1.50',
    freshness: 7,
    image: 'https://5.imimg.com/data5/TT/UH/MY-18041834/fresh-carrot-1000x1000.png',
  },
  {
    id: 2,
    name: 'Broccoli',
    price: '$2.00',
    freshness: 5,
    image: 'https://static.toiimg.com/thumb/msid-114193352,imgsize-117908,width-400,resizemode-4/114193352.jpg',
  },
  {
    id: 3,
    name: 'Spinach',
    price: '$1.20',
    freshness: 3,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Spinach_Leaves.jpg/800px-Spinach_Leaves.jpg',
  },
  {
    id: 4,
    name: 'Tomato',
    price: '$0.80',
    freshness: 4,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Tomato_2010.jpg/800px-Tomato_2010.jpg',
  },
  {
    id: 5,
    name: 'Cucumber',
    price: '$1.00',
    freshness: 6,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Cucumis_sativus_01.jpg/800px-Cucumis_sativus_01.jpg',
  },
  {
    id: 6,
    name: 'Bell Pepper',
    price: '$1.75',
    freshness: 2,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Bell_pepper.jpg/800px-Bell_pepper.jpg',
  },
];

const Vegetables = () => {
  return (
    <div className="bg-green-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Vegetable List</h1>
      <div className="flex flex-wrap justify-center">
        {vegetables.map((vegetable) => (
          <div
            key={vegetable.id}
            className="bg-white rounded-lg shadow-lg m-4 p-4 w-48 text-center"
          >
            <img
              src={vegetable.image}
              alt={vegetable.name}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold">{vegetable.name}</h3>
            <p className="text-gray-700">Price: {vegetable.price}</p>
            <p className="text-gray-700">Freshness: {vegetable.freshness} days</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vegetables;
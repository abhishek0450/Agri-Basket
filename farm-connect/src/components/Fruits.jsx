import React from 'react';

// Sample data for fruits
const fruits = [
  {
    id: 1,
    name: 'Apple',
    price: '$1.00',
    freshness: 10,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/800px-Red_Apple.jpg',
  },
  {
    id: 2,
    name: 'Banana',
    price: '$0.50',
    freshness: 7,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/800px-Banana-Single.jpg',
  },
  {
    id: 3,
    name: 'Orange',
    price: '$0.80',
    freshness: 5,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Orange-Orange.jpg/800px-Orange-Orange.jpg',
  },
  {
    id: 4,
    name: 'Grapes',
    price: '$2.50',
    freshness: 4,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grapes.jpg/800px-Grapes.jpg',
  },
  {
    id: 5,
    name: 'Strawberry',
    price: '$3.00',
    freshness: 3,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Strawberry.jpg/800px-Strawberry.jpg',
  },
  {
    id: 6,
    name: 'Pineapple',
    price: '$2.00',
    freshness: 6,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Pineapple.jpg/800px-Pineapple.jpg',
  },
  {
    id: 7,
    name: 'Mango',
    price: '$1.50',
    freshness: 5,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Mango.jpg/800px-Mango.jpg',
  },
  {
    id: 8,
    name: 'Watermelon',
    price: '$0.90',
    freshness: 8,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Watermelon.jpg/800px-Watermelon.jpg',
  },
];

const Fruits = () => {
  return (
    <div className="bg-green-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Fruits List</h1>
      <div className="flex flex-wrap justify-center">
        {fruits.map((fruit) => (
          <div
            key={fruit.id}
            className="bg-white rounded-lg shadow-lg m-4 p-4 w-48 text-center"
          >
            <img
              src={fruit.image}
              alt={fruit.name}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold">{fruit.name}</h3>
            <p className="text-gray-700">Price: {fruit.price}</p>
            <p className="text-gray-700">Freshness: {fruit.freshness} days</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fruits;
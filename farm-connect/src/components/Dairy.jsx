import React from 'react';

// Sample data for dairy items
const dairyItems = [
  {
    id: 1,
    name: 'Milk',
    price: '$1.20',
    freshness: 7,
    image: 'https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2024/11/AdobeStock_354060824-768x512.jpeg',
  },
  {
    id: 2,
    name: 'Cheese',
    price: '$2.50',
    freshness: 14,
    image: 'https://parade.com/.image/t_share/MjAxNTY2MDE5MjQ2ODkyNDE3/what-happens-to-your-body-if-you-eat-cheese-every-day.jpg',
  },
  {
    id: 3,
    name: 'Yogurt',
    price: '$1.50',
    freshness: 10,
    image: 'https://www.daringgourmet.com/wp-content/uploads/2021/01/How-to-Make-Yogurt-7.jpg',
  },
  {
    id: 4,
    name: 'Butter',
    price: '$2.00',
    freshness: 30,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Butter_on_bread.jpg/800px-Butter_on_bread.jpg',
  },
  {
    id: 5,
    name: 'Cream',
    price: '$1.80',
    freshness: 5,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Cream_in_bowl.jpg/800px-Cream_in_bowl.jpg',
  },
  {
    id: 6,
    name: 'Sour Cream',
    price: '$1.70',
    freshness: 7,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Sour_cream.jpg/800px-Sour_cream.jpg',
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
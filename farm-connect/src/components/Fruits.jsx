// Sample data for fruits
const fruits = [
  {
    id: 1,
    name: 'Apple',
    price: '₹120/kg',
    freshness: 10,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/800px-Red_Apple.jpg',
  },
  {
    id: 2,
    name: 'Banana',
    price: '₹60/kg',
    freshness: 7,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/800px-Banana-Single.jpg',
  },
  {
    id: 3,
    name: 'Orange',
    price: '₹100/kg',
    freshness: 5,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJttvKpQEYllL8hilL_PdxM4v8Glnst6iDFg&s',
  },
 
];

const Fruits = () => {
  return (
    <div className="bg-green-50 min-h-screen">
      <div className="p-8">
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
    </div>
  );
};

export default Fruits;

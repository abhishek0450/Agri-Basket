const services = [
  {
    name: "Loan Services",
    description: "Get easy and quick loans with low interest rates to support your farming needs.",
    image: "https://www.tatacapital.com/blog/wp-content/uploads/2023/09/the-pros-and-cons-of-taking-a-loan-against-agricultural-land-in-india.jpg",
  },
  {
    name: "Insurance Services",
    description: "Protect your crops and livestock with our comprehensive insurance plans.",
    image: "https://english.mathrubhumi.com/image/contentid/policy:1.7378113:1648261020/manuring%20farming%20worker%20(2).jpg?$p=725e92e&f=16x10&w=852&q=0.8",
  },
  {
    name: "Transport Services",
    description: "Efficient and reliable transport services to deliver your produce to the market.",
    image: "https://images.hive.blog/p/qjrE4yyfw5pEPvDbJDzhdNXM7mjt1tbr2kM3X28F6SraZjRCEPBgzBEoYeV6NLotPGn1UvMqng9ochAdUjTgWmituVdDbYZLhQcNKFvjKZaUDhcDm8i4zanS?format=match&mode=fit",
  },
  {
    name: "Asset Leasing",
    description: "Lease farming equipment and machinery at affordable rates.",
    image: "https://www.elease.com/wp-content/uploads/2020/05/agricultural-equipment-financing.jpg.webp",
  },
];

const Services = () => {
  return (
    <div className="bg-green-50 min-h-screen">

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-900">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src={service.image} 
                alt={service.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-green-800 mb-4">{service.name}</h3>
                <p className="text-green-700">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-green-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="hover:text-green-300">Home</a>
            <a href="#" className="hover:text-green-300">About</a>
            <a href="#" className="hover:text-green-300">Services</a>
            <a href="#" className="hover:text-green-300">Contact</a>
          </div>
          <p className="mb-4">© 2024 Agri Basket. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Services;

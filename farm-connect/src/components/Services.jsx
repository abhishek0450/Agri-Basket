

const services = [
  {
    name: "Loan Services",
    description: "Get easy and quick loans with low interest rates to support your farming needs.",
    image: "https://www.tatacapital.com/blog/wp-content/uploads/2023/09/the-pros-and-cons-of-taking-a-loan-against-agricultural-land-in-india.jpg",
  },
  {
    name: "Insurance Services",
    description: "Protect your crops and livestock with our comprehensive insurance plans.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScsxpkkfZjb7DJ3ZMHpZ5Kx4anVgFx-yEjvw&s",
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
  );
};

export default Services;
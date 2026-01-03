const LearnMore = () => {
  return (
    <div className="bg-green-50 min-h-screen flex flex-col">

      {/* Main Content */}
      <div className="flex-grow">
        <header className="flex flex-col items-center justify-center text-center py-16 px-8">
          <h1 className="text-4xl md:text-6xl font-extrabold text-green-800 mb-4">
            Welcome to Agri-Basket
          </h1>
          <p className="text-lg md:text-xl text-green-700 font-medium mb-6 max-w-3xl">
            Buy and sell your Agri produce online (Buyers meet Farmers) – Sell your produce directly to buyers without middlemen and make more money from your farm produce.
          </p>
          <p className="text-base md:text-lg text-green-600 max-w-3xl leading-relaxed">
            It’s evident that India has one of the largest agricultural markets around the world, which is why it becomes important to have a service, which can connect the farmers all over the country and provide them with a platform to sell their produce directly to the buyers.
          </p>
        </header>
      </div>

      {/* Footer */}
      <footer className="bg-green-600 text-white p-8 ">
        <div className="container mx-auto text-center">
          <p className="text-sm">© 2024 Agri-Basket. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LearnMore;

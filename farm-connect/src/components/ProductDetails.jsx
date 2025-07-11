import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { ArrowLeft, ShoppingCart, Star, Truck, Shield, Clock, Award, Phone, Check } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  // Cart state - synchronized with localStorage like in Products component
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Add to cart function - matches the one in Products component
  const addToCart = (product, selectedQuantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + selectedQuantity }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: selectedQuantity }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });

    // Show success feedback
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Handle add to cart button click
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  // Dummy data for enhanced features
  const dummyProductData = {
    dummyImages: [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=400&fit=crop"
    ],
    rating: 4.8,
    reviews: 124,
    supplier: {
      name: "Green Valley Farms",
      location: "Punjab, India",
      rating: 4.9,
      yearsExperience: 15,
      certifications: ["Organic", "ISO 9001", "HACCP"]
    },
    specifications: {
      origin: "Punjab, India",
      harvestDate: "2024-07-10",
      packagingType: "Eco-friendly bags",
      storageTemp: "2-8°C",
      shelfLife: "7-10 days",
      nutritionalInfo: {
        calories: "25 per 100g",
        protein: "2.9g",
        carbs: "4.6g",
        fiber: "2.6g",
        vitaminC: "89mg"
      }
    },
    deliveryInfo: {
      freeDelivery: true,
      minOrderForFreeDelivery: 500,
      deliveryTime: "24-48 hours",
      availableAreas: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"]
    },
    relatedProducts: [
      { id: "1", name: "Organic Potatoes", price: 45, image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&h=150&fit=crop" },
      { id: "2", name: "Fresh Carrots", price: 38, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200&h=150&fit=crop" },
      { id: "3", name: "Green Beans", price: 55, image: "https://images.unsplash.com/photo-1584543643164-3b9c2d5215f1?w=200&h=150&fit=crop" }
    ]
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const productData = { id: docSnap.id, ...docSnap.data() };
          
          // Create image gallery with Firestore image first, then dummy images
          const firestoreImage = productData.image;
          const combinedImages = firestoreImage 
            ? [firestoreImage, ...dummyProductData.dummyImages]
            : dummyProductData.dummyImages;
          
          // Merge with dummy data for enhanced features
          setProduct({ 
            ...productData, 
            ...dummyProductData, 
            images: combinedImages 
          });
          
          // Set initial quantity to minimum order
          setQuantity(productData.minOrder || 1);
        } else {
          console.error("❌ No such product!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (change) => {
    const minOrder = product?.minOrder || 1;
    const newQuantity = Math.max(minOrder, quantity + change);
    setQuantity(newQuantity);
  };

  // Get current cart item count for this product
  const getCartItemCount = () => {
    const existingItem = cart.find((item) => item.id === id);
    return existingItem ? existingItem.quantity : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-2xl font-semibold text-gray-700">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </Link>
          
          {/* Cart indicator */}
          {cart.length > 0 && (
            <div className="flex items-center gap-2 text-green-700">
              <ShoppingCart className="w-5 h-5" />
              <span className="font-semibold">{cart.length} items in cart</span>
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Success Message */}
        {addedToCart && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-slide-in">
            <Check className="w-5 h-5" />
            Added to cart successfully!
          </div>
        )}

        {/* Main Product Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={product.images?.[selectedImage] || product.image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=500&fit=crop"}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  🌱 Fresh
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="flex gap-2 overflow-x-auto">
                {product.images?.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-green-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{product.name}</h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description || "Premium quality agricultural product sourced directly from verified farmers. Fresh, organic, and sustainably grown to meet the highest standards."}
                </p>
              </div>

              {/* Current Cart Status */}
              {getCartItemCount() > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-blue-800">
                    <ShoppingCart className="w-4 h-4" />
                    <span className="font-medium">
                      You have {getCartItemCount()} {product.unit} of this product in your cart
                    </span>
                  </div>
                </div>
              )}

              {/* Pricing */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-3xl font-bold text-green-700">₹{product.wholesalePrice}</span>
                    <span className="text-gray-600 ml-2">per {product.unit}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Minimum Order</div>
                    <div className="font-semibold">{product.minOrder} {product.unit}</div>
                  </div>
                </div>
                
                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= (product.minOrder || 1)}
                      className="w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center font-bold text-green-700 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center font-bold text-green-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.unit}
                  </span>
                </div>

                {/* Total Price Display */}
                <div className="bg-white rounded-lg p-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Price:</span>
                    <span className="text-xl font-bold text-green-700">
                      ₹{(product.wholesalePrice * quantity).toLocaleString()}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-green-400 disabled:to-green-500 text-white py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg flex items-center justify-center gap-2"
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add {quantity} {product.unit} to Cart
                    </>
                  )}
                </button>
                
                {/* Quick links */}
                <div className="flex gap-2 mt-3">
                  <Link 
                    to="/products"
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium text-center transition-colors"
                  >
                    Continue Shopping
                  </Link>
                  <Link 
                    to="/cart"
                    className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 rounded-lg font-medium text-center transition-colors"
                  >
                    View Cart ({cart.length})
                  </Link>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-blue-800">Freshness</div>
                  <div className="text-sm text-blue-600">{product.freshness} days</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-green-800">Quality</div>
                  <div className="text-sm text-green-600">Premium Grade</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <Truck className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold text-purple-800">Delivery</div>
                  <div className="text-sm text-purple-600">24-48 hours</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <Award className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="font-semibold text-orange-800">Certified</div>
                  <div className="text-sm text-orange-600">Organic</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Specifications */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              Specifications
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Origin:</span>
                <span className="font-medium">{product.specifications?.origin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Harvest Date:</span>
                <span className="font-medium">{product.specifications?.harvestDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Storage:</span>
                <span className="font-medium">{product.specifications?.storageTemp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shelf Life:</span>
                <span className="font-medium">{product.specifications?.shelfLife}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Packaging:</span>
                <span className="font-medium">{product.specifications?.packagingType}</span>
              </div>
            </div>
          </div>

          {/* Supplier Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" />
              Supplier Info
            </h3>
            <div className="space-y-3">
              <div>
                <div className="font-semibold text-gray-800">{product.supplier?.name}</div>
                <div className="text-sm text-gray-600">{product.supplier?.location}</div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-medium">{product.supplier?.rating}</span>
                <span className="text-sm text-gray-500">supplier rating</span>
              </div>
              <div className="text-sm text-gray-600">
                {product.supplier?.yearsExperience} years experience
              </div>
              <div className="flex flex-wrap gap-1">
                {product.supplier?.certifications?.map((cert, index) => (
                  <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-green-600" />
              Delivery Info
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Free delivery on orders above ₹{product.deliveryInfo?.minOrderForFreeDelivery}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Delivery in {product.deliveryInfo?.deliveryTime}</span>
              </div>
              <div>
                <div className="font-medium mb-1">Available Areas:</div>
                <div className="flex flex-wrap gap-1">
                  {product.deliveryInfo?.availableAreas?.map((area, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nutritional Information */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Nutritional Information</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(product.specifications?.nutritionalInfo || {}).map(([key, value]) => (
              <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="font-semibold text-gray-800 capitalize">{key}</div>
                <div className="text-sm text-gray-600">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, CONTACT_NUMBERS } from '../data/products';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = getProductById(id);

  // Extract technical specs from shortDesc
  const extractSpecs = (shortDesc) => {
    const specs = {};
    
    // Extract Camera/Device Type
    const typeMatch = shortDesc.match(/^([^,]+)/);
    if (typeMatch) specs.type = typeMatch[1].trim();
    
    // Extract Resolution
    const resolutionMatch = shortDesc.match(/(\d+(?:K|MP|p|VA|TB|GB|mAh|inches?|"|Channels?)[\s\/]*[\d]*[\s\w]*)/i);
    if (resolutionMatch) specs.resolution = resolutionMatch[1].trim();
    
    // Extract Connectivity
    const connectivityMatch = shortDesc.match(/(WiFi|4G|Ethernet|PoE|Coaxial|Analog|Bluetooth|Wireless|RCA|DC|RJ45)[^,]*/i);
    if (connectivityMatch) specs.connectivity = connectivityMatch[0].trim();
    
    return specs;
  };

  const technicalSpecs = product ? extractSpecs(product.shortDesc) : {};

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto py-20 px-5 text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Product Not Found</h2>
        <Link to="/store" className="text-blue-500 hover:text-blue-600">
          ← Back to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-5">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-600">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/store" className="hover:text-blue-500">Store</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">{product.name}</span>
      </div>

      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-500 hover:text-blue-600 flex items-center gap-2"
      >
        ← Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Product Image Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 h-96 rounded-lg flex flex-col items-center justify-center text-white mb-4">
            <div className="text-9xl mb-4">📷</div>
            <p className="text-lg">Product Image</p>
          </div>
          {product.brand && (
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-bold">
              {product.brand}
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">{product.name}</h1>
          
          {/* Price Section */}
          <div className="mb-6">
            {product.originalPrice && (
              <div className="flex items-center gap-4 mb-2">
                <span className="text-2xl text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </div>
            )}
            <div className="text-4xl font-bold text-blue-500">
              ${product.price.toFixed(2)}
            </div>
            <p className="text-sm text-gray-500 mt-2">Current price</p>
          </div>

          {/* Category */}
          <div className="mb-6">
            <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-semibold">
              Category: {product.category}
            </span>
          </div>

          {/* Short Description */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Product Overview</h3>
            <p className="text-gray-600 leading-relaxed">{product.shortDesc}</p>
          </div>

          {/* Technical Specifications Summary */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Technical Specifications</h3>
            <div className="grid grid-cols-1 gap-3">
              {technicalSpecs.type && (
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-gray-700 min-w-32">Type:</span>
                  <span className="text-gray-800">{technicalSpecs.type}</span>
                </div>
              )}
              {technicalSpecs.resolution && (
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-gray-700 min-w-32">Resolution:</span>
                  <span className="text-gray-800">{technicalSpecs.resolution}</span>
                </div>
              )}
              {technicalSpecs.connectivity && (
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-gray-700 min-w-32">Connectivity:</span>
                  <span className="text-gray-800">{technicalSpecs.connectivity}</span>
                </div>
              )}
              <div className="flex items-start gap-2">
                <span className="font-semibold text-gray-700 min-w-32">Brand:</span>
                <span className="text-gray-800">{product.brand}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-gray-700 min-w-32">Category:</span>
                <span className="text-gray-800">{product.category}</span>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Key Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 bg-blue-500 text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-blue-600 transition-all hover:scale-105">
              Add to Cart
            </button>
            <button className="bg-gray-200 text-slate-700 py-4 px-6 rounded-lg font-bold hover:bg-gray-300 transition-all">
              ❤️
            </button>
          </div>

          {/* Stock Status */}
          <div className="mt-6 flex items-center gap-2 text-green-600">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="font-semibold">In Stock</span>
          </div>

          {/* Contact for Orders */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-bold text-slate-800 mb-2">📞 Call to Order</h4>
            <div className="space-y-1">
              <a href={`tel:${CONTACT_NUMBERS.phone1}`} className="block text-blue-600 hover:text-blue-700 font-semibold">
                {CONTACT_NUMBERS.phone1}
              </a>
              <a href={`tel:${CONTACT_NUMBERS.phone2}`} className="block text-blue-600 hover:text-blue-700 font-semibold">
                {CONTACT_NUMBERS.phone2}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information Tabs */}
      <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Detailed Specifications</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Product Specifications */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b-2 border-blue-500">Product Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-3 border-b border-gray-200 hover:bg-gray-50 px-2 rounded transition-colors">
                <span className="font-semibold text-gray-700">Product Name:</span>
                <span className="text-gray-800 text-right max-w-xs">{product.name}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200 hover:bg-gray-50 px-2 rounded transition-colors">
                <span className="font-semibold text-gray-700">Brand:</span>
                <span className="text-gray-800">{product.brand}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200 hover:bg-gray-50 px-2 rounded transition-colors">
                <span className="font-semibold text-gray-700">Category:</span>
                <span className="text-gray-800">{product.category}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200 hover:bg-gray-50 px-2 rounded transition-colors">
                <span className="font-semibold text-gray-700">Model:</span>
                <span className="text-gray-800">{product.name.split(' ')[0]} {product.name.split(' ')[1]}</span>
              </div>
              {technicalSpecs.type && (
                <div className="flex justify-between py-3 border-b border-gray-200 hover:bg-gray-50 px-2 rounded transition-colors">
                  <span className="font-semibold text-gray-700">Device Type:</span>
                  <span className="text-gray-800 text-right max-w-xs">{technicalSpecs.type}</span>
                </div>
              )}
              {technicalSpecs.resolution && (
                <div className="flex justify-between py-3 border-b border-gray-200 hover:bg-gray-50 px-2 rounded transition-colors">
                  <span className="font-semibold text-gray-700">Resolution/Capacity:</span>
                  <span className="text-gray-800">{technicalSpecs.resolution}</span>
                </div>
              )}
              {technicalSpecs.connectivity && (
                <div className="flex justify-between py-3 border-b border-gray-200 hover:bg-gray-50 px-2 rounded transition-colors">
                  <span className="font-semibold text-gray-700">Connectivity:</span>
                  <span className="text-gray-800 text-right max-w-xs">{technicalSpecs.connectivity}</span>
                </div>
              )}
              <div className="flex justify-between py-3 border-b border-gray-200 hover:bg-gray-50 px-2 rounded transition-colors">
                <span className="font-semibold text-gray-700">Warranty:</span>
                <span className="text-gray-800">1 Year Manufacturer Warranty</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200 hover:bg-gray-50 px-2 rounded transition-colors">
                <span className="font-semibold text-gray-700">Condition:</span>
                <span className="text-green-600 font-semibold">Brand New</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200 hover:bg-gray-50 px-2 rounded transition-colors">
                <span className="font-semibold text-gray-700">Stock Status:</span>
                <span className="text-green-600 font-semibold">In Stock</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Purchase & Support Information */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b-2 border-blue-500">Purchase & Support</h3>
            <div className="space-y-4">
              {/* Pricing Information */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-bold text-gray-800 mb-2">💰 Price Information</h4>
                <div className="space-y-2">
                  {product.originalPrice && (
                    <p className="text-gray-700">
                      <span className="font-semibold">Original Price:</span>
                      <span className="ml-2 line-through text-gray-500">${product.originalPrice.toFixed(2)}</span>
                    </p>
                  )}
                  <p className="text-gray-700">
                    <span className="font-semibold">Current Price:</span>
                    <span className="ml-2 text-2xl text-blue-600 font-bold">${product.price.toFixed(2)}</span>
                  </p>
                  {product.originalPrice && (
                    <p className="text-green-700 font-semibold">
                      You Save: ${(product.originalPrice - product.price).toFixed(2)} 
                      ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF)
                    </p>
                  )}
                </div>
              </div>

              {/* Shipping Information */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-bold text-gray-800 mb-2">🚚 Shipping & Delivery</h4>
                <div className="text-gray-700 space-y-2">
                  <p>✓ Free shipping on orders over $200</p>
                  <p>✓ Fast delivery within 3-5 business days</p>
                  <p>✓ Cash on Delivery available</p>
                  <p>✓ Island-wide delivery service</p>
                </div>
              </div>

              {/* Return Policy */}
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-bold text-gray-800 mb-2">🔄 Returns & Warranty</h4>
                <div className="text-gray-700 space-y-2">
                  <p>✓ 7-day return policy</p>
                  <p>✓ 1 Year manufacturer warranty</p>
                  <p>✓ Professional installation available</p>
                  <p>✓ Lifetime technical support</p>
                </div>
              </div>

              {/* Customer Support */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-bold text-gray-800 mb-2">📞 Customer Support</h4>
                <div className="text-gray-700 space-y-2">
                  <p className="font-semibold">Contact us for:</p>
                  <p>• Product inquiries</p>
                  <p>• Technical support</p>
                  <p>• Installation guidance</p>
                  <p>• Bulk order discounts</p>
                  <div className="mt-3 pt-3 border-t border-purple-300">
                    <a href={`tel:${CONTACT_NUMBERS.phone1}`} className="block text-blue-600 hover:text-blue-700 font-bold text-lg">
                      📱 {CONTACT_NUMBERS.phone1}
                    </a>
                    <a href={`tel:${CONTACT_NUMBERS.phone2}`} className="block text-blue-600 hover:text-blue-700 font-bold text-lg">
                      📱 {CONTACT_NUMBERS.phone2}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Why Choose Our Products?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">✓</div>
            <h3 className="font-bold mb-2">Genuine Products</h3>
            <p className="text-sm text-indigo-100">100% authentic items with warranty</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🚚</div>
            <h3 className="font-bold mb-2">Fast Delivery</h3>
            <p className="text-sm text-indigo-100">Quick shipping across Sri Lanka</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">💯</div>
            <h3 className="font-bold mb-2">Quality Assured</h3>
            <p className="text-sm text-indigo-100">Tested & verified products</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">👨‍💼</div>
            <h3 className="font-bold mb-2">Expert Support</h3>
            <p className="text-sm text-indigo-100">Professional guidance available</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

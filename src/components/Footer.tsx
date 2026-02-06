export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 mb-2">STORE</h3>
            <p className="text-sm text-gray-600 max-w-md">
              Discover our curated collection of premium products. Quality craftsmanship meets modern design.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Shop</h4>
            <ul className="space-y-2">
              <li><a href="/products" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">All Products</a></li>
              <li><a href="/collections" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Collections</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Shipping</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Returns</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} STORE. All rights reserved. Powered by Shopify.
          </p>
        </div>
      </div>
    </footer>
  );
}

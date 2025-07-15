import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { PlusIcon, TrashIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { Product, ProductCategory } from '../../types';

const categoryColors: Record<ProductCategory, string> = {
  FOOD: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  TOY: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  MEDICINE: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  ACCESSORY: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  GROOMING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  OTHER: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
};

const ProductList: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | 'ALL'>('ALL');
  
  // Mock fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        const categories = Object.values(ProductCategory);
        const mockProducts: Product[] = Array.from({ length: 20 }, (_, i) => ({
          id: `pr-${i + 1}`,
          name: `Product ${i + 1}`,
          description: `Description for product ${i + 1}. This is a high-quality pet product.`,
          category: categories[i % categories.length],
          price: Math.floor(5 + Math.random() * 95),
          stockQuantity: Math.floor(Math.random() * 100),
          imageUrl: i % 3 === 0 ? `https://placekitten.com/200/200?image=${i}` : undefined,
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
          updatedAt: new Date()
        }));
        
        setProducts(mockProducts);
        setLoading(false);
      }, 1000);
    };
    
    fetchProducts();
  }, []);
  
  // Filter products based on search query and category
  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    const matchesQuery = (
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
    
    const matchesCategory = categoryFilter === 'ALL' || product.category === categoryFilter;
    
    return matchesQuery && matchesCategory;
  });
  
  // Sort products by name
  const sortedProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  
  // Mock delete product
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Link to="/products/new">
          <Button icon={<PlusIcon className="h-4 w-4" />} variant="primary">
            New Product
          </Button>
        </Link>
      </div>
      
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by name or description..."
              className={`pl-10 w-full rounded-md border ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'border-gray-300 placeholder-gray-500 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2`}
            />
          </div>
          <div className="flex items-center">
            <FunnelIcon className="h-5 w-5 text-gray-400 mr-2" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as ProductCategory | 'ALL')}
              className={`rounded-md border ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2`}
            >
              <option value="ALL">All Categories</option>
              {Object.values(ProductCategory).map((category) => (
                <option key={category} value={category}>{category.replace('_', ' ')}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <Card key={product.id} className="flex flex-col h-full">
              <div className="flex-1">
                {product.imageUrl ? (
                  <div className={`h-48 w-full rounded-t-lg bg-gray-200 dark:bg-gray-700 overflow-hidden ${isDark ? 'border-b border-gray-700' : ''}`}>
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className={`h-48 w-full rounded-t-lg ${isDark ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
                    <span className="text-gray-500 dark:text-gray-400">No image</span>
                  </div>
                )}
                
                <div className="p-4 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${categoryColors[product.category]}`}>
                      {product.category.replace('_', ' ')}
                    </span>
                  </div>
                  <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {product.description}
                  </p>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                      <span className={`ml-2 text-sm ${product.stockQuantity > 10 ? 'text-green-600 dark:text-green-400' : product.stockQuantity > 0 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                        {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`p-4 ${isDark ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}>
                <div className="flex justify-end space-x-2">
                  <Link to={`/products/${product.id}`} className="flex-1">
                    <Button variant="primary" size="sm" fullWidth>
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          
          {sortedProducts.length === 0 && (
            <div className={`col-span-full p-8 text-center rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <p className="text-gray-500 dark:text-gray-400">No products found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
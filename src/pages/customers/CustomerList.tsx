import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Customer, UserRole, PetSpecies } from '../../types';

const CustomerList: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Mock fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        const mockCustomers: Customer[] = Array.from({ length: 20 }, (_, i) => ({
          id: `c-${i + 1}`,
          userId: `u-${i + 1}`,
          phoneNumber: `+1-555-${String(Math.floor(1000 + Math.random() * 9000))}`,
          address: `${Math.floor(100 + Math.random() * 9900)} Main St, City ${i + 1}`,
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
          updatedAt: new Date(),
          user: {
            id: `u-${i + 1}`,
            email: `customer${i + 1}@example.com`,
            name: `Customer ${i + 1}`,
            role: UserRole.CUSTOMER,
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
            updatedAt: new Date()
          },
          pets: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, j) => ({
            id: `p-${i}-${j}`,
            customerId: `c-${i + 1}`,
            name: `Pet ${j + 1}`,
            species: [PetSpecies.DOG, PetSpecies.CAT, PetSpecies.BIRD, PetSpecies.FISH, PetSpecies.REPTILE, PetSpecies.SMALL_MAMMAL, PetSpecies.OTHER][Math.floor(Math.random() * 7)],
            breed: `Breed ${j + 1}`,
            birthDate: new Date(Date.now() - Math.floor(Math.random() * 315360000000)), // Random date within last 10 years
            weight: Math.floor(1 + Math.random() * 50),
            medicalHistory: `Medical history for pet ${j + 1}`,
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
            updatedAt: new Date()
          }))
        }));
        
        setCustomers(mockCustomers);
        setLoading(false);
      }, 1000);
    };
    
    fetchCustomers();
  }, []);
  
  // Filter customers based on search query
  const filteredCustomers = customers.filter((customer) => {
    const query = searchQuery.toLowerCase();
    return (
      customer.user?.name.toLowerCase().includes(query) ||
      customer.user?.email.toLowerCase().includes(query) ||
      customer.phoneNumber.toLowerCase().includes(query) ||
      customer.address.toLowerCase().includes(query)
    );
  });
  
  // Mock delete customer
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(customer => customer.id !== id));
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Customers</h1>
        <Link to="/customers/new">
          <Button icon={<PlusIcon className="h-4 w-4" />} variant="primary">
            New Customer
          </Button>
        </Link>
      </div>
      
      <Card className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customers by name, email, phone or address..."
            className={`pl-10 w-full rounded-md border ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'border-gray-300 placeholder-gray-500 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2`}
          />
        </div>
      </Card>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Pets
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Created
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                          <span className="text-lg font-medium">
                            {customer.user?.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium">{customer.user?.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{customer.user?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">{customer.phoneNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">{customer.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {customer.pets?.map((pet) => (
                          <span 
                            key={pet.id}
                            className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-200"
                          >
                            {pet.name} ({pet.species})
                          </span>
                        ))}
                        {!customer.pets?.length && <span className="text-gray-500 dark:text-gray-400">No pets</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link to={`/customers/${customer.id}`}>
                          <button className={`p-1 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                            <PencilIcon className="h-5 w-5 text-blue-600" />
                          </button>
                        </Link>
                        <button 
                          onClick={() => handleDelete(customer.id)}
                          className={`p-1 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        >
                          <TrashIcon className="h-5 w-5 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredCustomers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center">
                      <p className="text-gray-500 dark:text-gray-400">No customers found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CustomerList;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { Appointment, AppointmentStatus, UserRole, PetSpecies, ServiceCategory } from '../../types';

const statusColors: Record<AppointmentStatus, string> = {
  SCHEDULED: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  CONFIRMED: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  IN_PROGRESS: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  COMPLETED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  NO_SHOW: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
};

const AppointmentList: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'ALL'>('ALL');
  
  // Mock fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        const statuses = Object.values(AppointmentStatus);
        const mockAppointments: Appointment[] = Array.from({ length: 20 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() + Math.floor(Math.random() * 14) - 7); // +/- 7 days from today
          date.setHours(9 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 4) * 15, 0); // 9 AM to 5 PM, 15 min intervals
          
          return {
            id: `a-${i + 1}`,
            petId: `p-${i % 5 + 1}`,
            pet: {
              id: `p-${i % 5 + 1}`,
              customerId: `c-${i % 5 + 1}`,
              name: `Pet ${i % 5 + 1}`,
              species: [PetSpecies.DOG, PetSpecies.CAT, PetSpecies.BIRD, PetSpecies.FISH, PetSpecies.REPTILE][i % 5],
              breed: `Breed ${i % 3 + 1}`,
              birthDate: new Date(Date.now() - Math.floor(Math.random() * 315360000000)),
              weight: Math.floor(5 + Math.random() * 20),
              medicalHistory: `Medical history for pet ${i % 5 + 1}`,
              createdAt: new Date(),
              updatedAt: new Date(),
              customer: {
                id: `c-${i % 5 + 1}`,
                userId: `u-${i % 5 + 1}`,
                phoneNumber: `+1-555-${String(Math.floor(1000 + Math.random() * 9000))}`,
                address: `${Math.floor(100 + Math.random() * 9900)} Main St, City ${i % 5 + 1}`,
                createdAt: new Date(),
                updatedAt: new Date(),
                user: {
                  id: `u-${i % 5 + 1}`,
                  email: `customer${i % 5 + 1}@example.com`,
                  name: `Customer ${i % 5 + 1}`,
                  role: UserRole.CUSTOMER,
                  createdAt: new Date(),
                  updatedAt: new Date()
                }
              }
            },
            serviceId: `s-${i % 3 + 1}`,
            service: {
              id: `s-${i % 3 + 1}`,
              name: ['Grooming', 'Vaccination', 'Check-up'][i % 3],
              description: `Service description ${i % 3 + 1}`,
              category: [ServiceCategory.GROOMING, ServiceCategory.VETERINARY, ServiceCategory.TRAINING][i % 3],
              price: 25 + (i % 3) * 15,
              duration: 30 + (i % 3) * 15,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            date,
            status: statuses[i % statuses.length],
            notes: i % 3 === 0 ? `Special notes for appointment ${i + 1}` : '',
            createdAt: new Date(date.getTime() - 86400000 * Math.floor(Math.random() * 7)), // 0-7 days before appointment
            updatedAt: new Date()
          };
        });
        
        setAppointments(mockAppointments);
        setLoading(false);
      }, 1000);
    };
    
    fetchAppointments();
  }, []);
  
  // Filter appointments based on search query and status
  const filteredAppointments = appointments.filter((appointment) => {
    const query = searchQuery.toLowerCase();
    const matchesQuery = (
      appointment.pet?.name.toLowerCase().includes(query) ||
      appointment.pet?.customer?.user?.name.toLowerCase().includes(query) ||
      appointment.service?.name.toLowerCase().includes(query) ||
      appointment.notes.toLowerCase().includes(query)
    );
    
    const matchesStatus = statusFilter === 'ALL' || appointment.status === statusFilter;
    
    return matchesQuery && matchesStatus;
  });
  
  // Sort appointments by date (most recent first)
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  
  // Mock delete appointment
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      setAppointments(appointments.filter(appointment => appointment.id !== id));
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Appointments</h1>
        <Link to="/appointments/new">
          <Button icon={<PlusIcon className="h-4 w-4" />} variant="primary">
            New Appointment
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
              placeholder="Search appointments by pet, owner, service..."
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as AppointmentStatus | 'ALL')}
              className={`rounded-md border ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2`}
            >
              <option value="ALL">All Statuses</option>
              {Object.values(AppointmentStatus).map((status) => (
                <option key={status} value={status}>{status.replace('_', ' ')}</option>
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
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Pet & Owner
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Service
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Notes
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                {sortedAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">
                        {new Date(appointment.date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium">{appointment.pet?.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Owner: {appointment.pet?.customer?.user?.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">{appointment.service?.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ${appointment.service?.price} - {appointment.service?.duration} mins
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[appointment.status]}`}>
                        {appointment.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {appointment.notes || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link to={`/appointments/${appointment.id}`}>
                          <button className={`p-1 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                            <PencilIcon className="h-5 w-5 text-blue-600" />
                          </button>
                        </Link>
                        <button 
                          onClick={() => handleDelete(appointment.id)}
                          className={`p-1 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        >
                          <TrashIcon className="h-5 w-5 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {sortedAppointments.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center">
                      <p className="text-gray-500 dark:text-gray-400">No appointments found</p>
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

export default AppointmentList;
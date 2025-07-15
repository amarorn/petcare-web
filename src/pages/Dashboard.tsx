import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ReactApexChart from 'react-apexcharts';
import { 
  UsersIcon, 
  CubeIcon, 
  CalendarIcon, 
  ShoppingBagIcon, 
  CurrencyDollarIcon, 
  TrendingUpIcon 
} from '@heroicons/react/outline';
import { DashboardStats, ChartData } from '../types';

const Dashboard: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Mock dashboard stats
  const [stats, setStats] = useState<DashboardStats>({
    totalCustomers: 0,
    totalPets: 0,
    totalAppointments: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentAppointments: [],
    recentOrders: [],
    productInventory: []
  });
  
  // Mock loading state
  const [loading, setLoading] = useState<boolean>(true);
  
  // Mock fetch data
  useEffect(() => {
    const fetchData = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setStats({
          totalCustomers: 256,
          totalPets: 318,
          totalAppointments: 124,
          totalProducts: 89,
          totalOrders: 173,
          totalRevenue: 15680,
          recentAppointments: [],
          recentOrders: [],
          productInventory: []
        });
        setLoading(false);
      }, 1000);
    };
    
    fetchData();
  }, []);
  
  // Mock chart data
  const revenueData = {
    series: [{
      name: 'Revenue',
      data: [1500, 1800, 2200, 1900, 2500, 2800, 3100, 2900, 3300, 3500, 3800, 4200]
    }],
    options: {
      chart: {
        type: 'area',
        height: 350,
        toolbar: {
          show: false
        },
        background: 'transparent',
        foreColor: isDark ? '#fff' : '#000'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      tooltip: {
        theme: isDark ? 'dark' : 'light'
      },
      colors: ['#3b82f6'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'vertical',
          shadeIntensity: 0.3,
          inverseColors: false,
          opacityFrom: 0.7,
          opacityTo: 0.3,
        }
      },
      grid: {
        show: true,
        borderColor: isDark ? '#374151' : '#e5e7eb',
      },
      theme: {
        mode: isDark ? 'dark' : 'light'
      }
    }
  };
  
  const salesByCategory: ChartData = {
    series: [40, 25, 15, 12, 8],
    labels: ['Food', 'Accessories', 'Toys', 'Medicine', 'Grooming']
  };
  
  const salesByCategoryOptions = {
    chart: {
      type: 'pie',
      background: 'transparent',
      foreColor: isDark ? '#fff' : '#000'
    },
    labels: salesByCategory.labels,
    colors: ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#10b981'],
    dataLabels: {
      enabled: true
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: '100%'
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    legend: {
      position: 'bottom'
    },
    theme: {
      mode: isDark ? 'dark' : 'light'
    }
  };
  
  const statCards = [
    { title: 'Total Customers', value: stats.totalCustomers, icon: UsersIcon, color: 'bg-blue-500' },
    { title: 'Total Pets', value: stats.totalPets, icon: CubeIcon, color: 'bg-purple-500' },
    { title: 'Total Appointments', value: stats.totalAppointments, icon: CalendarIcon, color: 'bg-green-500' },
    { title: 'Total Products', value: stats.totalProducts, icon: ShoppingBagIcon, color: 'bg-yellow-500' },
    { title: 'Total Orders', value: stats.totalOrders, icon: ShoppingBagIcon, color: 'bg-pink-500' },
    { title: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: CurrencyDollarIcon, color: 'bg-red-500' }
  ];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Button icon={<TrendingUpIcon className="h-4 w-4" />}>
          Generate Report
        </Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {statCards.map((stat, index) => (
              <Card key={index} className="flex items-center">
                <div className={`flex items-center justify-center rounded-full w-12 h-12 ${stat.color} text-white mr-4`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <h3 className="text-xl font-bold">{stat.value}</h3>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
              <div className="h-80">
                <ReactApexChart
                  options={revenueData.options}
                  series={revenueData.series}
                  type="area"
                  height="100%"
                />
              </div>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold mb-4">Sales by Category</h3>
              <div className="h-80">
                <ReactApexChart
                  options={salesByCategoryOptions}
                  series={salesByCategory.series}
                  type="pie"
                  height="100%"
                />
              </div>
            </Card>
          </div>
          
          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Recent Appointments">
              <div className={`rounded-md p-4 ${isDark ? 'bg-gray-700' : 'bg-blue-50'} text-center`}>
                <p>No recent appointments found</p>
              </div>
            </Card>
            <Card title="Recent Orders">
              <div className={`rounded-md p-4 ${isDark ? 'bg-gray-700' : 'bg-blue-50'} text-center`}>
                <p>No recent orders found</p>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
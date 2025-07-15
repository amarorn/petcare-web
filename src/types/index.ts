// Domain Types

export enum UserRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  CUSTOMER = 'CUSTOMER'
}

export enum PetSpecies {
  DOG = 'DOG',
  CAT = 'CAT',
  BIRD = 'BIRD',
  FISH = 'FISH',
  REPTILE = 'REPTILE',
  SMALL_MAMMAL = 'SMALL_MAMMAL',
  OTHER = 'OTHER'
}

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW'
}

export enum ProductCategory {
  FOOD = 'FOOD',
  TOY = 'TOY',
  MEDICINE = 'MEDICINE',
  ACCESSORY = 'ACCESSORY',
  GROOMING = 'GROOMING',
  OTHER = 'OTHER'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  RETURNED = 'RETURNED',
  REFUNDED = 'REFUNDED'
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  CASH = 'CASH',
  BANK_TRANSFER = 'BANK_TRANSFER',
  MOBILE_PAYMENT = 'MOBILE_PAYMENT'
}

export enum ServiceCategory {
  GROOMING = 'GROOMING',
  TRAINING = 'TRAINING',
  VETERINARY = 'VETERINARY',
  BOARDING = 'BOARDING',
  DAYCARE = 'DAYCARE',
  OTHER = 'OTHER'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: string;
  userId: string;
  user?: User;
  phoneNumber: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  pets?: Pet[];
}

export interface Pet {
  id: string;
  customerId: string;
  customer?: Customer;
  name: string;
  species: PetSpecies;
  breed: string;
  birthDate: Date;
  weight: number;
  medicalHistory: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  id: string;
  petId: string;
  pet?: Pet;
  serviceId: string;
  service?: Service;
  date: Date;
  status: AppointmentStatus;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  stockQuantity: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product?: Product;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: string;
  customerId: string;
  customer?: Customer;
  orderDate: Date;
  status: OrderStatus;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: boolean;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  price: number;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryTransaction {
  id: string;
  productId: string;
  product?: Product;
  quantity: number;
  transactionType: 'IN' | 'OUT';
  referenceId?: string;
  notes: string;
  createdAt: Date;
}

export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PurchaseOrderItem {
  id: string;
  purchaseOrderId: string;
  productId: string;
  product?: Product;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  supplier?: Supplier;
  orderDate: Date;
  status: string;
  totalAmount: number;
  expectedDeliveryDate: Date;
  items: PurchaseOrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

// Theme
export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Dashboard
export interface DashboardStats {
  totalCustomers: number;
  totalPets: number;
  totalAppointments: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  recentAppointments: Appointment[];
  recentOrders: Order[];
  productInventory: Product[];
}

export interface ChartData {
  series: number[];
  labels: string[];
}
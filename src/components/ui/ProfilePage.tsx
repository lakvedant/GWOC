"use client"
import React, { ReactNode, useEffect, useState } from 'react';
import {
    Package,
    MessageSquare,
    User,
    Clock,
    CreditCard,
    Package2,
    Mail,
    Phone,
    Menu,
    X
} from 'lucide-react';
import ReviewsSection from '../ReviewSection';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
}

interface OrderProduct {
    productId: string;
    quantity: number;
}

interface Order {
    orderStatus: ReactNode;
    amount: ReactNode;
    _id: string;
    orderID: number;
    createdAt: string;
    status: string;
    paymentType: string;
    products: OrderProduct[];
    totalAmount: number;
    deliveryAddress: {
        type: string;
        address: string;
        city: string;
        state: string;
        pincode: string;
    };
}

interface UserInfo {
    name: string;
    email: string;
    phone: string;
    userId: string;
}

interface ProductApiResponse {
    success: boolean;
    product: Product;
    message?: string;
}

const ProfilePage = () => {
    const [activeSection, setActiveSection] = useState('orders');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<Record<string, Product>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    
    useEffect(() => {
        const fetchUserInfo = () => {
            const storedUserInfo = localStorage.getItem("userInfo");
            if (storedUserInfo) {
                setUserInfo(JSON.parse(storedUserInfo));
                console.log(JSON.parse(storedUserInfo));
                return JSON.parse(storedUserInfo);
            }
            return null;
        };

        const fetchProductInfo = async (productId: string) => {
            try {
                const response = await fetch(`/api/product/${productId}`);
                const data: ProductApiResponse = await response.json();
                
                if (!response.ok || !data.success) {
                    console.error(`Failed to fetch product ${productId}:`, data.message);
                    return null;
                }
                
                return data.product;
            } catch (error) {
                console.error(`Error fetching product ${productId}:`, error);
                return null;
            }
        };
    
        const fetchOrders = async (userInfo: UserInfo) => {
            try {
                setIsLoading(true);
                setError(null);

                const url = `/api/order?userId=${userInfo.userId}`;
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch orders: ${response.status}`);
                }

                const data = await response.json();

                if (!Array.isArray(data)) {
                    throw new Error("Invalid response format");
                }

                setOrders(data);

                // Fetch product information for all products in orders
                const productIds = new Set(data.flatMap(order => 
                    order.products.map((product: { productId: String; }) => product.productId)
                ));

                const productPromises = Array.from(productIds).map(fetchProductInfo);
                const productResults = await Promise.all(productPromises);

                const productMap: Record<string, Product> = {};
                productResults.forEach((product) => {
                    if (product) {
                        productMap[product.id] = product;
                    }
                });

                setProducts(productMap);
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setIsLoading(false);
            }
        };
        
        const initialize = async () => {
            const userInfo = fetchUserInfo();
            console.log(userInfo);
            if (userInfo) {
                await fetchOrders(userInfo);
            }
        };
    
        initialize();
    }, []);
    
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-white shadow-sm">
                <div className=" mx-6 px-4 py-4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <img
                                        src={'userlogo.svg'}
                                        alt="Profile"
                                        className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-pink-100"
                                    />
                                </div>
                                <h1 className="text-lg md:text-xl font-semibold">{userInfo?.name || 'User'}</h1>
                            </div>
                            <button
                                className="md:hidden"
                                onClick={toggleMobileMenu}
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                        <div className="text-sm md:text-base text-gray-600 space-y-1">
                            <div className="flex items-center gap-2">
                                <Mail size={16} className="text-gray-400" />
                                <span className="text-sm">{userInfo?.email || 'No Email'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-gray-400" />
                                <span className="text-sm">{userInfo?.phone || 'No Phone'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" mx-6 px-4 py-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Mobile Menu Overlay */}
                    {isMobileMenuOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                            onClick={toggleMobileMenu}>
                        </div>
                    )}

                    {/* Left Sidebar Navigation */}
                    <div className={`fixed md:relative inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                        } md:translate-x-0 w-72 bg-white md:bg-transparent z-10 transition-transform duration-300 ease-in-out md:block`}>
                        <nav className="space-y-3 p-4 md:p-0">
                            <MenuItem
                                icon={<Package size={20} />}
                                text="My Orders"
                                active={activeSection === 'orders'}
                                onClick={() => {
                                    setActiveSection('orders');
                                    setIsMobileMenuOpen(false);
                                }}
                            />
                            <MenuItem
                                icon={<MessageSquare size={20} />}
                                text="My Reviews"
                                active={activeSection === 'reviews'}
                                onClick={() => {
                                    setActiveSection('reviews');
                                    setIsMobileMenuOpen(false);
                                }}
                            />
                            <MenuItem
                                icon={<User size={20} />}
                                text="My Profile"
                                active={activeSection === 'profile'}
                                onClick={() => {
                                    setActiveSection('profile');
                                    setIsMobileMenuOpen(false);
                                }}
                            />
                        </nav>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        {activeSection === 'orders' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">My Orders</h2>
                                {isLoading ? (
                                    <div className="text-center py-8">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
                                        <p className="mt-4 text-gray-600">Loading orders...</p>
                                    </div>
                                ) : error ? (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
                                        {error}
                                    </div>
                                ) : orders.length === 0 ? (
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                                        <Package2 size={48} className="mx-auto text-gray-400 mb-4" />
                                        <p className="text-gray-600">No orders found</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {orders.map((order) => (
                                            <div key={order._id} className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
                                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-4">
                                                    <div>
                                                        <h3 className="font-medium">Order #{order.orderID}</h3>
                                                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                                            <Clock size={16} />
                                                            <span>{formatDate(order.createdAt)}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex md:flex-col items-center gap-3 md:items-end  md:gap-2">
                                                        {/* Order Status */}
                                                            <span className={`px-3 py-1 rounded-full text-sm ${
                                                                order.status === 'Delivered'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : 'bg-pink-100 text-pink-800'
                                                            }`}>
                                                                {order.orderStatus}
                                                            </span>

                                                            {/* Payment Type Wrapped in Curved Style */}
                                                            <div className="flex items-center gap-2 text-sm">
                                                                <CreditCard size={16} className="text-gray-500" />
                                                                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800">
                                                                    {order.paymentType}
                                                                </span>
                                                            </div>
                                                    </div>

                                                </div>

                                                <div className="border-t pt-4">
                                                    <h4 className="text-sm font-medium mb-2">Products</h4>
                                                    {order.products.map((product, index) => (
                                                <div key={index} className="flex justify-between items-center py-2 text-sm">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        {/* {products[product.productId]?.image ? (
                                                            <img 
                                                                src={products[product.productId].image} 
                                                                alt={products[product.productId]?.name} 
                                                                className="w-8 h-8 object-cover rounded"
                                                            />
                                                        ) : (
                                                            <Package2 size={16} className="text-gray-400" />
                                                        )} */}
                                                        <span>{products[product.productId]?.name || 'Product not found'}</span>
                                                        <span className="text-gray-500">x{product.quantity}</span>
                                                    </div>
                                                    <span>
                                                        ₹{(products[product.productId]?.price || 0) * product.quantity}
                                                    </span>
                                                </div>
                                            ))}
                                                </div>

                                                <div className="border-t mt-4 pt-4 flex justify-between items-center font-medium">
                                                    <span>Total Amount</span>
                                                    <span>₹{order.amount}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                       
                        {activeSection === 'orders' && (
                            <div>
                                {/* Your existing orders section code */}
                            </div>
                        )}
                        
                        {activeSection === 'reviews' && userInfo && <ReviewsSection userId={userInfo.userId} userName={userInfo.name} />}
                        
                        {activeSection === 'profile' && (
                            <div>
                                {/* Your profile section code */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

interface MenuItemProps {
    icon: React.ReactNode;
    text: string;
    active: boolean;
    onClick: () => void;
    badge?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, active, onClick, badge }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full px-4 py-3 flex items-center justify-between rounded-lg transition-colors ${
                active
                    ? 'bg-pink-100 text-pink-600'
                    : 'bg-white hover:bg-pink-50 text-gray-700'
            }`}
        >
            <div className="flex items-center gap-3">
                <span className={active ? 'text-pink-600' : 'text-gray-500'}>{icon}</span>
                <span className="font-medium">{text}</span>
            </div>
            {badge && (
                <span className="bg-pink-600 text-white text-xs px-2 py-1 rounded-full">
                    {badge}
                </span>
            )}
        </button>
    );
};

export default ProfilePage;
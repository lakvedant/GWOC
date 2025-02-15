"use client"
import React, { useState } from 'react';
import {
    Package,
    BookOpen,
    MessageSquare,
    User,
    Clock,
    CreditCard,
    Package2,
    Mail,
    Phone,
    MapPin,
    Menu,
    X
} from 'lucide-react';

const ProfilePage = () => {
    const [activeSection, setActiveSection] = useState('orders');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const sampleOrders = [
        {
            id: "ORD123456",
            date: "Feb 13, 2025",
            status: "Delivered",
            paymentType: "UPI",
            products: [
                { name: "Chocolate Cupcake", quantity: 2, price: 150 },
                { name: "Vanilla Pastry", quantity: 1, price: 200 }
            ],
            totalAmount: 500,
            deliveryAddress: {
                type: "Home",
                address: "123 Main Street, Apartment 4B",
                city: "Mumbai",
                state: "Maharashtra",
                pincode: "400001"
            }
        },
        {
            id: "ORD123457",
            date: "Feb 10, 2025",
            status: "Processing",
            paymentType: "Cash on Delivery",
            products: [
                { name: "Birthday Cake", quantity: 1, price: 800 }
            ],
            totalAmount: 800,
            deliveryAddress: {
                type: "Office",
                address: "456 Business Park, Tower B",
                city: "Mumbai",
                state: "Maharashtra",
                pincode: "400002"
            }
        }
    ];

    const sampleAddresses = [
        {
            id: 1,
            type: "Home",
            address: "123 Main Street, Apartment 4B",
            city: "Mumbai",
            state: "Maharashtra",
            pincode: "400001"
        },
        {
            id: 2,
            type: "Office",
            address: "456 Business Park, Tower B",
            city: "Mumbai",
            state: "Maharashtra",
            pincode: "400002"
        }
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <img
                                        src="userlogo.svg"
                                        alt="Profile"
                                        className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-pink-100"
                                    />
                                </div>
                                <h1 className="text-lg md:text-xl font-semibold">Miten</h1>
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
                                <span className="text-sm">mjgandhi2305@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-gray-400" />
                                <span className="text-sm">8799377093</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Mobile Menu Overlay */}
                    {isMobileMenuOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                            onClick={toggleMobileMenu}>
                        </div>
                    )}

                    {/* Left Sidebar Navigation - Mobile Drawer */}
                    <div className={`fixed md:relative inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                        } md:translate-x-0 w-72 bg-white md:bg-transparent z-50 transition-transform duration-300 ease-in-out md:block`}>
                        <nav className="space-y-3 p-4 md:p-0">
                            <MenuItem
                                icon={<Package size={20} />}
                                text="My Orders"
                                active={activeSection === 'orders'}
                                onClick={() => {
                                    setActiveSection('orders');
                                    setIsMobileMenuOpen(false);
                                } } badge={undefined}                            />
                            <MenuItem
                                icon={<BookOpen size={20} />}
                                text="Address Book"
                                active={activeSection === 'address'}
                                onClick={() => {
                                    setActiveSection('address');
                                    setIsMobileMenuOpen(false);
                                } } badge={undefined}                            />
                            <MenuItem
                                icon={<MessageSquare size={20} />}
                                text="My Reviews"
                                active={activeSection === 'reviews'}
                                onClick={() => {
                                    setActiveSection('reviews');
                                    setIsMobileMenuOpen(false);
                                } } badge={undefined}                            />
                            <MenuItem
                                icon={<User size={20} />}
                                text="My Profile"
                                active={activeSection === 'profile'}
                                onClick={() => {
                                    setActiveSection('profile');
                                    setIsMobileMenuOpen(false);
                                } } badge={undefined}                            />
                        </nav>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        {activeSection === 'orders' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">My Orders</h2>
                                <div className="space-y-4">
                                    {sampleOrders.map((order) => (
                                        <div key={order.id} className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
                                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-4">
                                                <div>
                                                    <h3 className="font-medium">Order #{order.id}</h3>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                                        <Clock size={16} />
                                                        <span>{order.date}</span>
                                                    </div>
                                                </div>
                                                <div className="flex md:flex-col items-start md:items-end gap-3 md:gap-2">
                                                    <span className={`px-3 py-1 rounded-full text-sm ${order.status === 'Delivered'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-pink-100 text-pink-800'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                                        <CreditCard size={16} />
                                                        <span>{order.paymentType}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t pt-4">
                                                <h4 className="text-sm font-medium mb-2">Products</h4>
                                                {order.products.map((product, index) => (
                                                    <div key={index} className="flex justify-between items-center py-2 text-sm">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <Package2 size={16} className="text-gray-400" />
                                                            <span>{product.name}</span>
                                                            <span className="text-gray-500">x{product.quantity}</span>
                                                        </div>
                                                        <span>₹{product.price * product.quantity}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="border-t mt-4 pt-4 flex justify-between items-center font-medium">
                                                <span>Total Amount</span>
                                                <span>₹{order.totalAmount}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeSection === 'address' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Address Book</h2>
                                <div className="grid grid-cols-1 gap-4">
                                    {sampleAddresses.map((address) => (
                                        <div key={address.id} className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="font-medium">{address.type}</h3>
                                                <button className="text-pink-600 text-sm">Edit</button>
                                            </div>
                                            <div className="text-gray-600 space-y-1 text-sm">
                                                <p>{address.address}</p>
                                                <p>{address.city}, {address.state}</p>
                                                <p>PIN: {address.pincode}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <button className="border-2 border-dashed border-pink-200 rounded-lg p-6 flex items-center justify-center text-pink-600 hover:bg-pink-50 transition-colors">
                                        + Add New Address
                                    </button>
                                </div>
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
            className={`w-full px-4 py-3 flex items-center justify-between rounded-lg transition-colors ${active
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
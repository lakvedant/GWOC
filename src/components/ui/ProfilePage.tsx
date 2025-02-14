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
    Settings,
    Mail,
    Phone,
    MapPin
} from 'lucide-react';

const ProfilePage = () => {
    const [activeSection, setActiveSection] = useState('orders');

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

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <img
                                    src="userlogo.svg"
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full object-cover border-2 border-pink-100"
                                />
                            </div>
                            <h1 className="text-xl font-semibold">Miten</h1>
                        </div>
                        <div className="text-gray-600 space-y-2">
                            <div className="flex items-center gap-2 justify-end">
                                <Mail size={18} className="text-gray-400" />
                                <span>mjgandhi2305@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-2 justify-end">
                                <Phone size={18} className="text-gray-400" />
                                <span>8799377093</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex gap-6">
                    {/* Left Sidebar Navigation */}
                    <div className="w-72 flex-shrink-0">
                        <nav className="space-y-3">
                            <MenuItem
                                icon={<Package size={20} />}
                                text="My Orders"
                                active={activeSection === 'orders'}
                                onClick={() => setActiveSection('orders')}
                            />
                            <MenuItem
                                icon={<BookOpen size={20} />}
                                text="Address Book"
                                active={activeSection === 'address'}
                                onClick={() => setActiveSection('address')}
                            />
                            <MenuItem
                                icon={<MessageSquare size={20} />}
                                text="My Reviews"
                                active={activeSection === 'reviews'}
                                onClick={() => setActiveSection('reviews')}
                            />
                            <MenuItem
                                icon={<User size={20} />}
                                text="My Profile"
                                active={activeSection === 'profile'}
                                onClick={() => setActiveSection('profile')}
                            />

                        </nav>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        {activeSection === 'orders' && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">My Orders</h2>
                                <div className="space-y-4">
                                    {sampleOrders.map((order) => (
                                        <div key={order.id} className="bg-white rounded-lg p-6 shadow-sm">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="font-medium">Order #{order.id}</h3>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                                        <Clock size={16} />
                                                        <span>{order.date}</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className={`px-3 py-1 rounded-full text-sm ${order.status === 'Delivered'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-pink-100 text-pink-800'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                                                        <CreditCard size={16} />
                                                        <span>{order.paymentType}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t pt-4">
                                                <h4 className="text-sm font-medium mb-2">Products</h4>
                                                {order.products.map((product, index) => (
                                                    <div key={index} className="flex justify-between items-center py-2 text-sm">
                                                        <div className="flex items-center gap-2">
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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {sampleAddresses.map((address) => (
                                        <div key={address.id} className="bg-white rounded-lg p-6 shadow-sm">
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="font-medium">{address.type}</h3>
                                                <button className="text-pink-600 text-sm">Edit</button>
                                            </div>
                                            <div className="text-gray-600 space-y-1">
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

const MenuItem = ({ icon, text, active, onClick, badge }) => {
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
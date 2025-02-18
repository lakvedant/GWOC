"use client"
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Cake, Cookie } from 'lucide-react';

const BakeryContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formData);
        setSubmitted(true);

        // Reset form after showing success message
        setTimeout(() => {
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });
            setSubmitted(false);
        }, 5000);
    };

    return (
        <div className="min-h-screen bg-pink-50">
            {/* Header with decorative elements */}
            <div className="relative py-12 bg-pink-100">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="absolute -top-8 -left-8 w-24 h-24 bg-pink-200 rounded-full opacity-70"></div>
                    <div className="absolute top-20 right-20 w-32 h-32 bg-pink-200 rounded-full opacity-50"></div>
                    <div className="absolute bottom-10 left-1/3 w-16 h-16 bg-pink-200 rounded-full opacity-60"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-pink-800 text-center mb-3">Get in Touch</h1>
                    <p className="text-lg text-pink-600 text-center max-w-2xl mx-auto">
                        We'd love to hear from you! Whether you're looking to place an order, inquire about our products,
                        or just say hello, we're here to help.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-100 rounded-full"></div>
                        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-pink-100 rounded-full"></div>

                        <div className="relative">
                            <h2 className="text-2xl font-semibold text-pink-800 mb-6">Contact Information</h2>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="bg-pink-100 p-3 rounded-full mr-4">
                                        <MapPin className="text-pink-600 w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-pink-800">Visit Our Bakery</h3>
                                        <p className="text-gray-600 mt-1">123 Sweet Street, Flour District</p>
                                        <p className="text-gray-600">Baker's Town, BT 12345</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-pink-100 p-3 rounded-full mr-4">
                                        <Phone className="text-pink-600 w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-pink-800">Call Us</h3>
                                        <p className="text-gray-600 mt-1">(555) 123-4567</p>
                                        <p className="text-gray-600">For orders: (555) 987-6543</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-pink-100 p-3 rounded-full mr-4">
                                        <Mail className="text-pink-600 w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-pink-800">Email Us</h3>
                                        <p className="text-gray-600 mt-1">hello@sweetbakery.com</p>
                                        <p className="text-gray-600">orders@sweetbakery.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-pink-100 p-3 rounded-full mr-4">
                                        <Clock className="text-pink-600 w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-pink-800">Opening Hours</h3>
                                        <p className="text-gray-600 mt-1">Mon-Fri: 7:00 AM - 7:00 PM</p>
                                        <p className="text-gray-600">Sat-Sun: 8:00 AM - 5:00 PM</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media Links */}
                            <div className="mt-10">
                                <h3 className="font-medium text-pink-800 mb-3">Follow Us</h3>
                                <div className="flex space-x-4">
                                    <a href="#" className="bg-pink-100 p-3 rounded-full hover:bg-pink-200 transition-colors">
                                        <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="bg-pink-100 p-3 rounded-full hover:bg-pink-200 transition-colors">
                                        <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="bg-pink-100 p-3 rounded-full hover:bg-pink-200 transition-colors">
                                        <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-xl shadow-lg p-8 relative">
                        <h2 className="text-2xl font-semibold text-pink-800 mb-6">Send Us a Message</h2>

                        {submitted ? (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-medium text-green-800 mb-2">Message Sent!</h3>
                                <p className="text-green-700">Thank you for reaching out. We'll get back to you shortly!</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 transition-colors"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 transition-colors"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 transition-colors"
                                        required
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Place an Order">Place an Order</option>
                                        <option value="Custom Cake Request">Custom Cake Request</option>
                                        <option value="Catering Services">Catering Services</option>
                                        <option value="Feedback">Feedback</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 transition-colors"
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 rounded-lg shadow-md transition-colors flex items-center justify-center"
                                    >
                                        <Send className="w-4 h-4 mr-2" />
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Decorative elements */}
                        <div className="absolute -top-3 -right-3 w-8 h-8 bg-pink-200 rounded-full"></div>
                        <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-pink-200 rounded-full"></div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-semibold text-pink-800 mb-6">Frequently Asked Questions</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-pink-50 p-6 rounded-lg">
                            <h3 className="font-medium text-pink-800 mb-2">Do you offer delivery?</h3>
                            <p className="text-gray-600">Sorry, We currently don't provide delivery service. Only pick-up from store is available</p>
                        </div>

                        <div className="bg-pink-50 p-6 rounded-lg">
                            <h3 className="font-medium text-pink-800 mb-2">How far in advance should I order a custom cake?</h3>
                            <p className="text-gray-600">We recommend placing custom cake orders at least 2 days in advance. For wedding cakes, we suggest booking 7 days ahead.</p>
                        </div>

                        <div className="bg-pink-50 p-6 rounded-lg">
                            <h3 className="font-medium text-pink-800 mb-2">Do you accommodate dietary restrictions?</h3>
                            <p className="text-gray-600">Absolutely! We offer gluten-free, vegan, and nut-free options. Just let us know your requirements when placing an order.</p>
                        </div>

                        <div className="bg-pink-50 p-6 rounded-lg">
                            <h3 className="font-medium text-pink-800 mb-2">Can I book the bakery for private events?</h3>
                            <p className="text-gray-600">Yes, our space is available for private events such as birthday parties, bridal showers, and corporate gatherings. Contact us for details.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="bg-white py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-semibold text-pink-800 mb-6 text-center">Find Us Here</h2>

                    <div className="rounded-xl overflow-hidden shadow-lg relative">
                        <div className="aspect-w-16 aspect-h-9">
                            <img
                                src="/api/placeholder/1200/500"
                                alt="Map location of Sweet Bakery"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Decorative pins */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="relative">
                                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center z-10 shadow-lg">
                                    <Cake className="w-6 h-6 text-white" />
                                </div>
                                <div className="absolute -bottom-8 left-6 w-px h-8 bg-pink-600"></div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <a
                            href="https://maps.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-pink-600 hover:text-pink-800 transition-colors"
                        >
                            <MapPin className="w-4 h-4 mr-1" />
                            Get Directions
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer CTA */}
            <div className="bg-pink-100 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-2xl mx-auto">
                        <Cookie className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-pink-800 mb-3">Ready to Taste Something Sweet?</h2>
                        <p className="text-pink-600 mb-6">
                            We can't wait to serve you! Stop by our bakery, place an order online, or contact us with any questions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/products"
                                className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-colors"
                            >
                                Order Online
                            </a>
                            <a
                                href="tel:+15551234567"
                                className="bg-white hover:bg-gray-100 text-pink-600 font-medium py-3 px-6 rounded-lg shadow-md transition-colors"
                            >
                                Call Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BakeryContactPage;
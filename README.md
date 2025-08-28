# 🧁 Bindi's Cupcakery

![TypeScript](https://img.shields.io/badge/TypeScript-99.5%25-blue)
![Next.js](https://img.shields.io/badge/Next.js-13+-000000)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-47A248)
![Team](https://img.shields.io/badge/Team-404_%23NotFound-red)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2025--02--19-green)

A full-stack bakery web application built under **Google Winter of Code (GWOC)** for a Surat-based startup — providing them a digital presence, online ordering, and admin analytics.  

## 🚀 Project Motivation
This project was built as a **social impact initiative**: students learned to build industry-grade software while empowering small businesses with digital solutions.  

## 🛠 Tech Stack
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, ShadCN UI, Framer Motion  
- **Backend**: Node.js, Express, MongoDB (Atlas)  
- **Integrations**: Message Central (OTP Authentication), WhatsApp API, ImageKit (CDN)  

## ✨ Features
- 📱 **Phone OTP Authentication** (via Message Central)  
- 🛒 **Online Ordering System** (cakes, donuts, cookies, muffins & more)  
- 💳 **Payment Options**: Cash on Delivery + UPI QR Upload  
- 📊 **Admin Dashboard**: Revenue, Orders, Customers, Reviews, Banner Management  
- 🎨 **Exceptional UI/UX** with animations and customizable photo carousel  

## 📂 Project Structure
- `frontend/` → Next.js UI with pages, components, hooks  
- `backend/` → Express + MongoDB models (Orders, Products, Coupons, Reviews, Users)  
- `admin/` → Dashboard with analytics, CRUD, and banner/review management  


### 1. Repository Setup

```bash
# Clone the repository
git clone https://github.com/lakvedant/GWOC.git

# Navigate to project directory
cd GWOC

# Install dependencies
npm install
# or
yarn install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Database Configuration
MONGODB_URI=your_mongodb_uri
MONGODB_DB_NAME=bindis_cupcakery

# Authentication
JWT_SECRET=your_jwt_secret
MESSAGECENTRAL_API_KEY=your_api_key

# WhatsApp Business API
WHATSAPP_BUSINESS_TOKEN=your_token
WHATSAPP_PHONE_NUMBER=your_business_phone

# Image Optimization
IMAGEKIT_URL=your_imagekit_url
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key

# Additional Configurations
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NODE_ENV=development
```


### 3. Running the Application

```bash
# Start development server
npm run dev
# or
yarn dev

# The application will be available at http://localhost:3000
```

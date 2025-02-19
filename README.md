# 🧁 Bindi's Cupcakery

![TypeScript](https://img.shields.io/badge/TypeScript-99.5%25-blue)
![Next.js](https://img.shields.io/badge/Next.js-13+-000000)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-47A248)
![Team](https://img.shields.io/badge/Team-404_%23NotFound-red)
![Last Updated](https://img.shields.io/badge/Last%20Updated-2025--02--19-green)

[Previous sections remain the same until Getting Started...]

## 🚀 Setup and Installation Guide

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher) or yarn (v1.22.0 or higher)
- MongoDB (v4.4 or higher)
- Git

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

### 3. Database Setup

```bash
# Start MongoDB service
mongod --dbpath /path/to/data/directory

# Initialize database (if needed)
npm run init-db
# or
yarn init-db
```

### 4. Running the Application

#### Development Mode
```bash
# Start development server
npm run dev
# or
yarn dev

# The application will be available at http://localhost:3000
```

#### Production Mode
```bash
# Build the application
npm run build
# or
yarn build

# Start production server
npm start
# or
yarn start
```

### 5. Testing

```bash
# Run unit tests
npm run test
# or
yarn test

# Run end-to-end tests
npm run e2e
# or
yarn e2e
```

## 📝 Development Workflow

### 1. Branch Management

```bash
# Create a new feature branch
git checkout -b feature/your-feature-name

# Create a new bugfix branch
git checkout -b bugfix/your-bugfix-name
```

### 2. Code Style and Linting

```bash
# Run linter
npm run lint
# or
yarn lint

# Fix linting issues
npm run lint:fix
# or
yarn lint:fix
```

### 3. Type Checking

```bash
# Run TypeScript compiler
npm run type-check
# or
yarn type-check
```

## 🔧 Available Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "e2e": "cypress run",
    "init-db": "node scripts/init-db.js"
  }
}
```

## 🚀 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with following settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Manual Deployment

```bash
# Build the application
npm run build

# Start the production server
npm start

# Optional: Use PM2 for process management
pm2 start npm --name "bindis-cupcakery" -- start
```

## 🐳 Docker Support

```bash
# Build Docker image
docker build -t bindis-cupcakery .

# Run Docker container
docker run -p 3000:3000 bindis-cupcakery
```

## 📊 Monitoring and Logging

### Application Logs
```bash
# View application logs
npm run logs
# or
yarn logs

# View error logs
npm run logs:error
# or
yarn logs:error
```

### Performance Monitoring
- Configure monitoring tools in `monitoring/config.js`
- Access dashboard at `/admin/monitoring`

## 🔍 Troubleshooting

### Common Issues and Solutions

1. **MongoDB Connection Issues**
   ```bash
   # Check MongoDB status
   mongo --eval "db.adminCommand('ping')"
   ```

2. **Build Errors**
   ```bash
   # Clear next.js cache
   rm -rf .next
   npm run build
   ```

3. **API Errors**
   - Verify environment variables
   - Check API keys and tokens
   - Ensure proper CORS configuration

### Debug Mode

```bash
# Run in debug mode
DEBUG=* npm run dev
# or
DEBUG=* yarn dev
```

## 🔄 Update Instructions

```bash
# Pull latest changes
git pull origin main

# Install new dependencies
npm install
# or
yarn install

# Rebuild application
npm run build
# or
yarn build
```

## 📚 Additional Resources

- [Project Documentation](docs/README.md)
- [API Documentation](docs/api/README.md)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Change Log](CHANGELOG.md)

---
Last Updated: 2025-02-19 18:23:17 UTC
Updated by: mjgandhi2305

# 🍽️ Catering v krabici - Strapi CMS Backend

Strapi CMS backend for the **Catering v krabici** website. This backend manages lead submissions from the catering website's contact forms and provides a content management system for the business.

## 🚀 Features

- **Lead Management**: Capture and manage catering inquiries
- **Content Type**: Comprehensive lead data structure
- **API Endpoints**: RESTful API for frontend integration
- **PostgreSQL**: Production-ready database
- **Railway Deployment**: Cloud-ready configuration

## 📋 Lead Content Type

The system captures the following lead information:

### Basic Information
- **Name** (Required) - Customer name
- **Email** (Required) - Contact email
- **Phone** (Optional) - Phone number
- **Company** (Optional) - Company name

### Event Details
- **Event Type** - firemni, svatba, narozeniny, konference, ostatni
- **Event Date** - Planned event date
- **Guest Count** - Number of guests
- **Budget** - Budget range (do_10000, od_10000_do_25000, etc.)
- **Message** (Required) - Customer inquiry details

### UTM Tracking
- **UTM Source** - Marketing source tracking
- **UTM Medium** - Marketing medium tracking
- **UTM Campaign** - Campaign tracking

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/buchal95/catering-strapi-cms.git
cd catering-strapi-cms

# Install dependencies
npm install

# Start development server
npm run develop
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Development (SQLite)
DATABASE_CLIENT=sqlite
NODE_ENV=development

# Required secrets (generate new ones for production)
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret
ENCRYPTION_KEY=your-encryption-key
```

## 🌐 API Usage

### Lead Submission Endpoint

```http
POST /api/leads
Content-Type: application/json

{
  "data": {
    "name": "Jan Novák",
    "email": "jan@example.com",
    "phone": "+420 123 456 789",
    "company": "Example s.r.o.",
    "eventType": "firemni",
    "eventDate": "2024-07-15",
    "guestCount": 50,
    "budget": "od_25000_do_50000",
    "message": "Potřebujeme catering pro firemní akci...",
    "utmSource": "google",
    "utmMedium": "cpc",
    "utmCampaign": "summer2024"
  }
}
```

### Response

```json
{
  "data": {
    "id": 1,
    "documentId": "abc123",
    "name": "Jan Novák",
    "email": "jan@example.com",
    "createdAt": "2024-06-28T10:00:00.000Z",
    "updatedAt": "2024-06-28T10:00:00.000Z"
  }
}
```

## 🚀 Railway Deployment

### 1. Prerequisites
- Railway account
- GitHub repository (this one)
- PostgreSQL database

### 2. Deploy Steps

1. **Connect to Railway**:
   - Go to [Railway](https://railway.app)
   - Create new project from GitHub repo
   - Select this repository

2. **Add PostgreSQL**:
   - Add PostgreSQL service to your project
   - Railway will auto-generate `DATABASE_URL`

3. **Environment Variables**:
   ```bash
   DATABASE_CLIENT=postgres
   DATABASE_SSL=false
   NODE_ENV=production
   STRAPI_ADMIN_BACKEND_URL=https://your-app.railway.app
   FRONTEND_URL=https://your-frontend.vercel.app

   # Use the generated secrets from deployment guide
   APP_KEYS=your-generated-keys
   API_TOKEN_SALT=your-generated-salt
   ADMIN_JWT_SECRET=your-generated-secret
   TRANSFER_TOKEN_SALT=your-generated-salt
   JWT_SECRET=your-generated-secret
   ENCRYPTION_KEY=your-generated-key
   ```

4. **Deploy**:
   - Railway will automatically build and deploy
   - Access admin at: `https://your-app.railway.app/admin`

## 🔧 Commands

```bash
# Development
npm run develop    # Start with auto-reload
npm run start      # Start production mode
npm run build      # Build admin panel

# Database
npm run strapi console  # Access Strapi console
```

## 📊 Content Management

### Admin Panel
- Access: `http://localhost:1337/admin` (development)
- Access: `https://your-app.railway.app/admin` (production)

### Lead Management
- View all leads in Content Manager
- Export lead data
- Search and filter leads
- Individual lead details

## 🔒 Security

- JWT-based authentication
- CORS configured for frontend domains
- Environment-based configuration
- Secure secret generation

## 🤝 Integration

### Frontend Integration
Update your frontend environment variables:

```bash
# Next.js (.env.local)
NEXT_PUBLIC_API_URL=https://your-app.railway.app
```

### API Permissions
- Public role: `create` permission for leads
- All other operations require authentication

## 📝 License

This project is private and proprietary to Catering v krabici.

## 🆘 Support

For support and questions, contact the development team.

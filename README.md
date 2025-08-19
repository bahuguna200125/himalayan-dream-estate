# Himalayan Dream Estate

A premium, professional real estate website for the Himalayan region built with Next.js 14, featuring modern design, smooth animations, and comprehensive property management.

## 🏔️ Features

### For Buyers
- **Browse Properties**: View all available properties with advanced filtering
- **Property Details**: Detailed property pages with image galleries and YouTube videos
- **Show Interest**: Contact form to express interest in properties
- **Responsive Design**: Mobile-friendly interface for all devices

### For Sellers
- **Easy Listing**: Simple form to submit property details
- **Image Upload**: Upload up to 5 property images
- **Seller Information**: Secure seller details (visible only to admin)
- **Status Tracking**: Track approval status of submissions

### For Admins
- **Secure Dashboard**: Protected admin panel with authentication
- **Property Management**: Approve/reject property submissions
- **Buyer Interest Tracking**: View and manage buyer inquiries
- **YouTube Integration**: Add video links to approved properties

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Animations**: Framer Motion
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Image Storage**: Cloudinary (configurable)
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database
- Cloudinary account (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd himalayan-dream-estate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/himalayan-dream-estate
   
   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   
   # Cloudinary (for image uploads)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

4. **Set up the database**
   - Ensure MongoDB is running
   - The application will automatically create collections on first run

5. **Create admin user**
   ```bash
   # You can create an admin user directly in MongoDB or use the API
   # Example admin user structure:
   {
     "name": "Admin User",
     "email": "admin@himalayandreamestate.com",
     "password": "hashed-password",
     "role": "admin"
   }
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
himalayan-dream-estate/
├── app/                    # Next.js 14 App Router
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   ├── contact/           # Contact page
│   ├── properties/        # Property listing pages
│   ├── sell/              # Seller upload form
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── Navigation.tsx    # Main navigation
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── models/               # MongoDB models
└── public/               # Static assets
```

## 🎨 Design Features

- **Premium Himalayan Theme**: Teal and amber color scheme
- **Smooth Animations**: Framer Motion for engaging interactions
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, professional interface with shadcn/ui
- **Trust Building**: Testimonials, company info, and security features

## 🔧 Configuration

### Customizing Colors
Edit `tailwind.config.js` to modify the Himalayan theme colors:
```javascript
himalayan: {
  50: '#f0f9ff',
  // ... other shades
},
amber: {
  50: '#fffbeb',
  // ... other shades
}
```

### Adding New Features
- **New Pages**: Add to `app/` directory
- **API Routes**: Create in `app/api/`
- **Components**: Add to `components/` directory
- **Database Models**: Create in `models/` directory

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
The application is compatible with any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📧 Contact Form Integration

The contact form can be integrated with:
- **Email Services**: SendGrid, Mailgun, AWS SES
- **CRM Systems**: HubSpot, Salesforce
- **Notification Services**: Slack, Discord webhooks

## 🔒 Security Features

- **Admin Authentication**: Secure login with NextAuth.js
- **Input Validation**: Form validation and sanitization
- **CSRF Protection**: Built-in Next.js protection
- **Environment Variables**: Secure configuration management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: info@himalayandreamestate.com
- Phone: +91 98765 43210

## 🎯 Roadmap

- [ ] Advanced property search filters
- [ ] Property comparison feature
- [ ] Virtual tour integration
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Payment gateway integration
- [ ] Property valuation tools
- [ ] Agent management system

---

Built with ❤️ for the Himalayan real estate market
# himalayan-dream-estate

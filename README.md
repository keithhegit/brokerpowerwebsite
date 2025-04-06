# BrokerPower Website

BrokerPower is a professional IT solutions provider website built with modern web technologies. The website showcases the company's products, services, and expertise in IT consulting.

## Project Structure

```
brokerpower/
├── admin/                  # Admin panel files
│   ├── js/                # Admin JavaScript files
│   │   ├── products.js    # Product management logic
│   │   └── upload.js      # Image upload handling
│   ├── dashboard.html     # Admin dashboard interface
│   └── index.html         # Admin login page
├── images/                # Image assets
├── js/                    # Frontend JavaScript files
├── styles/               # CSS stylesheets
│   └── custom.css        # Custom styling
└── Public Pages
    ├── index.html        # Homepage
    ├── about.html        # About page
    ├── service.html      # Services page
    ├── partners.html     # Partners showcase
    ├── products.html     # Product listing
    ├── product-detail.html # Product details
    └── contact.html      # Contact information

```

## Technology Stack

- **Frontend Framework**: Tailwind CSS
- **JavaScript**: Vanilla JavaScript
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Poppins)
- **Storage**: Local Storage for product data
- **Image Handling**: Client-side image compression and storage

## Features

### Public Website
1. **Homepage**: Company introduction and service overview
2. **About Page**: Company history and mission
3. **Services**: Detailed IT service offerings
4. **Partners**: Showcase of technology partners
5. **Products**: 
   - Product catalog with filtering and sorting
   - Detailed product pages with images
   - Support for product categories
6. **Contact**: Contact form and company information

### Admin Panel
1. **Authentication**: Secure admin login system
2. **Product Management**:
   - Add new products
   - Edit existing products
   - Delete products
   - Image upload and management
   - Product visibility control
3. **Data Features**:
   - Product ID system (001-999)
   - Price management with discount options
   - Inventory tracking
   - Multiple image support per product

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/brokerpower.git
```

2. No build process required - this is a static website

3. Open `index.html` in your browser to view the website

## Admin Access

1. Navigate to `/admin/index.html`
2. Login with admin credentials
3. Access the dashboard at `/admin/dashboard.html`

## Product Management

Products are stored in the browser's localStorage with the following structure:

```javascript
{
  id: "001",              // Unique 3-digit ID
  name: "Product Name",   // Product name
  description: "...",     // Product description
  collection: "...",      // Product category
  price: "...",          // Price in HKD
  visible: true/false,   // Product visibility
  discountMode: "...",   // Discount type
  discountValue: "...",  // Discount amount
  inventory: "...",      // Stock status
  cost: "...",          // Product cost
  brand: "...",         // Product brand
  images: []            // Array of product images
}
```

## Image Handling

- Images are compressed client-side before storage
- Supported formats: JPG, PNG, GIF
- Images are stored in base64 format in localStorage
- Multiple images per product with preview functionality

## Responsive Design

The website is fully responsive with:
- Mobile-first approach
- Hamburger menu for mobile navigation
- Responsive grid layouts
- Flexible image handling
- Touch-friendly interfaces

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is proprietary software of BrokerPower Co Ltd.

## Contact

For support or inquiries:
- Email: support@broker-power.com
- Phone: 852-31106138
- Address: PORTION 1 OF UNIT NO.721A, 7/F, STAR HOUSE, TSIM SHA TSUI, HONG KONG 
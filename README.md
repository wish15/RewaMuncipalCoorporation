# Rewa Municipal Corporation - Services Portal

A modern, responsive static website for Rewa Municipal Corporation services portal, inspired by the District Bhopal services page.

## 🚀 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Service Cards**: Clean, organized service cards with external links
- **Search & Filter**: Real-time search functionality to find services quickly
- **Modern UI/UX**: Professional design with smooth animations and hover effects
- **Accessibility**: Built with web accessibility standards in mind
- **Fast Loading**: Optimized static files for quick loading times

## 📁 Project Structure

```
RewaMuncipalCoorporation/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── assets/             # Images and media files
│   ├── rewa-logo.png
│   ├── digital-india-logo.png
│   ├── rewa-banner-1.jpg
│   ├── rewa-banner-2.jpg
│   └── rewa-banner-3.jpg
└── README.md           # This file
```

## 🛠️ Setup Instructions

### Option 1: Simple Setup (Recommended)
1. Open the project folder in VS Code
2. Install the "Live Server" extension
3. Right-click on `index.html` and select "Open with Live Server"
4. The website will open in your browser automatically

### Option 2: Using Python HTTP Server
1. Open terminal in the project folder
2. Run: `python -m http.server 8000`
3. Open browser and go to: `http://localhost:8000`

### Option 3: Using Node.js
1. Install Node.js if not already installed
2. Install http-server globally: `npm install -g http-server`
3. Run: `http-server`
4. Open the provided local URL in your browser

## 🖼️ Required Images

Please add the following images to the `assets/` folder:

1. **rewa-logo.png** - Rewa Municipal Corporation logo (80x80px recommended)
2. **digital-india-logo.png** - Digital India logo (height: 60px)
3. **rewa-banner-1.jpg** - Main banner image (1200x400px recommended)
4. **rewa-banner-2.jpg** - Second banner image (1200x400px recommended)
5. **rewa-banner-3.jpg** - Third banner image (1200x400px recommended)

## 🔗 Services Configuration

The website includes 12 pre-configured services:

1. **BPL Application Status** - `https://bpl.rewa.gov.in`
2. **Marriage Registration** - `https://marriage.rewa.gov.in`
3. **Income Certificate** - `https://income.rewa.gov.in`
4. **SC-ST Caste Certificate** - `https://caste.rewa.gov.in`
5. **Lodge a Grievance** - `https://grievance.rewa.gov.in`
6. **Property Tax Payment** - `https://propertytax.rewa.gov.in`
7. **Trade License** - `https://tradelicense.rewa.gov.in`
8. **Birth Certificate** - `https://birth.rewa.gov.in`
9. **Death Certificate** - `https://death.rewa.gov.in`
10. **Water Connection** - `https://water.rewa.gov.in`
11. **Street Light Complaint** - `https://streetlight.rewa.gov.in`
12. **Health Services** - `https://health.rewa.gov.in`

### To Update Service Links:
1. Open `index.html`
2. Find the service card you want to modify
3. Update the `href` attribute in the `<a class="service-link">` tag
4. Save the file

## 🎨 Customization

### Colors
The website uses a orange-based color scheme. To change colors, modify these CSS variables in `styles.css`:

```css
:root {
    --primary-color: #ff7b39;
    --primary-dark: #e65100;
    --secondary-color: #2c3e50;
}
```

### Adding New Services
1. Copy an existing service card in `index.html`
2. Update the icon class (Font Awesome icons)
3. Change the title, description, and link
4. Add appropriate `data-category` for filtering

### Typography
The website uses the 'Inter' font from Google Fonts. To change the font, update the Google Fonts import in the `<head>` section of `index.html`.

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE11+ (with minor limitations)

## 📞 Support & Maintenance

For updates or modifications to the website:

1. **Adding new services**: Edit the HTML in the services-grid section
2. **Updating contact information**: Modify the footer section
3. **Changing images**: Replace files in the assets folder
4. **Updating links**: Edit the href attributes in service cards

## 🔍 SEO Optimization

The website is optimized for search engines with:
- Semantic HTML structure
- Meta tags for description and keywords
- Alt text for images
- Proper heading hierarchy
- Fast loading times

## 📄 License

This project is created for Rewa Municipal Corporation. All rights reserved.

## 🤝 Contributing

For any improvements or bug fixes, please:
1. Document the changes needed
2. Test thoroughly on different devices
3. Ensure accessibility standards are maintained

---

**Developed for Rewa Municipal Corporation Digital Initiative**

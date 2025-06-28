# Personal Portfolio Website

A modern, responsive personal portfolio website built with HTML, CSS, and JavaScript. Features a clean design, smooth animations, and mobile-first approach.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Navigation**: Fixed navigation bar with smooth scrolling
- **Sections**: Home, About, Projects, and Contact sections
- **Interactive Elements**: Hover effects, form validation, and mobile menu
- **Accessibility**: Semantic HTML and keyboard navigation support

## File Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Customization Guide

### 1. Personal Information

Update the following in `index.html`:

- **Name**: Replace "Your Name" with your actual name
- **Title**: Update the job title in the hero section
- **Description**: Modify the hero description to match your expertise
- **Contact Information**: Update email, phone, and location in the contact section
- **Social Links**: Add your actual social media profiles

### 2. Skills Section

In the About section, update the skills to match your expertise:

```html
<div class="skill-category">
    <h4>Frontend</h4>
    <ul>
        <li>Your Skill 1</li>
        <li>Your Skill 2</li>
        <!-- Add more skills -->
    </ul>
</div>
```

### 3. Projects

Replace the sample projects with your actual work:

```html
<div class="project-card">
    <div class="project-image">
        <!-- Add your project image here -->
        <img src="path/to/your/image.jpg" alt="Project Name">
    </div>
    <div class="project-content">
        <h3>Your Project Name</h3>
        <p>Your project description</p>
        <div class="project-tech">
            <span class="tech-tag">Technology Used</span>
        </div>
        <div class="project-links">
            <a href="your-github-link" class="project-link">
                <i class="fab fa-github"></i> Code
            </a>
            <a href="your-live-link" class="project-link">
                <i class="fas fa-external-link-alt"></i> Live
            </a>
        </div>
    </div>
</div>
```

### 4. Colors and Styling

The website uses a modern color scheme. You can customize colors in `styles.css`:

- **Primary Blue**: `#2563eb` (used for links and accents)
- **Gradient**: `#667eea` to `#764ba2` (hero background)
- **Accent Yellow**: `#fbbf24` (highlight color)

### 5. Adding Your Photo

Replace the placeholder in the hero section:

```html
<div class="hero-image">
    <img src="path/to/your/photo.jpg" alt="Your Name" class="profile-photo">
</div>
```

Then add this CSS to `styles.css`:

```css
.profile-photo {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(255, 255, 255, 0.2);
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Features

- Optimized CSS with efficient selectors
- Minimal JavaScript for better performance
- Responsive images (when added)
- Smooth scrolling and animations
- Mobile-first approach

## Deployment

You can deploy this portfolio to various platforms:

### GitHub Pages
1. Create a new repository
2. Upload all files
3. Go to Settings > Pages
4. Select source branch (usually `main`)

### Netlify
1. Drag and drop the folder to Netlify
2. Your site will be live instantly

### Vercel
1. Connect your GitHub repository
2. Vercel will automatically deploy

## Contact Form

The contact form currently shows a success message. To make it functional:

1. **Netlify Forms**: Add `netlify` attribute to the form
2. **Formspree**: Replace the form action with your Formspree endpoint
3. **Custom Backend**: Implement your own form handling

Example with Formspree:
```html
<form class="contact-form" action="https://formspree.io/f/your-form-id" method="POST">
```

## SEO Optimization

To improve SEO, add these meta tags to the `<head>` section:

```html
<meta name="description" content="Your Name - Full Stack Developer Portfolio">
<meta name="keywords" content="web developer, frontend, backend, portfolio">
<meta name="author" content="Your Name">
<meta property="og:title" content="Your Name - Portfolio">
<meta property="og:description" content="Full Stack Developer Portfolio">
<meta property="og:image" content="path/to/your/og-image.jpg">
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have any questions or need help customizing your portfolio, feel free to reach out!

---

**Happy coding! 🚀** 
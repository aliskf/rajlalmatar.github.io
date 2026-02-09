# Ali Iskif Portfolio Website

A modern, animated portfolio website inspired by [fathir.live](https://www.fathir.live/), built with vanilla HTML, CSS, and JavaScript.

**Live Site:** https://aliskf.github.io/rajlalmatar.github.io/

---

## Project Structure

```
ali-portfolio/
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
├── script.js       # JavaScript for interactivity
└── README.md       # This documentation
```

---

## Features Implemented

### 1. Hero Section with Canvas Animation
- **Location:** `index.html` lines 34-104, `script.js` lines 1-200
- Interactive particle system on HTML5 canvas
- Particles react to mouse movement
- Connected particle network with lines
- Scroll-triggered text sections (4 screens tall)
- Loading spinner that fades out on load

**Scroll Sections:**
| Scroll Progress | Content Shown |
|-----------------|---------------|
| 0-25% | Name introduction ("Ali Iskif") |
| 25-55% | "Building intelligent Solutions." |
| 55-85% | "Academia meets Industry." |

### 2. Navigation
- **Location:** `index.html` lines 15-32, `styles.css` lines 100-180
- Fixed navbar with blur effect on scroll
- Mobile hamburger menu
- Smooth scroll to sections

### 3. About Section
- **Location:** `index.html` lines 106-165
- Bio text with highlighted keywords
- Stats: 6+ years experience, 3 languages, 70+ magazine issues
- Language proficiency bars (Arabic, English, Turkish)

### 4. Experience Timeline
- **Location:** `index.html` lines 167-274
- Vertical timeline with animated markers
- Positions included:
  - Full-Time Lecturer @ Al-Shamal Private University
  - Data Science Intern @ Programmers Force
  - Medical Interpreter @ TP
  - ICT Trainer @ Antalya Toplum Koleji
  - Research Assistant @ TUBITAK
  - Web Developer @ Ayn Almadina

### 5. Tech Stack (Icon Grid)
- **Location:** `index.html` lines 276-470, `styles.css` lines 774-900
- Grid of technology icons with grayscale-to-color hover effect
- Icons loaded from CDN (devicons, wikimedia)
- Categories:
  - Machine Learning & AI (TensorFlow, PyTorch, Scikit-learn, OpenCV, Keras)
  - Programming & Frameworks (Python, JavaScript, FastAPI, React, HTML5, CSS3)
  - Data Science & Visualization (Pandas, NumPy, Matplotlib, Seaborn, Power BI, Tableau)
  - Databases (MySQL, PostgreSQL, MongoDB, SQLite)
  - Tools & DevOps (Git, GitHub, Docker, Linux, VS Code, Jupyter)

### 6. Education Section
- **Location:** `index.html` lines 472-530
- Cards for each degree:
  - MSc Computer Engineering @ Akdeniz University (with thesis info)
  - Erasmus Exchange @ Hochschule Landshut, Germany
  - BSc Electrical Engineering @ Aleppo University

### 7. Contact Section
- **Location:** `index.html` lines 532-650
- Email: info@aliskf.com
- Location: Dubai, UAE
- Social links: LinkedIn, GitHub, Blog, Upwork, Twitter, Telegram

---

## How to Edit

### Change Personal Information

**Name/Title:**
```html
<!-- index.html lines 47-58 -->
<h1 class="hero-name">
    <span class="name-line">Ali</span>
    <span class="name-line gradient-text">Iskif</span>
</h1>
<p class="hero-tagline">Machine Learning Engineer & CS Lecturer</p>
```

**Email:**
```html
<!-- index.html line 559 -->
<a href="mailto:info@aliskf.com" class="contact-value">info@aliskf.com</a>
```

**Location:**
```html
<!-- index.html line 571 -->
<span class="contact-value">Dubai, United Arab Emirates</span>
```

### Add/Remove Tech Stack Items

Each tech item follows this pattern:
```html
<div class="stack-item">
    <div class="stack-icon">
        <img src="ICON_URL" alt="NAME">
    </div>
    <span>NAME</span>
</div>
```

**Icon Sources:**
- DevIcons CDN: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/[name]/[name]-original.svg`
- Browse available icons: https://devicon.dev/

### Add New Experience

Add a new `timeline-item` block:
```html
<div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
        <div class="timeline-header">
            <h3 class="timeline-title">JOB TITLE</h3>
            <span class="timeline-company">COMPANY NAME</span>
        </div>
        <span class="timeline-date">START - END</span>
        <span class="timeline-location">CITY, COUNTRY</span>
        <ul class="timeline-details">
            <li>Responsibility 1</li>
            <li>Responsibility 2</li>
        </ul>
    </div>
</div>
```

### Add Profile Photo

1. Add image file to the project folder (e.g., `profile.png`)
2. Add this HTML after the hero overlay div in `index.html`:
```html
<div class="hero-profile" id="hero-profile">
    <div class="profile-ring"></div>
    <img src="profile.png" alt="Ali Iskif" class="profile-image">
</div>
```
3. The CSS for `.hero-profile` and `.profile-image` is already in `styles.css` (lines 380-412)

### Change Colors

Edit CSS variables in `styles.css` (lines 2-15):
```css
:root {
    --bg-primary: #0a0a0a;           /* Main background */
    --bg-secondary: #121212;          /* Card backgrounds */
    --text-primary: #ffffff;          /* Main text */
    --text-secondary: #a1a1a1;        /* Muted text */
    --accent-primary: #6366f1;        /* Indigo accent */
    --accent-secondary: #8b5cf6;      /* Purple accent */
    --accent-tertiary: #ec4899;       /* Pink accent */
}
```

### Modify Hero Scroll Text

Edit the statement sections in `index.html`:
```html
<!-- Statement 1 (lines 62-73) -->
<h2 class="statement-title">
    Building intelligent<br>
    <span class="gradient-text-alt">Solutions.</span>
</h2>
<p class="statement-desc">
    Your description here...
</p>

<!-- Statement 2 (lines 75-86) -->
<h2 class="statement-title">
    Academia meets<br>
    <span class="gradient-text-cyan">Industry.</span>
</h2>
```

---

## Deployment

### GitHub Pages (Current Setup)

1. Repository: `aliskf/rajlalmatar.github.io`
2. Branch: `main`
3. Files are served from root `/`

**To deploy updates:**
```bash
cd ~/ali-portfolio
git add .
git commit -m "Your commit message"
GIT_SSH_COMMAND="ssh -i ~/.ssh/ssh-key-2025-08-07.key -o IdentitiesOnly=yes" git push origin main
```

Or if SSH is configured globally:
```bash
git push origin main
```

### Alternative Deployment Options

**Netlify:**
1. Drag and drop the `ali-portfolio` folder to netlify.com/drop
2. Or connect GitHub repo for auto-deploy

**Vercel:**
```bash
npx vercel --prod
```

---

## File Responsibilities

| File | Purpose |
|------|---------|
| `index.html` | Structure, content, SEO meta tags |
| `styles.css` | All styling, animations, responsive design |
| `script.js` | Canvas particles, scroll animations, navigation |

---

## Key CSS Classes

| Class | Purpose |
|-------|---------|
| `.hero-container` | Wrapper for scroll-based hero |
| `.hero-sticky` | Sticky container for canvas |
| `.stack-category` | Tech stack category wrapper |
| `.stack-grid` | Grid for tech icons |
| `.stack-item` | Individual tech icon card |
| `.timeline-item` | Experience entry |
| `.education-card` | Education entry |
| `.social-card` | Contact social link |
| `.animate` | Added by JS for scroll animations |

---

## JavaScript Components

### ParticleSystem (lines 14-130)
- Creates and animates canvas particles
- Handles mouse interaction
- Responds to scroll progress

### HeroScrollController (lines 133-195)
- Manages scroll-triggered hero sections
- Controls which text panel is visible
- Updates particle system on scroll

### Intersection Observer (lines 276-345)
- Adds `.animate` class when elements enter viewport
- Handles staggered animations with delays

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (breakpoints at 1024px, 768px, 480px)
- Smooth scroll with fallback

---

## Notes for Future AI Agents

1. **Don't delete CSS variables** - Many components depend on them
2. **Particle count** is calculated based on screen size (line 31 in script.js)
3. **Hero height** is 400vh to allow scroll animations (styles.css line 184)
4. **Icons use CDN** - No local images except optional profile photo
5. **SSH key path** for deployment: `~/.ssh/ssh-key-2025-08-07.key`
6. **Animation classes** use `.animate` added by Intersection Observer

---

## Changelog

### Version 1.0 (Initial Release)
- Created portfolio structure from scratch
- Implemented canvas particle hero like fathir.live
- Added scroll-triggered text animations
- Built responsive navigation with mobile menu
- Added About, Experience, Tech Stack, Education, Contact sections
- Deployed to GitHub Pages

### Version 1.1
- Changed email to info@aliskf.com
- Removed phone numbers from contact section
- Rebuilt Tech Stack with icon grid (grayscale hover effect)
- Added this README documentation

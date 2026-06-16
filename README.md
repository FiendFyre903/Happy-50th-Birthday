# Happy 50th Birthday Sambit - Static Website

A premium, elegant, fully responsive birthday celebration website built with pure HTML, CSS, and JavaScript. Perfect for GitHub Pages deployment with no backend required.

## 🎉 Features

✨ **Premium Design**
- Elegant dark theme with gold accents
- Professional, polished appearance
- Smooth animations and transitions
- Fully responsive (mobile, tablet, desktop)

📱 **Interactive Elements**
- Animated age counter (0 → 50)
- Dynamic message cards with unified message gallery
- Interactive modal for full message display
- Media gallery supporting photos and videos
- Random message feature
- Confetti celebration animation
- Scroll animations and indicators

📊 **Content Management**
- All data stored in a single JSON file
- Supports multiple message types (text, video, photo)
- Supports file-based media entries for image/video files
- Easy to customize and update

🎨 **Technical**
- Pure vanilla HTML, CSS, JavaScript (no frameworks)
- No backend or database required
- Mobile-first responsive design
- Accessibility-conscious
- Production-ready code

## 📁 Project Structure

```
Baba-50th-birthday/
├── index.html                    # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css            # Complete styling
│   ├── js/
│   │   └── script.js            # All functionality
│   ├── data/
│   │   └── messages.json        # Content data (messages & photos)
│   ├── images/                  # Place your custom images here
│   └── videos/                  # Place video files here
├── .gitignore                   # Git ignore file
├── README.md                    # This file
└── LICENSE                      # License file
```

## 🚀 Getting Started

### Prerequisites
- A GitHub account
- Basic knowledge of Git

### Installation

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/your-username/Baba-50th-birthday.git
   cd Baba-50th-birthday
   ```

2. **Customize the content** (see section below)

3. **Add custom media** (optional)
   - Place custom images in `assets/images/`
   - Place video files in `assets/videos/`

4. **Test locally**
   - Open `index.html` in your browser, or
   - Use a local server: `python -m http.server 8000`
   - Visit `http://localhost:8000`

## 📝 Customization

### Edit Messages

Open `assets/data/messages.json` and update the content:

```json
{
  "personName": "Sambit",
  "messages": [
    {
      "name": "Person's Name",
      "type": "text",
      "text": "Message content here..."
    }
  ],
  "photos": []
}
```

### Message Types

- **text**: Text-only messages
  ```json
  {
    "name": "John",
    "type": "text",
    "text": "Happy Birthday!"
  }
  ```

- **photo**: Photo with optional caption
  ```json
  {
    "name": "Jane",
    "type": "photo",
    "text": "Here's a photo from our trip!",
    "photo": "assets/images/trip.jpg"
  }
  ```

- **video**: Video message with optional caption
  ```json
  {
    "name": "Mike",
    "type": "video",
    "text": "Video message",
    "video": "assets/videos/mike-message.mp4"
  }
  ```

- **file**: Shorthand file-based media entry for images or videos
  ```json
  {
    "file": "bharti-nani.jpeg",
    "type": "photo",
    "text": "Happy birthday Sambit. Stay blessed"
  }
  ```

The app will resolve `assets/images/` for image file names and `assets/videos/` for video file names automatically.

### Customize Styling

Edit `assets/css/style.css` to change colors, fonts, and layouts:

```css
:root {
    /* Change these colors */
    --primary-dark: #0f0f23;        /* Background color */
    --accent-gold: #d4af37;         /* Accent color */
    --text-primary: #ffffff;        /* Text color */
}
```

### Update Person's Name

The name "Sambit" appears in:
1. `index.html` - Update in hero section (line ~25)
2. `assets/data/messages.json` - Update `personName` field

## 🌐 GitHub Pages Deployment

### Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click **New repository**
3. Name it `your-username.github.io` (for personal site) OR any name for project site
4. Initialize with README if desired
5. Click **Create repository**

### Step 2: Push Your Code

```bash
# Navigate to your project directory
cd Baba-50th-birthday

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial birthday website commit"

# Add remote origin (replace with your repository URL)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

**For a personal/organization site** (`username.github.io`):
- Your site will automatically be published at `https://username.github.io`

**For a project site** (any other repository name):
1. Go to your repository **Settings**
2. Navigate to **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Select **main** branch
5. Click **Save**
6. Your site will be published at `https://username.github.io/repo-name`

### Step 4: Access Your Website

Your site will be live at:
- Personal site: `https://your-username.github.io`
- Project site: `https://your-username.github.io/Baba-50th-birthday`

⏳ *Note: It may take 1-2 minutes for the site to be published after pushing.*

## 📱 Mobile Responsiveness

The website is fully responsive and tested on:
- ✓ Desktop (1920px and above)
- ✓ Tablet (768px - 1024px)
- ✓ Mobile (320px - 767px)

All features and animations adapt automatically to screen size.

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast optimization
- Reduced motion preferences respected
- Image alt text support

## 🎬 Sections Overview

### 1. Hero Section
- Animated age counter
- Call-to-action button
- Welcoming introduction

### 2. Introduction Section
- Brief tribute message
- Sets emotional tone

### 3. All Messages Gallery
- Unified text and media messages
- Interactive message cards
- Click to view full message or media

### 4. Random Message Feature
- Display random birthday wish
- Great for revisiting memories

### 5. Gallery
- Photo/video grid layout
- Lightbox with navigation
- Supports both images and videos

### 7. Celebration Section
- Final birthday greeting
- Confetti animation trigger

## 📊 Data Format Reference

### Complete Message Object
```json
{
  "name": "Person Name",
  "type": "text|photo|video",
  "text": "Message content (optional for photo/video)",
  "photo": "assets/images/example.jpg",
  "video": "assets/videos/example.mp4",
  "file": "example-file-name.jpg"
}
```

### File-based Media
You can also use a shorthand `file` field for media entries:
```json
{
  "file": "bharti-nani.jpeg",
  "type": "photo",
  "text": "Happy birthday Sambit. Stay blessed"
}
```

The site resolves image file names from `assets/images/` and video file names from `assets/videos/` automatically.

### Complete Photo Object
```json
{
  "src": "path/to/image.jpg",
  "alt": "Descriptive text for accessibility"
}
```

## 🎨 Customization Examples

### Change Theme Colors
Edit `:root` section in `assets/css/style.css`:
```css
:root {
    --primary-dark: #1a1a1a;      /* Darker background */
    --accent-gold: #ff6b9d;       /* Pink accent instead of gold */
}
```

### Add Custom Font
Add to `assets/css/style.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font:wght@300;700&display=swap');

:root {
    --font-primary: 'Your Font', sans-serif;
}
```

### Adjust Animation Speed
Find in `assets/css/style.css`:
```css
--transition-normal: 0.5s ease;  /* Change duration */
--transition-slow: 0.8s ease;
```

## 🔧 Browser Support

- ✓ Chrome/Edge (latest)
- ✓ Firefox (latest)
- ✓ Safari (latest)
- ✓ Mobile browsers (iOS Safari, Chrome Mobile)

## 📸 Adding Your Own Media

### Images
1. Save your images as JPG, PNG, or WebP
2. Place in `assets/images/` folder
3. Update `assets/data/messages.json` with image paths
4. Example: `"photo": "assets/images/my-photo.jpg"`

### Videos
1. Convert video to MP4 format for best compatibility
2. Place in `assets/videos/` folder
3. Add to messages with type: "video"
4. Example: `"video": "assets/videos/message.mp4"`

**Tip**: Use free tools like [Handbrake](https://handbrake.fr/) to convert videos to MP4.

## 🚨 Troubleshooting

### Images/Videos Not Loading
- Check file paths in `messages.json`
- Ensure files are in correct directories
- Verify filenames match exactly (case-sensitive on Linux/Mac)

### Content Not Appearing
- Check browser console for errors (F12 → Console)
- Verify JSON syntax is valid (use [JSONLint](https://jsonlint.com/))
- Ensure JSON file is properly formatted

### Animations Not Working
- Check browser compatibility
- Disable browser extensions that might interfere
- Clear browser cache (Ctrl+Shift+Delete)

### GitHub Pages Not Updating
- Wait 1-2 minutes for GitHub to rebuild
- Check Actions tab for build status
- Try hard refresh (Ctrl+Shift+R)

## 📝 Tips & Best Practices

1. **Keep JSON valid** - Use a JSON validator if unsure
2. **Optimize images** - Compress before uploading
3. **Test locally first** - Test all changes before pushing
4. **Back up original** - Keep a copy of important data
5. **Update regularly** - Add messages closer to the date
6. **Mobile test** - View on phone before sharing
7. **Share link** - Get shareable GitHub Pages link and send to guests

## 🎁 Sharing Your Website

Once deployed, share the link:
- Email: Send the GitHub Pages URL to friends/family
- Social Media: Post the link on WhatsApp, Facebook, etc.
- QR Code: Generate a QR code for the link (use [QR-Server](https://qr-server.com/))
- Print: Create an elegant card with the QR code

## 📄 License

This project is free to use and modify for personal use. 

## 🙏 Credits

Created as a premium birthday tribute website. Built with pure HTML, CSS, and JavaScript for reliability and ease of deployment.

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the customization examples
3. Validate your JSON file
4. Check browser console for errors

---

**Enjoy celebrating this special milestone! 🎉🎂✨**

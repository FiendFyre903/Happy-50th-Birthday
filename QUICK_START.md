# Quick Start Guide - 5 Minute Setup

## 🚀 In 5 Steps to Your Live Website

### Step 1: Edit the Content (2 minutes)

Open `assets/data/messages.json` and replace the example messages with real ones:

```json
{
  "personName": "Sambit",
  "messages": [
    {
      "name": "Your Friend's Name",
      "category": "friends",
      "type": "text",
      "text": "Copy and paste birthday wishes here!"
    }
  ]
}
```

### Step 2: Add Photos (1 minute)

In the same `messages.json` file, update photo URLs:

```json
"photos": [
  {
    "src": "assets/images/your-photo.jpg",
    "alt": "Photo description"
  }
]
```

*Tip: You can use online image URLs directly (like from Unsplash) without uploading files.*

### Step 3: Test on Your Computer (1 minute)

Double-click `index.html` to open in your browser. Test:
- ✓ Scroll through sections
- ✓ Click message cards
- ✓ Try filters (All, Family, Friends)
- ✓ Test random message button

### Step 4: Create GitHub Repository (1 minute)

1. Go to [github.com/new](https://github.com/new)
2. Name it: `your-username.github.io` (or any name)
3. Click "Create repository"
4. Copy the HTTPS URL shown

### Step 5: Push to GitHub (1 minute)

Open Command Prompt/Terminal in the project folder:

```bash
git init
git add .
git commit -m "Birthday website"
git branch -M main
git remote add origin [PASTE-YOUR-URL-HERE]
git push -u origin main
```

**✨ Done! Your site is now live! ✨**

## 🎁 Where to Find Your Website

After pushing to GitHub:

- Personal site: `https://your-username.github.io`
- Project site: `https://your-username.github.io/repo-name`

*(Takes 1-2 minutes to go live)*

---

## 📝 Common Edits

### Change the Birthday Person's Name
Edit `index.html`, find line with "Happy 50th Birthday" and change "Sambit" to their name.

### Change Colors
Edit `assets/css/style.css`, find `:root {` section:
```css
--accent-gold: #d4af37;  /* Change this hex code */
```

### Add a Personal Message at Top
Edit `index.html` in the introduction section and update the welcome text.

---

## 🎥 Add Video Messages

In `messages.json`:

```json
{
  "name": "Video Friend",
  "category": "family",
  "type": "video",
  "text": "Check out my video message!",
  "video": "assets/videos/birthday.mp4"
}
```

Upload video to `assets/videos/` folder first.

---

## 🖼️ Upload Images Instead of Using URLs

1. Add image to `assets/images/`
2. In `messages.json`, use local path:

```json
"photo": "assets/images/photo.jpg"
```

Instead of:
```json
"photo": "https://external-image-url.com/image.jpg"
```

---

## ✅ Validation Checklist

Before sharing:

- [ ] Tested in browser locally
- [ ] All messages display correctly
- [ ] Images/videos load properly
- [ ] Filters work (All, Family, Friends)
- [ ] Random message button works
- [ ] Mobile view looks good
- [ ] Code pushed to GitHub
- [ ] GitHub Pages URL is live
- [ ] QR code generated for sharing

---

## 🆘 Quick Troubleshooting

**Images not showing?**
- Check file path in messages.json matches actual file location
- Use forward slashes: `assets/images/photo.jpg` (not backslashes)

**JSON not working?**
- Validate at [jsonlint.com](https://jsonlint.com/)
- Check for missing commas, quotes
- Make sure special characters are escaped

**Site not updating on GitHub?**
- Wait 1-2 minutes
- Hard refresh browser: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
- Check Actions tab in GitHub repo for build status

**Videos not playing?**
- Ensure video is MP4 format
- Check file size (keep under 100MB if possible)
- Test video file plays locally first

---

## 💡 Pro Tips

1. **Generate QR Code**: Use [qr-server.com](https://qr-server.com/) to create QR code of your site URL for sharing

2. **Compress Images**: Use [tinypng.com](https://tinypng.com/) before uploading

3. **Schedule Sharing**: Save website link and share it on:
   - Email to guests
   - Group chats (WhatsApp, Telegram)
   - Social media posts
   - Print QR code on invitations

4. **Multiple Versions**: Keep adding messages leading up to birthday!

5. **Auto-Update**: Keep editing `messages.json` and pushing to GitHub with more messages

---

## 🎉 Ready to Go!

Your premium birthday website is now ready to celebrate! 

Share the link with friends and family, and watch them leave their heartfelt messages.

**Happy Birthday! 🎂✨**

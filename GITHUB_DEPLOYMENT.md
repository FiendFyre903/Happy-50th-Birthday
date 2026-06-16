# GitHub Pages Deployment Guide

Complete step-by-step instructions to deploy your birthday website to GitHub Pages.

## Prerequisites

1. A GitHub account (free at [github.com](https://github.com))
2. Git installed on your computer ([git-scm.com](https://git-scm.com))
3. Your project files ready

## Method 1: Using Command Line (Recommended)

### Step 1: Create Repository on GitHub

1. Go to [github.com/new](https://github.com/new)
2. **Repository name**: 
   - For personal site: `your-username.github.io`
   - For project site: Any name (e.g., `Baba-50th-birthday`)
3. **Description**: "50th Birthday Celebration Website"
4. Choose **Public** (required for free GitHub Pages)
5. **Do NOT** initialize with README
6. Click **Create repository**

### Step 2: Copy Repository URL

After creation, you'll see a quick setup page. Copy the HTTPS URL that looks like:
```
https://github.com/your-username/your-repo-name.git
```

### Step 3: Open Command Prompt/Terminal

**Windows:**
1. Navigate to your project folder
2. Hold Shift and right-click in the folder
3. Select "Open PowerShell window here"

**Mac:**
1. Open Terminal (Applications → Utilities → Terminal)
2. Type: `cd /path/to/Baba-50th-birthday`

**Linux:**
1. Open Terminal in your project folder

### Step 4: Initialize Git

Run these commands one by one:

```bash
git init
```

This creates a .git folder in your project (you won't see it - it's hidden).

### Step 5: Add Your Files

```bash
git add .
```

This stages all your files for commit.

### Step 6: Create Initial Commit

```bash
git commit -m "Initial birthday website commit"
```

### Step 7: Rename Main Branch (if needed)

```bash
git branch -M main
```

### Step 8: Add Remote Repository

Replace `[YOUR-URL-HERE]` with the URL you copied in Step 2:

```bash
git remote add origin https://github.com/your-username/your-repo-name.git
```

Example:
```bash
git remote add origin https://github.com/johndoe/Baba-50th-birthday.git
```

### Step 9: Push to GitHub

```bash
git push -u origin main
```

You may be prompted to log in. Enter your GitHub credentials.

**✅ Success!** Your code is now on GitHub!

---

## Method 2: Using GitHub Desktop (Easier for Beginners)

### Step 1: Install GitHub Desktop

Download from [desktop.github.com](https://desktop.github.com) and install.

### Step 2: Create Repository

1. Open GitHub Desktop
2. Click **File → New Repository**
3. Set:
   - **Name**: `your-repo-name`
   - **Local Path**: Point to your project folder
   - **Initialize this repository with a README**: Uncheck
4. Click **Create Repository**

### Step 3: Commit Changes

1. In GitHub Desktop, all files will be listed
2. At the bottom, write a **Commit message**: "Initial birthday website"
3. Click **Commit to main**

### Step 4: Publish to GitHub

1. Click **Publish repository** (top right)
2. Make sure it's set to **Public**
3. Click **Publish Repository**

**✅ Success!** Your code is now on GitHub!

---

## Step 10: Enable GitHub Pages

### For Personal Site (`username.github.io`)

Your site is automatically published! Go to:
```
https://your-username.github.io
```

### For Project Site (any other repo name)

1. Go to your GitHub repository
2. Click **Settings** (top right)
3. In left menu, click **Pages**
4. Under **Source**:
   - Select **Deploy from a branch**
   - Select **main** branch
   - Select **root** folder
5. Click **Save**

Your site will be available at:
```
https://your-username.github.io/repo-name
```

**⏳ Note**: It may take 1-2 minutes to go live. Refresh after a minute.

---

## Verify Your Site is Live

1. Wait 1-2 minutes
2. Visit your GitHub Pages URL:
   - Personal: `https://your-username.github.io`
   - Project: `https://your-username.github.io/repo-name`
3. Your beautiful birthday website should load!

---

## Making Updates

After publishing, to update content:

### Update via Command Line

```bash
# Make your changes to files
# Then:

git add .
git commit -m "Update messages"
git push
```

### Update via GitHub Desktop

1. Make your changes
2. GitHub Desktop will show changed files
3. Write commit message
4. Click **Commit to main**
5. Click **Push origin** (top right)

**Your site updates automatically!** (may take 1-2 minutes)

---

## Share Your Website

### Share the Link

- Copy your GitHub Pages URL
- Email to guests
- Post on social media
- Add to birthday invitation

Example:
```
https://johndoe.github.io/Baba-50th-birthday
```

### Create a QR Code

1. Visit [qr-server.com](https://qr-server.com/)
2. Paste your GitHub Pages URL in the input
3. Download QR code image
4. Print on invitations or share digitally

### Shorten the URL (Optional)

Services like [bit.ly](https://bit.ly) or [tinyurl.com](https://tinyurl.com) can shorten long URLs:

Example:
```
Original: https://johndoe.github.io/Baba-50th-birthday
Shortened: https://bit.ly/birthdaysam
```

---

## Troubleshooting

### Site Not Appearing

**Wait longer**: Give it 2-3 minutes from first push
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

**Check Repository Settings**:
- Go to Settings → Pages
- Verify source is set to "main" branch
- Check "Actions" tab for build status

**Check for Errors**:
- Look for red X in GitHub Actions
- Build errors will be shown there

### Files Not Updating

**After pushing changes**:
1. Wait 1-2 minutes
2. Hard refresh your browser
3. Clear browser cache if needed

**Check Git Status**:
```bash
git status
```

This shows uncommitted changes.

**Verify Push Succeeded**:
```bash
git log
```

Shows recent commits.

### 404 Error

**Check your URL**:
- Personal: `https://username.github.io`
- Project: `https://username.github.io/repo-name`

**Case sensitivity**: Some URLs are case-sensitive. Use exact repo name.

### Custom Domain (Advanced)

If you own a domain and want to use it:

1. Go to Settings → Pages
2. Under "Custom domain", enter your domain
3. Click Save
4. Add CNAME and A records in domain registrar settings

(See GitHub's custom domain documentation for details)

---

## Keeping Your Site Secure

GitHub Pages is secure (HTTPS enabled by default). Your data is safe because:

- ✓ No backend server to compromise
- ✓ No database with personal data
- ✓ Static files only
- ✓ HTTPS encryption automatic
- ✓ GitHub's security infrastructure

**Privacy Note**: Anything in a public GitHub repository is visible to everyone. Only commit data you want public (birthday messages, photos).

---

## Advanced: Automated Workflow

GitHub Actions can automatically build and deploy updates (optional advanced feature).

For this simple project, manual push is fine and keeps everything simple.

---

## Quick Reference

### Essential Commands

```bash
# View status
git status

# See recent changes
git log

# Add all files
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub
git push

# Pull latest from GitHub
git pull
```

---

## Getting Help

1. **GitHub Docs**: [docs.github.com/pages](https://docs.github.com/pages)
2. **GitHub Status**: [githubstatus.com](https://www.githubstatus.com/)
3. **Community**: Ask on GitHub Discussions
4. **Check Actions Tab**: Shows build logs and errors

---

## Deployment Checklist

- [ ] GitHub account created
- [ ] Git installed on computer
- [ ] Repository created on GitHub
- [ ] Files committed locally
- [ ] Remote repository added
- [ ] Files pushed to GitHub
- [ ] GitHub Pages enabled
- [ ] Website loads at GitHub Pages URL
- [ ] Content displays correctly
- [ ] Link shared with guests

---

**🎉 Congratulations! Your website is live!**

Your premium birthday celebration website is now accessible to everyone with the link. Share it with friends and family!

For updates, just edit files and push again. Simple as that!

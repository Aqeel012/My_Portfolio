# Free Resume Hosting Alternatives (No Firebase Upgrade Needed)

## 🎯 Recommended Solutions (Free & Reliable)

---

## Option 1: GitHub Raw URL (Best for Developers)

### Pros:
✅ Completely free
✅ Version control included
✅ Easy to update
✅ Reliable CDN
✅ Works perfectly with your existing workflow

### Setup:

**Method A: In Your Portfolio Repo**
1. Create a folder: `s:\Aqeel\Personal\portfolio\public\files`
2. Put your resume there: `public\files\resume.pdf`
3. Commit and push to GitHub
4. Get the raw URL:
```
https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/public/files/resume.pdf
```

**Method B: Separate Public Repo**
1. Create a new public repo: `resume-files`
2. Upload `resume.pdf` to the repo
3. Get raw URL:
```
https://raw.githubusercontent.com/YOUR_USERNAME/resume-files/main/resume.pdf
```

### Update Resume:
1. Replace file in repo
2. Commit and push
3. CDN updates in ~1-2 minutes
4. **No site redeploy needed!**

### Use in Code:
```typescript
const RESUME_URL = "https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/resume.pdf";

<a href={RESUME_URL} download="Aqeel_Ahmad_Resume.pdf">
  Download Resume
</a>
```

---

## Option 2: Google Drive (Easiest No-Code)

### Setup:
1. Upload resume to Google Drive
2. Right-click file → **Share** → **Get link**
3. Change to **"Anyone with the link"** → **Viewer**
4. Copy the link (looks like): 
   ```
   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
   ```
5. Convert to direct download link:
   ```
   https://drive.google.com/uc?export=download&id=FILE_ID
   ```

### Update Resume:
1. Replace file in Google Drive (keep same name)
2. Share link stays the same
3. Live immediately!

### Use in Code:
```typescript
const RESUME_URL = "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID";

<a href={RESUME_URL} download target="_blank" rel="noopener noreferrer">
  Download Resume
</a>
```

---

## Option 3: Cloudinary (Free CDN)

### Setup:
1. Sign up at [cloudinary.com](https://cloudinary.com) (free tier)
2. Upload your resume
3. Get public URL
4. Store URL in Firestore

### Free Tier:
- 25 GB storage
- 25 GB bandwidth/month
- More than enough for a resume!

### Update Resume:
- Replace file in Cloudinary dashboard
- URL stays the same
- Live immediately

---

## Option 4: Dropbox Public Link

### Setup:
1. Upload resume to Dropbox
2. Right-click → **Share** → **Create link**
3. Get the link (looks like):
   ```
   https://www.dropbox.com/s/XXXXX/resume.pdf?dl=0
   ```
4. Change `dl=0` to `dl=1` for direct download:
   ```
   https://www.dropbox.com/s/XXXXX/resume.pdf?dl=1
   ```

### Update Resume:
1. Replace file in Dropbox
2. Link stays the same
3. Live immediately

---

## Option 5: Store in Firestore as Base64 (Small PDFs Only)

### Pros:
✅ No external hosting needed
✅ Already have Firestore
✅ No upgrade required

### Cons:
❌ Only works for small PDFs (< 1MB recommended)
❌ Slower for users

### Setup Script:
```javascript
// Convert PDF to Base64
const fs = require('fs');
const pdfBuffer = fs.readFileSync('./resume.pdf');
const base64Pdf = pdfBuffer.toString('base64');

// Store in Firestore
await setDoc(doc(db, 'about', 'main'), {
  resumeBase64: base64Pdf,
  resumeFileName: 'Aqeel_Ahmad_Resume.pdf'
});
```

### Use in Component:
```typescript
const aboutData = await getAboutMe();

// Convert base64 back to downloadable blob
const base64ToBlob = (base64: string) => {
  const byteCharacters = atob(base64);
  const byteArrays = [];
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i));
  }
  return new Blob([new Uint8Array(byteArrays)], { type: 'application/pdf' });
};

// Download function
const downloadResume = () => {
  const blob = base64ToBlob(aboutData.resumeBase64);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = aboutData.resumeFileName;
  a.click();
};
```

---

## Option 6: Next.js Public Folder + Store URL in Firestore

### Setup:
1. Put resume in `/public/resume.pdf`
2. Deploy to Vercel/Netlify
3. Store full deployed URL in Firestore:
   ```
   https://your-portfolio.vercel.app/resume.pdf
   ```

4. When you update:
   - Replace file
   - Redeploy (takes 1-2 minutes on Vercel)
   - URL stays the same

### Use in Code:
```typescript
// Fetch from Firestore
const aboutData = await getAboutMe();
const resumeUrl = aboutData?.resumeUrl || '/resume.pdf';

<a href={resumeUrl} download>Download Resume</a>
```

---

## 🏆 My Top Recommendations

### Best for Developers:
**GitHub Raw URL** - Free, reliable, version-controlled

### Easiest Setup:
**Google Drive** - No coding, immediate, free

### Best CDN Performance:
**Cloudinary** - Free tier, fast CDN, professional

---

## Quick Implementation

I can set up any of these for you. Which would you prefer?

1. **GitHub Raw URL** (I'll show you exact steps)
2. **Google Drive** (simplest, you just upload and share)
3. **Cloudinary** (best performance)
4. **Store URL in Firestore** (works with any hosting)

Let me know and I'll implement it in your code!

---

## Recommendation for Your Portfolio:

Use **GitHub Raw URL** or **Google Drive**:

### GitHub Method:
```typescript
// In your .env.local or directly in code
const RESUME_URL = "https://raw.githubusercontent.com/aqeelahmad/portfolio/main/resume.pdf";
```

### Google Drive Method:
```typescript
// Store in Firestore about/main → resumeUrl
// Then fetch it dynamically
const aboutData = await getAboutMe();
const resumeUrl = aboutData?.resumeUrl;
```

Both are **100% free** and **easy to update**!

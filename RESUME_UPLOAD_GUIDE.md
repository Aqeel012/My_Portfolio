# How to Upload Resume to Firebase Storage

## Method 1: Upload via Firebase Console (Easiest)

### Step 1: Enable Firebase Storage
1. Go to [Firebase Console](https://console.firebase.google.com/project/portfolio-2caf5/storage)
2. Click on **Storage** in the left sidebar
3. If not enabled, click **Get started**
4. Choose **Start in test mode** (for development)
5. Select your location and click **Done**

### Step 2: Upload Your Resume
1. Once Storage is enabled, you'll see the Storage browser
2. Click **Upload file** button
3. Select your resume PDF file (e.g., `resume.pdf`)
4. Wait for upload to complete

### Step 3: Get the Download URL
1. Click on the uploaded file in Storage browser
2. You'll see file details on the right
3. Copy the **Access token URL** or click the download icon to get the public URL
4. It will look like: `https://firebasestorage.googleapis.com/v0/b/portfolio-2caf5.appspot.com/o/resume.pdf?alt=media&token=...`

### Step 4: Update Your Component
Replace the hardcoded `/resume.pdf` with your Firebase Storage URL.

**Option A: Directly in component**
```typescript
// In HeroSection.tsx
<Button asChild>
  <a href="YOUR_FIREBASE_STORAGE_URL" download>
    Download Resume
  </a>
</Button>
```

**Option B: Store in Firestore (Recommended)**
1. Go to Firestore Console
2. Open `about` collection → `main` document
3. Add/update field `resumeUrl` with your Firebase Storage URL
4. The component will automatically use it

---

## Method 2: Upload Programmatically

### Step 1: Install Firebase Admin (Optional)
If you want to upload via script:

```bash
pnpm add -D firebase-admin
```

### Step 2: Create Upload Script
Create `scripts/upload-resume.js`:

```javascript
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require('../firebase-admin-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'portfolio-2caf5.appspot.com'
});

const bucket = admin.storage().bucket();

async function uploadResume() {
  const filePath = path.join(__dirname, '../public/resume.pdf');
  
  try {
    const destination = 'resume.pdf';
    await bucket.upload(filePath, {
      destination: destination,
      metadata: {
        contentType: 'application/pdf',
        metadata: {
          firebaseStorageDownloadTokens: 'resume-token'
        }
      }
    });
    
    const file = bucket.file(destination);
    await file.makePublic();
    
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;
    console.log('✅ Resume uploaded successfully!');
    console.log('📎 Public URL:', publicUrl);
    
  } catch (error) {
    console.error('❌ Error uploading resume:', error);
  }
}

uploadResume();
```

---

## Method 3: Use Public Folder (Simplest - No Firebase Needed)

### Step 1: Add Resume to Public Folder
1. Place your `resume.pdf` in the `/public` folder of your project
2. The file will be accessible at `/resume.pdf`

### Step 2: Verify
Your download button already uses `/resume.pdf`, so if you place the file in `/public/resume.pdf`, it will work automatically!

### Location:
```
portfolio/
├── public/
│   ├── resume.pdf  ← Place your resume here
│   ├── icon.svg
│   └── ...
```

### No Changes Needed
The button already points to `/resume.pdf`:
```typescript
<a href="/resume.pdf" download>Download Resume</a>
```

---

## Recommended Approach

**Use Method 3 (Public Folder)** - It's the simplest and works immediately.

### Steps:
1. Rename your resume file to `resume.pdf`
2. Copy it to `s:\Aqeel\Personal\portfolio\public\resume.pdf`
3. Done! The download button will work

### To Test:
1. Place resume in `/public/resume.pdf`
2. Restart dev server: `pnpm dev`
3. Visit your site and click "Download Resume"
4. The PDF should download

---

## If Using Firebase Storage (Optional)

### Update HeroSection to use Firebase URL:

**Current code:**
```typescript
<a href="/resume.pdf" download>Download Resume</a>
```

**Update to:**
```typescript
<a 
  href="https://firebasestorage.googleapis.com/v0/b/portfolio-2caf5.appspot.com/o/resume.pdf?alt=media&token=YOUR_TOKEN"
  download
  target="_blank"
  rel="noopener noreferrer"
>
  Download Resume
</a>
```

Or fetch from Firestore `about.resumeUrl` field.

---

## Security Rules for Firebase Storage (Optional)

If using Firebase Storage, update rules:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /resume.pdf {
      allow read: if true;  // Public read access
      allow write: if false; // No public writes
    }
    match /{allPaths=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

---

## Quick Summary

**Easiest Method:** Put `resume.pdf` in `/public` folder
- No Firebase needed
- Works immediately
- File is served from your Next.js app

**Firebase Storage Method:** Upload to Firebase Storage
- Good for large files
- CDN benefits
- Centralized file management
- Get public URL and update component

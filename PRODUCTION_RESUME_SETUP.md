# Production Resume Setup Guide

## Why Firebase Storage for Production?

### Public Folder Method:
❌ Requires rebuilding and redeploying site to update resume
❌ Resume is bundled with app (increases build size)
❌ No version control for resume updates

### Firebase Storage Method:
✅ Update resume anytime without redeploying
✅ Resume hosted on CDN (faster downloads)
✅ Can track versions and manage files easily
✅ Works perfectly for live sites

---

## Setup Firebase Storage for Resume (Step-by-Step)

### Step 1: Enable Firebase Storage

1. Go to [Firebase Storage](https://console.firebase.google.com/project/portfolio-2caf5/storage)
2. Click **"Get started"**
3. Select **"Start in production mode"** (we'll set custom rules)
4. Choose your location (same as Firestore for consistency)
5. Click **"Done"**

### Step 2: Set Security Rules

1. Go to **Storage → Rules** tab
2. Replace with these rules (allow public read, no public write):

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow public read access to all files
    match /{allPaths=**} {
      allow read: if true;
      allow write: if false; // Prevent unauthorized uploads
    }
  }
}
```

3. Click **"Publish"** button

### Step 3: Upload Your Resume

1. Go back to **Storage → Files** tab
2. Click **"Upload file"** button
3. Select your `resume.pdf` file
4. Wait for upload to complete
5. Click on the uploaded file
6. Copy the **"Download URL"** (looks like below):

```
https://firebasestorage.googleapis.com/v0/b/portfolio-2caf5.appspot.com/o/resume.pdf?alt=media&token=XXXXX
```

### Step 4: Store URL in Firestore

Instead of hardcoding the URL, store it in Firestore so you can update it easily:

1. Go to [Firestore Database](https://console.firebase.google.com/project/portfolio-2caf5/firestore)
2. Open `about` collection → `main` document
3. Add a new field:
   - **Field name**: `resumeUrl`
   - **Type**: string
   - **Value**: Your Firebase Storage URL (paste the full URL)
4. Click **Update**

### Step 5: Update HeroSection Component

Update your component to fetch the resume URL from Firestore:

```typescript
// components/HeroSection.tsx
import { getAboutMe } from '@/lib/firebase-services';

export default async function HeroSection() {
  const aboutData = await getAboutMe();
  const resumeUrl = aboutData?.resumeUrl || '/resume.pdf'; // Fallback
  
  return (
    // ... your existing code ...
    <Button variant="outline" asChild>
      <a 
        href={resumeUrl} 
        download="Aqeel_Ahmad_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        Download Resume
      </a>
    </Button>
  );
}
```

---

## How to Update Resume on Live Site (After Setup)

### Option 1: Update via Firebase Console (Recommended)

**To update the resume:**
1. Go to [Firebase Storage](https://console.firebase.google.com/project/portfolio-2caf5/storage)
2. Click on your current `resume.pdf` file
3. Click the **3 dots menu** → **Delete**
4. Click **"Upload file"** and select your new resume
5. Name it `resume.pdf` (same name)
6. Copy the new download URL
7. Go to [Firestore](https://console.firebase.google.com/project/portfolio-2caf5/firestore)
8. Update `about/main` → `resumeUrl` field with the new URL
9. **Done!** Changes appear on live site immediately (no redeploy needed)

### Option 2: Keep Same Filename (Even Easier)

If you upload with the **exact same filename** (`resume.pdf`):
1. The URL with token usually stays the same
2. Firebase automatically serves the new file
3. Changes appear within minutes (CDN cache clears)
4. No need to update Firestore!

**Steps:**
1. Delete old `resume.pdf` from Storage
2. Upload new file as `resume.pdf`
3. Wait 5-10 minutes for CDN cache to clear
4. Done! New resume is live

### Option 3: Versioned Filenames (Best for History)

Upload with date/version in filename:
- `resume-2024-01.pdf`
- `resume-2024-06.pdf`
- `resume-latest.pdf` (copy of current)

Then update `resumeUrl` in Firestore to point to the latest version.

---

## Quick Setup Script

I can create a script to automate this. Would you like me to:

1. ✅ Update `HeroSection.tsx` to fetch resume URL from Firestore
2. ✅ Add `resumeUrl` field to the setup script
3. ✅ Create instructions for first-time upload

Let me know and I'll implement it!

---

## Comparison Summary

| Method | Update Process | Requires Redeploy? |
|--------|---------------|-------------------|
| **Public folder** | Replace file → Git commit → Redeploy | ✅ Yes |
| **Firebase Storage** | Upload new file in console | ❌ No |

**For production/live sites: Use Firebase Storage** ✅

---

## Current Status

Your button currently points to `/resume.pdf` (public folder).

**Next steps:**
1. I can update your components to use Firebase Storage URL
2. You upload resume to Firebase Storage
3. Update the URL in Firestore
4. Future updates = just upload new file (no redeploy!)

Would you like me to update the code now?

# Google Drive Resume Setup - Step by Step

Your portfolio is now configured to use a resume URL from Firebase Firestore. Follow these simple steps:

---

## Step 1: Upload Resume to Google Drive

1. Go to [Google Drive](https://drive.google.com)
2. Click **"New"** → **"File upload"**
3. Select your resume PDF file
4. Wait for upload to complete

---

## Step 2: Get the Shareable Link

1. **Right-click** on your uploaded resume file
2. Click **"Share"** (or click the share icon)
3. Under "General access", click **"Restricted"** 
4. Change it to **"Anyone with the link"**
5. Make sure the role is set to **"Viewer"**
6. Click **"Copy link"**

You'll get a link that looks like:
```
https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view?usp=sharing
```

---

## Step 3: Convert to Direct Download Link

Take the **File ID** from your link (the long random string between `/d/` and `/view`)

**Example:**
If your link is:
```
https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view?usp=sharing
```

The File ID is: `1a2b3c4d5e6f7g8h9i0j`

**Convert it to direct download format:**
```
https://drive.google.com/uc?export=download&id=1a2b3c4d5e6f7g8h9i0j
```

---

## Step 4: Update Firestore

1. Go to [Firebase Firestore Console](https://console.firebase.google.com/project/portfolio-2caf5/firestore/data)

2. Click on **`about`** collection

3. Click on **`main`** document

4. Find the **`resumeUrl`** field (should exist now with value `/resume.pdf`)

5. Click on the value to edit it

6. Replace `/resume.pdf` with your Google Drive direct download URL:
   ```
   https://drive.google.com/uc?export=download&id=YOUR_FILE_ID
   ```

7. Click **"Update"**

---

## Step 5: Test It!

1. Go to your portfolio website
2. Click the **"Download Resume"** button
3. Your resume should download!

---

## ✅ You're Done!

### To Update Resume in Future:

**Option 1: Replace File (Easiest)**
1. Delete old resume from Google Drive
2. Upload new resume with **same filename**
3. Share it with same settings
4. The File ID changes, so update Firestore again

**Option 2: Overwrite File**
1. Upload new version with same name
2. Google Drive sometimes keeps the same File ID
3. If File ID is same, no Firestore update needed!

---

## Quick Reference

### Link Format:
**Google Drive Share Link (what you copy):**
```
https://drive.google.com/file/d/FILE_ID/view?usp=sharing
```

**Direct Download Link (what you put in Firestore):**
```
https://drive.google.com/uc?export=download&id=FILE_ID
```

### Where to Update:
**Firebase Console** → **Firestore Database** → **about** collection → **main** document → **resumeUrl** field

---

## Troubleshooting

### Resume not downloading?
- Check if link is set to "Anyone with the link" (public)
- Make sure you used the direct download format (`uc?export=download&id=`)
- Clear browser cache and try again

### Getting "Access Denied" error?
- File privacy is set to "Restricted"
- Change to "Anyone with the link" in Google Drive sharing settings

### Link not working?
- Double-check you copied the full File ID correctly
- Make sure there are no extra spaces in the URL
- Try opening the link in browser to test

---

## Example Complete Flow

**1. Upload to Drive:**
   File uploaded ✅

**2. Share:**
   Link: `https://drive.google.com/file/d/ABC123XYZ/view?usp=sharing`

**3. Extract File ID:**
   ID: `ABC123XYZ`

**4. Create Direct Link:**
   URL: `https://drive.google.com/uc?export=download&id=ABC123XYZ`

**5. Update Firestore:**
   Field `resumeUrl` = `https://drive.google.com/uc?export=download&id=ABC123XYZ`

**6. Test:**
   Click "Download Resume" on your site ✅

---

## Need Help?

If you get stuck, share your Google Drive link (the one with `/view`) and I'll help you convert it to the direct download format!

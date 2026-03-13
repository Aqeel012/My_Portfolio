# Quick Start: Firebase Setup

## Step 1: Enable Firestore Database

1. Go to your [Firebase Console](https://console.firebase.google.com/project/portfolio-2caf5/firestore)
2. Click on **"Firestore Database"** in the left sidebar
3. Click **"Create database"** button
4. Select **"Start in test mode"** (you can secure it later)
5. Choose your preferred location (e.g., `us-central`)
6. Click **"Enable"**

Wait a few seconds for Firestore to be initialized.

## Step 2: Run the Setup Script

Open your terminal and run:

```bash
pnpm run setup:firebase
```

This will:
- Create `projects` collection with 6 sample projects
- Create `about` collection with your profile data
- Add dummy images from Unsplash

## Step 3: Verify the Data

1. Go back to [Firestore Console](https://console.firebase.google.com/project/portfolio-2caf5/firestore/data)
2. You should see two collections:
   - **projects** (6 documents)
   - **about** (1 document with ID: "main")

## Step 4: Update Components (We'll do this together)

Once the data is in Firestore, we'll update your portfolio components to fetch from Firebase instead of using hardcoded data.

## That's it! 🎉

Your Firebase backend is now ready with test data.

---

### Next Steps:
- Replace dummy images with your actual project images
- Update project URLs (GitHub, live demos)
- Customize project descriptions
- Add your real profile information

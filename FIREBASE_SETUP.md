# Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter your project name (e.g., "aqeel-portfolio")
4. Optional: Enable Google Analytics
5. Click "Create project"

## Step 2: Set Up Firestore Database

1. In Firebase Console, go to **Build > Firestore Database**
2. Click "Create database"
3. Choose **Start in test mode** (you can configure security rules later)
4. Select your preferred location
5. Click "Enable"

## Step 3: Get Firebase Configuration

1. In Firebase Console, click the **gear icon** (⚙️) next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps" section
4. Click the **Web icon** (`</>`) to add a web app
5. Register your app with a nickname (e.g., "Portfolio Website")
6. Copy the configuration values

## Step 4: Configure Environment Variables

1. Open `.env.local` file in your project root
2. Replace the placeholder values with your actual Firebase config values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-actual-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## Step 5: Create Firestore Collections

In Firestore, create the following collections:

### 1. `projects` Collection

Create documents with the following structure (see sample-firebase-data.json for examples):

- **Document ID**: Use kebab-case names (e.g., `mobile-banking-app`)
- **Fields**:
  - `title` (string)
  - `shortDescription` (string)
  - `fullDescription` (string)
  - `tags` (array of strings)
  - `githubUrl` (string, optional)
  - `liveUrl` (string, optional)
  - `date` (string)
  - `category` (string)
  - `imageUrl` (string, optional - URL to project image)
  - `features` (array of strings)
  - `technologies` (array of maps with `name` and `description`)
  - `challenges` (string)
  - `outcome` (string)
  - `order` (number - for display ordering)
  - `createdAt` (timestamp)
  - `updatedAt` (timestamp)

### 2. `about` Collection

Create a single document with ID `main`:

- **Fields**:
  - `name` (string)
  - `title` (string)
  - `bio` (array of strings - paragraphs)
  - `profileImageUrl` (string, optional)
  - `skills` (array of maps with `name`, `category`, `proficiency`, `icon`)
  - `experience` (string, optional)
  - `education` (string, optional)
  - `resumeUrl` (string, optional)
  - `createdAt` (timestamp)
  - `updatedAt` (timestamp)

### 3. `contact` Collection

Create a single document with ID `main`:

- **Fields**:
  - `email` (string)
  - `github` (string, optional)
  - `linkedin` (string, optional)
  - `whatsapp` (string, optional)
  - `phone` (string, optional)
  - `location` (string, optional)
  - `createdAt` (timestamp)
  - `updatedAt` (timestamp)

### 4. `hero` Collection

Create a single document with ID `main`:

- **Fields**:
  - `heading` (string)
  - `subheading` (string)
  - `description` (string)
  - `heroImageUrl` (string, optional)
  - `ctaPrimaryText` (string, optional)
  - `ctaPrimaryLink` (string, optional)
  - `ctaSecondaryText` (string, optional)
  - `ctaSecondaryLink` (string, optional)
  - `createdAt` (timestamp)
  - `updatedAt` (timestamp)

## Step 6: Set Up Firebase Storage (for images)

1. In Firebase Console, go to **Build > Storage**
2. Click "Get started"
3. Choose **Start in test mode**
4. Click "Next" and "Done"
5. Upload your images to Storage
6. Copy the download URLs and use them in your Firestore documents

## Step 7: Update Security Rules (Optional but Recommended)

### Firestore Rules (for read-only access):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all documents
    match /{document=**} {
      allow read: if true;
      allow write: if false; // Disable public writes
    }
  }
}
```

### Storage Rules (for read-only access):
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if false; // Disable public writes
    }
  }
}
```

## Step 8: Test the Connection

1. Restart your development server: `pnpm dev`
2. Check the browser console for any Firebase connection errors
3. Data should now be loaded from Firebase!

## Using the Firebase Services in Your Components

```typescript
import { getAllProjects, getAboutMe, getContactInfo } from '@/lib/firebase-services';

// In your component or server component
const projects = await getAllProjects();
const aboutMe = await getAboutMe();
const contactInfo = await getContactInfo();
```

## Troubleshooting

- **Connection errors**: Check that all environment variables are correctly set
- **Missing data**: Verify collection names and document IDs match exactly
- **CORS errors**: Make sure you're using `NEXT_PUBLIC_` prefix for all Firebase env vars
- **Build errors**: Restart dev server after adding environment variables

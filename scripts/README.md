# Firebase Setup Scripts

## setup-firebase.js

This script initializes your Firestore database with dummy data for testing.

### What it does:
- Creates `projects` collection with 6 sample projects
- Creates `about` collection with your profile information
- Adds timestamps to all documents
- Uses sample images from Unsplash

### Prerequisites:
1. Firebase project created
2. Firestore Database enabled (in test mode)
3. Environment variables configured in `.env.local`

### How to run:

```bash
pnpm run setup:firebase
```

Or directly:

```bash
node scripts/setup-firebase.js
```

### After running:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Navigate to your project
3. Go to **Firestore Database**
4. You should see:
   - `projects` collection with 6 documents
   - `about` collection with 1 document (ID: "main")

### Customizing the data:
Edit the `projectsData` and `aboutMeData` objects in the script to add your own content.

### Troubleshooting:
- **Connection error**: Check your `.env.local` file has correct Firebase credentials
- **Permission denied**: Make sure Firestore is in test mode or update security rules
- **Module not found**: Run `pnpm install` to ensure all dependencies are installed

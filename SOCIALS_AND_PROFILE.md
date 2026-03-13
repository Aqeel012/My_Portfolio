# Using Socials and Profile Collections

## Overview

Two new collections have been added to your Firebase Firestore:

1. **`socials`** - Social media links (GitHub, LinkedIn, WhatsApp, Email, Twitter)
2. **`profile`** - Profile image URL

Both collections have a single document with ID `main`.

## Fetching Data

### Import the functions:
```typescript
import { getSocials, getProfile } from '@/lib/firebase-services';
```

### In Server Components:
```typescript
export default async function MyComponent() {
  const socials = await getSocials();
  const profile = await getProfile();
  
  return (
    <div>
      {/* Use profile image */}
      {profile && (
        <img src={profile.imageUrl} alt={profile.altText || 'Profile'} />
      )}
      
      {/* Use social links */}
      {socials && (
        <div>
          {socials.github && <a href={socials.github}>GitHub</a>}
          {socials.linkedin && <a href={socials.linkedin}>LinkedIn</a>}
          {socials.whatsapp && <a href={socials.whatsapp}>WhatsApp</a>}
          {socials.email && <a href={socials.email}>Email</a>}
        </div>
      )}
    </div>
  );
}
```

## Current Data in Firestore

### Socials Collection (`socials/main`)
```json
{
  "github": "https://github.com/yourusername",
  "linkedin": "https://linkedin.com/in/yourusername",
  "whatsapp": "https://wa.me/1234567890",
  "email": "mailto:aqeel@example.com",
  "twitter": "https://twitter.com/yourusername"
}
```

### Profile Collection (`profile/main`)
```json
{
  "imageUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  "altText": "Aqeel Ahmad - Profile Picture"
}
```

## Updating Data

### Option 1: Via Firebase Console
1. Go to [Firestore Console](https://console.firebase.google.com/project/portfolio-2caf5/firestore/data)
2. Navigate to `socials` or `profile` collection
3. Click on the `main` document
4. Edit the fields and save

### Option 2: Update the setup script
Edit `scripts/setup-firebase.js`:

```javascript
// Update social links
const socialsData = {
  id: 'main',
  github: 'https://github.com/YOUR_USERNAME',
  linkedin: 'https://linkedin.com/in/YOUR_USERNAME',
  whatsapp: 'https://wa.me/YOUR_NUMBER',
  email: 'mailto:YOUR_EMAIL@example.com',
  twitter: 'https://twitter.com/YOUR_USERNAME'
};

// Update profile image
const profileData = {
  id: 'main',
  imageUrl: 'YOUR_IMAGE_URL_HERE',
  altText: 'Your Name - Profile Picture'
};
```

Then run: `pnpm run setup:firebase`

## Where to Use These

### Socials
- Footer component
- Contact section
- Header/Navbar

### Profile
- Hero section
- About section
- Any place showing your picture

## Example: Update Footer with Dynamic Socials

```typescript
import { getSocials } from '@/lib/firebase-services';
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';

export default async function Footer() {
  const socials = await getSocials();
  
  return (
    <footer>
      <div className="flex gap-4">
        {socials?.github && (
          <a href={socials.github} target="_blank" rel="noopener noreferrer">
            <Github className="w-5 h-5" />
          </a>
        )}
        {socials?.linkedin && (
          <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-5 h-5" />
          </a>
        )}
        {socials?.whatsapp && (
          <a href={socials.whatsapp} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-5 h-5" />
          </a>
        )}
        {socials?.email && (
          <a href={socials.email}>
            <Mail className="w-5 h-5" />
          </a>
        )}
      </div>
    </footer>
  );
}
```

## Example: Update Hero Section with Dynamic Profile

```typescript
import { getProfile } from '@/lib/firebase-services';
import Image from 'next/image';

export default async function HeroSection() {
  const profile = await getProfile();
  
  return (
    <div>
      {profile && (
        <div className="relative w-80 h-96">
          <Image 
            src={profile.imageUrl}
            alt={profile.altText || 'Profile'}
            fill
            className="object-cover rounded-2xl"
            priority
          />
        </div>
      )}
    </div>
  );
}
```

## Notes

- All optional fields can be omitted if not needed
- Social links are validated as optional in TypeScript
- Profile image uses placeholder if not provided
- Data updates in Firestore reflect immediately on the site

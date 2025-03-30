# ClaudeNation Digital Identity Platform: Step-by-Step Tutorial

This tutorial will guide you through setting up and using the ClaudeNation Digital Identity Platform after you've already run `npm install`.

## Prerequisites

- You have already cloned the repository
- You have already run `npm install`
- Node.js 18.x or higher is installed
- Basic familiarity with Next.js and React

## Getting Started

### Step 1: Set Up Environment Variables

1. Create a new file called `.env.local` in the root directory of your project.
2. Add the following environment variables:

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=/api

# For a real deployment, you would add these:
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
# EMAIL_SERVER_HOST=smtp.example.com
# EMAIL_SERVER_PORT=587
# EMAIL_SERVER_USER=your_username
# EMAIL_SERVER_PASSWORD=your_password
# EMAIL_FROM=noreply@claudenation.org
```

### Step 2: Add Background Images for ID Cards

1. Create the background images directory if it doesn't exist:
   ```bash
   mkdir -p public/backgrounds
   ```

2. Add your four background design images to the `/public/backgrounds/` directory with the following names:
   - `design1.jpg`
   - `design2.jpg`
   - `design3.jpg`
   - `design4.jpg`

   Note: If you don't have specific images, you can use placeholder images for testing:
   ```bash
   # Run this command to download placeholder images (requires curl)
   curl -o public/backgrounds/design1.jpg https://placekitten.com/1024/648
   curl -o public/backgrounds/design2.jpg https://placekitten.com/1025/648
   curl -o public/backgrounds/design3.jpg https://placekitten.com/1026/648
   curl -o public/backgrounds/design4.jpg https://placekitten.com/1027/648
   ```

### Step 3: Start the Development Server

1. Run the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

3. You should now see the ClaudeNation homepage with options to register or sign in.

## Using the Platform

### User Registration

1. Click on "Register Now" on the homepage or navigate to `/register`
2. Complete the multi-step registration form:
   - Step 1: Create your account (email and password)
   - Step 2: Enter your personal information (name, date of birth, nationality)
   - Step 3: Add your address and upload a photo for your ID card

### Signing In

1. After registration, you'll be redirected to the ID card designer page
2. Alternatively, you can click "Sign In" from the homepage or navigation menu
3. Enter your email and password to log in

### Designing Your ID Card

1. Once logged in, you'll be taken to the ID Card Designer at `/id-card`
2. Here you can:
   - Choose from 4 different background designs for your ID card
   - Preview how your ID card will look with your personal information
   - Download your ID card as a PDF
   - Email your ID card to your registered email address

## Feature Walkthrough

### The Homepage

The homepage introduces visitors to ClaudeNation and offers options to register as a new citizen or sign in as an existing citizen. Key elements include:

- Welcome header
- Brief introduction to ClaudeNation
- Registration and sign-in options
- Information about the digital nation concept

### Navigation

The top navigation bar allows users to:

- Return to the homepage
- Access the registration page
- View their ID card (when logged in)
- Sign in/out

### User Registration Process

The registration process is divided into three steps:

1. **Account Setup**:
   - Email address
   - Password creation
   - Password confirmation

2. **Personal Information**:
   - First and last name
   - Date of birth
   - Nationality

3. **Additional Details**:
   - Physical address
   - Photo upload for ID card

### ID Card Designer

The ID card designer allows citizens to:

- View their personalized ID card with their information
- Choose from 4 different background designs
- Download their ID card as a PDF
- Send their ID card to their registered email address

The ID card includes:
- ClaudeNation branding
- Citizen's full name
- Date of birth
- Nationality
- Unique ID number
- Issue and expiry dates
- Citizen's photo (when uploaded)

## Technical Details

### Project Structure

```
claudenation-id/
├── app/                # Next.js app directory
│   ├── api/            # API routes
│   ├── id-card/        # ID card designer page
│   ├── login/          # Login page
│   ├── register/       # Registration page
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout component
│   └── page.tsx        # Homepage
├── components/         # Reusable React components
│   ├── Footer.tsx      # Footer component
│   └── Navigation.tsx  # Navigation bar component
├── config/             # Application configuration
│   └── index.ts        # Config settings
├── public/             # Static assets
│   └── backgrounds/    # ID card background images
├── types/              # TypeScript type definitions
│   └── index.ts        # Type definitions
├── utils/              # Utility functions
│   └── helpers.ts      # Helper functions
└── ...                 # Config files (package.json, next.config.js, etc.)
```

### Customizing the Application

#### Changing Colors and Branding

1. Edit the Tailwind configuration in `tailwind.config.js`:
   ```js
   // Example: change the primary color
   colors: {
     'claude-primary': '#3B82F6', // Change to your preferred color
   }
   ```

2. Update the application name in `config/index.ts`:
   ```typescript
   export const APP_CONFIG = {
     name: 'YourNationName', // Change from ClaudeNation if desired
     // ...other settings
   };
   ```

#### Adding More ID Card Designs

1. Add new background images to the `/public/backgrounds/` directory
2. Update the `ID_CARD_CONFIG` in `config/index.ts`:
   ```typescript
   export const ID_CARD_CONFIG = {
     designs: [
       // Existing designs...
       {
         id: 5,
         name: 'New Design Name',
         backgroundUrl: '/backgrounds/design5.jpg',
         textColor: 'white',
       },
     ],
     // ...other settings
   };
   ```

## Deploying to Production

### Deploying to Vercel

1. Push your code to a GitHub repository
2. Visit [Vercel](https://vercel.com) and create a new project
3. Connect your GitHub repository
4. Configure the environment variables in the Vercel dashboard
5. Deploy the application

### Deploying to GitHub Pages

1. Update the `next.config.js` file to use the static export option
2. Build the static version:
   ```bash
   EXPORT_MODE=static npm run build
   ```
3. The static files will be in the `out` directory
4. Push these files to the `gh-pages` branch of your repository

## Troubleshooting

### Common Issues

1. **Missing background images**: Ensure you've added all four images to the `/public/backgrounds/` directory
2. **TypeScript errors**: Run `npm run build` to check for type errors
3. **Navigation issues**: Make sure all routes are correctly defined in the application
4. **ID card not displaying correctly**: Check that your user data is being properly loaded and passed to the ID card component

### Getting Help

If you encounter issues not covered in this tutorial, check:
- The project's README.md file
- The Next.js documentation for general Next.js issues
- Contact the ClaudeNation support team at citizenship@claudenation.org

## Next Steps

Now that you have your ClaudeNation Digital Identity Platform running, consider:

1. Connecting it to a real database like Supabase
2. Implementing actual email sending functionality
3. Adding user authentication with NextAuth.js
4. Enhancing the ID card with additional security features
5. Building an admin dashboard for President Claude to manage citizens

---

Congratulations! You've now set up and learned how to use the ClaudeNation Digital Identity Platform. Welcome to the digital nation! 
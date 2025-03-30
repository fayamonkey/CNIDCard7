# ClaudeNation Customization Guide

This guide provides detailed instructions for customizing the ClaudeNation Digital Identity Platform to match your specific requirements and branding needs.

## Branding Customization

### Changing the Platform Name

1. Update the application name in `config/index.ts`:
   ```typescript
   export const APP_CONFIG = {
     name: 'YourNationName', // Change from ClaudeNation
     version: '0.1.0',
     officialDomain: 'yournation.org', // Update domain
     contactEmail: 'citizenship@yournation.org', // Update email
     // ...other settings
   };
   ```

2. Update references in text throughout the application, including:
   - `app/page.tsx` (Homepage header and text)
   - `app/layout.tsx` (Metadata title and description)
   - `README.md` (Documentation)

### Customizing Colors and Theme

1. Edit the Tailwind configuration in `tailwind.config.js`:

   ```javascript
   module.exports = {
     // ...
     theme: {
       extend: {
         colors: {
           'claude-primary': '#0070f3', // Change to your primary color
           'claude-secondary': '#0761d1', // Change to your secondary color
           'claude-accent': '#bfdbfe', // Change to your accent color
           'claude-dark': '#1f2937', // Change to your dark shade
           'claude-light': '#f9fafb', // Change to your light shade
         },
         // Customize other theme elements
         fontFamily: {
           sans: ['YourPreferredFont', 'system-ui', 'sans-serif'],
           serif: ['YourSerifFont', 'serif'],
         },
       },
     },
   };
   ```

2. If using custom fonts, add them to the project:
   - Place font files in `public/fonts/`
   - Update the font configuration in your CSS

### Logo and Visual Identity

1. Replace the logo placeholder in the README
2. Add your logo file to `public/images/`
3. Update any references to the logo in components

## ID Card Customization

### Background Designs

1. Replace the default background images with your own designs:
   - Add your images to `public/backgrounds/`
   - Maintain the naming convention or update the references in `config/index.ts`

2. Customize the available designs in `config/index.ts`:
   ```typescript
   export const ID_CARD_CONFIG = {
     designs: [
       {
         id: 1,
         name: 'Corporate', // Rename to match your design theme
         backgroundUrl: '/backgrounds/design1.jpg',
         textColor: 'white', // Change text color if needed for contrast
       },
       // Customize other designs...
     ],
     // ...
   };
   ```

### ID Card Layout

1. Modify the ID card component in `app/id-card/page.tsx`:
   - Change the layout structure
   - Add or remove information fields
   - Adjust the positioning of elements

2. Update the ID card styles in `app/globals.css`:
   ```css
   /* ID Card Styles */
   .id-card {
     @apply relative overflow-hidden rounded-lg shadow-lg;
     aspect-ratio: 1.586;  /* Standard ID card aspect ratio - change if needed */
     max-width: 500px; /* Adjust size as needed */
   }
   
   /* Customize other ID card styles... */
   ```

### Custom Fields

1. To add custom fields to the ID card, update:
   - The user profile type in `types/index.ts`
   - The registration form in `app/register/page.tsx`
   - The ID card layout in `app/id-card/page.tsx`

   Example of adding a "Position" field:
   ```typescript
   // In types/index.ts
   export interface UserProfile {
     // ...existing fields
     position: string; // New field
   }
   
   // Then update the forms and display components
   ```

## Functional Customization

### Registration Process

1. Modify the registration steps in `app/register/page.tsx`:
   - Add or remove steps from the registration flow
   - Change the required fields
   - Customize validation logic

2. Example of adding a new step:
   ```typescript
   // In app/register/page.tsx
   
   // Update the state
   const [step, setStep] = useState(1);
   const [formData, setFormData] = useState({
     // ...existing fields
     termsAccepted: false,
     newsletterOptIn: false,
   });
   
   // Add a new step to the form
   {step === 4 && (
     <>
       <div className="rounded-md shadow-sm space-y-4">
         <div className="flex items-center">
           <input
             id="termsAccepted"
             name="termsAccepted"
             type="checkbox"
             required
             className="h-4 w-4"
             checked={formData.termsAccepted}
             onChange={(e) => setFormData({
               ...formData,
               termsAccepted: e.target.checked,
             })}
           />
           <label htmlFor="termsAccepted" className="ml-2 form-label">
             I accept the terms and conditions
           </label>
         </div>
         {/* Add more fields... */}
       </div>
     </>
   )}
   ```

### Authentication

1. Implement a real authentication system:
   - Configure Supabase or NextAuth.js
   - Update the login and registration handlers
   - Add protected routes

2. Example Supabase configuration:
   ```typescript
   // Create a lib/supabase.ts file
   import { createClient } from '@supabase/supabase-js';

   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
   const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

   export const supabase = createClient(supabaseUrl, supabaseAnonKey);
   ```

### Email Customization

1. Configure a real email service in `app/api/email/send-id-card/route.ts`:
   - Uncomment the nodemailer code
   - Update the email template with your branding

2. Customize the email templates:
   ```typescript
   // Customize email template
   const emailHtml = `
     <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
       <header style="background-color: #your-brand-color; padding: 20px; text-align: center; color: white;">
         <h1>${APP_CONFIG.name} Digital Identity</h1>
       </header>
       <main style="padding: 20px;">
         <h2>Welcome, ${userName || 'Citizen'}!</h2>
         <p>Your official ${APP_CONFIG.name} ID card is attached to this email.</p>
         <!-- Add more custom content here -->
       </main>
       <footer style="background-color: #f3f4f6; padding: 10px; text-align: center; font-size: 12px;">
         &copy; ${new Date().getFullYear()} ${APP_CONFIG.name}. All rights reserved.
       </footer>
     </div>
   `;
   ```

## Advanced Customization

### Database Integration

1. Set up a Supabase database schema:
   ```sql
   -- Create a users table
   CREATE TABLE users (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     email TEXT UNIQUE NOT NULL,
     first_name TEXT NOT NULL,
     last_name TEXT NOT NULL,
     date_of_birth DATE NOT NULL,
     nationality TEXT NOT NULL,
     address TEXT NOT NULL,
     id_number TEXT UNIQUE NOT NULL,
     issue_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     expiry_date TIMESTAMP WITH TIME ZONE NOT NULL,
     role TEXT NOT NULL DEFAULT 'citizen',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
   -- Create an id_cards table
   CREATE TABLE id_cards (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID REFERENCES users(id) NOT NULL,
     design_id INTEGER NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

2. Create API endpoints to interact with the database

### Adding New Features

1. Admin Dashboard:
   - Create an admin page in `app/admin/page.tsx`
   - Add authentication and role checks
   - Create interfaces for managing users

2. Digital Signature:
   - Add a digital signature library like `node-forge`
   - Create a service to sign ID cards
   - Verify signatures on display

3. Multi-language Support:
   - Add a language selection component
   - Create translation files for each supported language
   - Implement a translation context provider

## Performance Optimization

1. Implement image optimization:
   ```typescript
   // Use Next.js Image component
   import Image from 'next/image';
   
   // Replace standard img tags
   <Image
     src="/backgrounds/design1.jpg"
     alt="ID Card Background"
     width={1024}
     height={648}
     priority
   />
   ```

2. Add caching strategies:
   - Add cache headers to API responses
   - Implement SWR for client-side data fetching

## Conclusion

This customization guide covers the main aspects of tailoring the ClaudeNation Digital Identity Platform to your specific needs. Remember to test thoroughly after making changes, especially when modifying core functionality like authentication or data storage.

For more advanced customizations, consider forking the project repository and making deeper structural changes while maintaining the core identity management functionality. 
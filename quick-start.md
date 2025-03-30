# ClaudeNation Quick Start Guide

Get the ClaudeNation Digital Identity Platform up and running in minutes!

## 1. Prerequisites

Ensure you have:
- Node.js 18+ installed
- npm or yarn installed
- Git installed

## 2. Clone & Install

```bash
# Clone the repository
git clone https://github.com/claudenation/digital-identity.git
cd digital-identity

# Install dependencies
npm install
```

## 3. Add Background Images

```bash
# Create backgrounds directory
mkdir -p public/backgrounds

# Download placeholder images (requires curl)
curl -o public/backgrounds/design1.jpg https://placekitten.com/1024/648
curl -o public/backgrounds/design2.jpg https://placekitten.com/1025/648
curl -o public/backgrounds/design3.jpg https://placekitten.com/1026/648
curl -o public/backgrounds/design4.jpg https://placekitten.com/1027/648

# Alternative: Copy your own images to public/backgrounds/
# Ensure they're named design1.jpg, design2.jpg, design3.jpg, design4.jpg
```

## 4. Fix TypeScript Issues (if needed)

```bash
# Install required type definitions
npm install --save-dev @types/react @types/react-dom @types/node @types/html2canvas
```

## 5. Start Development Server

```bash
# Start the dev server
npm run dev
```

## 6. Access the Application

Open your browser and navigate to: [http://localhost:3000](http://localhost:3000)

## 7. Test Features

- Register a new citizen account
- Sign in with your credentials
- Design your ID card
- Download and email your ID card

## 8. Deploy (Optional)

### Deploy to Vercel:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Deploy to GitHub Pages:
```bash
# Build static site
EXPORT_MODE=static npm run build

# Deploy using gh-pages package
npm install -g gh-pages
gh-pages -d out
```

## Need More Help?

- Check the detailed tutorial in `tutorial.md`
- Refer to `typescript-setup.md` for TypeScript issues
- See the full documentation in `README.md`

Happy coding with ClaudeNation! 
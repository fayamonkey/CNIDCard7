# ClaudeNation ID Card - Troubleshooting Guide

This guide helps you address common issues with the ClaudeNation ID card generation system.

## Missing Background Images

If the ID card background isn't showing correctly:

1. **Check the image files**: Make sure the correct background files are in your `/public/backgrounds/` directory:
   - `claudenation01light.jpg` (Light Theme)
   - `claudenation02dark.jpg` (Dark Theme)

2. **Rename your images**: If you want to use your own images, name them to match the expected filenames above or update the `config/index.ts` file.

3. **Configuration check**: If you've added custom background images, make sure they're correctly referenced in `config/index.ts`.

4. **File size and format**: Use optimized JPG or PNG images for faster loading.

## Personal Information Not Showing

If your personal information isn't appearing on the ID card:

1. **Enter information directly**: Enter your information in the form fields on the right side of the ID card page.

2. **Local storage**: Your information is saved in your browser's local storage. If you clear your browser cache, you'll need to re-enter it.

3. **Layout structure**: Your information appears in the main portion of the ID card, positioned below the ClaudeNation title.

## Photo Not Displaying

If your photo isn't showing on the ID card:

1. **Upload format**: Any image format is supported (JPG, PNG, GIF, WebP, etc.) as long as your browser can display it.

2. **File size**: Large images may take time to process. Try using a smaller image if you're having issues.

3. **Photo position**: Your photo will appear on the right side of the ID card.

4. **Aspect ratio**: For best results, upload a photo with a 4:5 aspect ratio (portrait orientation). You can crop your photo to this ratio before uploading.

5. **Image rendering**: If your photo appears cut off or distorted in the downloaded image:
   - Try using a square or portrait-oriented photo
   - Make sure the image isn't too large (under 5MB is recommended)
   - If the bottom part of your photo is missing, try a different browser for downloading

## ID Card Download Issues

If you're having trouble with the ID card download:

1. **JPG format**: The ID card is now downloaded as a JPG image file rather than a PDF for better compatibility.

2. **Image quality**: The downloaded image uses high resolution (4x scale) to ensure text is clearly readable.

3. **Font rendering issues**: If text appears blurry or incorrectly formatted in the downloaded image:
   - Try a different browser (Chrome often provides the best rendering)
   - Use shorter text inputs for fields like name and nationality
   - Avoid special characters if they're not displaying correctly

4. **Manual download**: If automatic downloading doesn't work:
   - The system will open the image in a new tab
   - Right-click on the displayed image and select "Save image as..."
   - Save it with a .jpg extension

5. **Browser compatibility**: 
   - Modern browsers (Chrome, Firefox, Edge) should have no issues downloading the image
   - Allow pop-ups from the site if your browser blocks the download
   - Try disabling extensions that might interfere with image generation

## Storage Limitations

Be aware of these storage considerations:

1. **Local storage**: Your information is stored in your browser's local storage, which is specific to the device and browser you're using.

2. **Clearing cache**: If you clear your browser cache, your saved information will be deleted.

3. **Privacy note**: Your data remains on your device and is not sent to our servers.

## Need More Help?

If you continue to experience issues, please refer to the main documentation files or contact the ClaudeNation support team. 
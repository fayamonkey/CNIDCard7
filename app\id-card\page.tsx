'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { checkImageExists } from '@/utils/helpers';
import { ID_CARD_CONFIG } from '@/config';

export default function IDCardDesigner() {
  const [selectedDesign, setSelectedDesign] = useState(1);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    nationality: '',
    idNumber: '',
    issueDate: new Date().toISOString().split('T')[0],
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().split('T')[0],
    photoUrl: '',
  });
  
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [designBackgroundUrls, setDesignBackgroundUrls] = useState([
    '/backgrounds/claudenation01light.jpg',
    '/backgrounds/claudenation02dark.jpg',
  ]);
  
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Check if background images exist, use fallbacks if needed
  useEffect(() => {
    const checkBackgrounds = async () => {
      const checkedUrls = await Promise.all(
        designBackgroundUrls.map(url => 
          checkImageExists(url, '/backgrounds/claudenation01light.jpg')
        )
      );
      setDesignBackgroundUrls(checkedUrls);
    };
    
    checkBackgrounds();
  }, []);
  
  // Generate ID number on client-side only to avoid hydration mismatch
  useEffect(() => {
    // Only set ID number if it's not already set (from localStorage or previous generation)
    if (!userData.idNumber) {
      setUserData(prev => ({
        ...prev,
        idNumber: 'CN' + Math.floor(10000000 + Math.random() * 90000000)
      }));
    }
  }, [userData.idNumber]);
  
  // Try to load saved user data from localStorage on component mount
  useEffect(() => {
    const savedUserData = localStorage.getItem('claudeNationUserData');
    if (savedUserData) {
      try {
        const parsedData = JSON.parse(savedUserData);
        setUserData(prevData => ({
          ...prevData,
          ...parsedData
        }));
        
        // If there's a saved photo URL, set it as the preview
        if (parsedData.photoUrl) {
          setPhotoPreview(parsedData.photoUrl);
        }
      } catch (e) {
        console.error('Error parsing saved user data:', e);
      }
    }
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('claudeNationUserData', JSON.stringify(userData));
  }, [userData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file (JPEG, PNG, etc.)');
        return;
      }
      
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const photoUrl = event.target.result as string;
          setPhotoPreview(photoUrl);
          
          // Also save the photo URL in userData
          setUserData(prev => ({
            ...prev,
            photoUrl: photoUrl
          }));
        }
      };
      
      reader.onerror = () => {
        alert('Error reading the image file. Please try another image.');
      };
      
      reader.readAsDataURL(file);
    }
  };

  const downloadIDCard = async () => {
    if (!cardRef.current) return;
    
    try {
      // Add a temporary class to the card for better rendering
      cardRef.current.classList.add('id-card-exporting');
      
      // Wait a moment to ensure styles are applied
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Preserve aspect ratio during export
      const originalWidth = cardRef.current.offsetWidth;
      const originalHeight = cardRef.current.offsetHeight;
      
      const canvas = await html2canvas(cardRef.current, {
        scale: 4, // Increased scale for even better quality
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        width: originalWidth,
        height: originalHeight,
        imageTimeout: 0, // Wait for all images to load
        onclone: (clonedDoc) => {
          const clonedCard = clonedDoc.querySelector('.id-card-exporting');
          if (clonedCard) {
            // Apply direct inline styles to the cloned elements for better export
            const textElements = clonedCard.querySelectorAll('p');
            textElements.forEach(element => {
              const el = element as HTMLElement;
              el.style.fontFamily = 'Arial, Helvetica, sans-serif';
              el.style.margin = '0';
              el.style.padding = '0';
              
              if (el.classList.contains('opacity-80')) {
                el.style.opacity = '0.9';
              } else {
                el.style.opacity = '1';
              }
              
              if (el.classList.contains('font-bold')) {
                el.style.fontWeight = '700';
              }
            });
            
            // Fix photo container aspect ratio
            const photoContainer = clonedCard.querySelector('.id-card-photo');
            if (photoContainer) {
              const photoEl = photoContainer as HTMLElement;
              photoEl.style.height = '5rem';
              photoEl.style.width = '4rem';
              photoEl.style.maxHeight = 'none';
              photoEl.style.maxWidth = 'none';
              photoEl.style.aspectRatio = '4/5';
              photoEl.style.objectFit = 'cover';
              photoEl.style.overflow = 'hidden';
              photoEl.style.marginLeft = 'auto';
              
              const photoImg = photoEl.querySelector('img');
              if (photoImg) {
                const img = photoImg as HTMLElement;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.objectPosition = 'center';
              }
            }
          }
        }
      });
      
      // Remove temporary class
      cardRef.current.classList.remove('id-card-exporting');
      
      // Create download link for JPG
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      try {
        // Try automatic download first
        const downloadLink = document.createElement('a');
        downloadLink.href = imgData;
        downloadLink.download = `ClaudeNation_ID_${userData.lastName || 'Citizen'}_${userData.firstName || ''}.jpg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        alert('Your ID card has been downloaded as a JPG image!');
      } catch (downloadError) {
        console.error('Automatic download failed, opening in new tab:', downloadError);
        
        // Fallback: Open image in new tab for manual saving
        const newTab = window.open();
        if (newTab) {
          newTab.document.write(`
            <html>
              <head>
                <title>ClaudeNation ID Card - Right-click to Save</title>
                <style>
                  body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    background-color: #f0f0f0;
                    font-family: Arial, sans-serif;
                  }
                  .container {
                    text-align: center;
                    max-width: 800px;
                  }
                  img {
                    max-width: 100%;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                    margin-top: 20px;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <h2 style="color: #333;">Your ClaudeNation ID Card</h2>
                  <p style="color: #666;">Right-click on the image and select "Save image as..." to download your ID card</p>
                  <img src="${imgData}" alt="ClaudeNation ID Card" />
                </div>
              </body>
            </html>
          `);
          newTab.document.close();
        } else {
          alert('Could not open the image in a new tab. Please check your browser settings and try again.');
        }
      }
    } catch (error) {
      console.error('Error generating ID card:', error);
      alert('There was an error generating your ID card. Please try again.');
    }
  };
  
  const emailIDCard = async () => {
    if (!cardRef.current) return;
    
    try {
      // Add a temporary class to the card for better rendering
      cardRef.current.classList.add('id-card-exporting');
      
      // Wait a moment to ensure styles are applied
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Preserve aspect ratio during export
      const originalWidth = cardRef.current.offsetWidth;
      const originalHeight = cardRef.current.offsetHeight;
      
      const canvas = await html2canvas(cardRef.current, {
        scale: 4, // Higher scale for better quality
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        width: originalWidth,
        height: originalHeight,
        imageTimeout: 0, // Wait for all images to load
        onclone: (clonedDoc) => {
          const clonedCard = clonedDoc.querySelector('.id-card-exporting');
          if (clonedCard) {
            // Apply direct inline styles to the cloned elements for better export
            const textElements = clonedCard.querySelectorAll('p');
            textElements.forEach(element => {
              const el = element as HTMLElement;
              el.style.fontFamily = 'Arial, Helvetica, sans-serif';
              el.style.margin = '0';
              el.style.padding = '0';
              
              if (el.classList.contains('opacity-80')) {
                el.style.opacity = '0.9';
              } else {
                el.style.opacity = '1';
              }
              
              if (el.classList.contains('font-bold')) {
                el.style.fontWeight = '700';
              }
            });
            
            // Fix photo container aspect ratio
            const photoContainer = clonedCard.querySelector('.id-card-photo');
            if (photoContainer) {
              const photoEl = photoContainer as HTMLElement;
              photoEl.style.height = '5rem';
              photoEl.style.width = '4rem';
              photoEl.style.maxHeight = 'none';
              photoEl.style.maxWidth = 'none';
              photoEl.style.aspectRatio = '4/5';
              photoEl.style.objectFit = 'cover';
              photoEl.style.overflow = 'hidden';
              photoEl.style.marginLeft = 'auto';
              
              const photoImg = photoEl.querySelector('img');
              if (photoImg) {
                const img = photoImg as HTMLElement;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.objectPosition = 'center';
              }
            }
          }
        }
      });
      
      // Remove temporary class
      cardRef.current.classList.remove('id-card-exporting');
      
      // In a real application, the JPG data would be sent to a server for emailing
      canvas.toDataURL('image/jpeg', 1.0);
      
      alert('In a real application, your ID card would be emailed to your registered email address as a JPG attachment.');
    } catch (error) {
      console.error('Error generating ID card for email:', error);
      alert('There was an error preparing your ID card for email. Please try again.');
    }
  };

  // Get the text color for the selected design
  const textColor = ID_CARD_CONFIG.designs[selectedDesign - 1]?.textColor || 'white';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-claude-light to-white">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-claude-dark">
            ClaudeNation ID Card Designer
          </h1>
          <p className="mt-2 text-gray-600">
            Customize your official digital identity for ClaudeNation
          </p>
        </div>
        
        <div className="mt-10 flex flex-col md:flex-row gap-8">
          {/* ID Card Preview */}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-claude-dark mb-4">Your ID Card</h2>
            <div 
              ref={cardRef}
              className="id-card mx-auto"
              style={{
                backgroundImage: `url(${designBackgroundUrls[selectedDesign - 1]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* The ID card content is placed in the lower two-thirds of the card */}
              <div className="id-card-content" style={{ color: textColor }}>
                {/* Minimal space for title area - just enough for the ClaudeNation text */}
                <div className="h-1/5"></div>
                
                {/* Expanded content area with personal information */}
                <div className="h-4/5 flex flex-col justify-start p-5">
                  <div className="flex justify-between">
                    {/* Left side information */}
                    <div className="w-3/5 pr-2 space-y-2">
                      <div>
                        <p className="opacity-80 text-xs font-sans">Full Name</p>
                        <p className="font-bold text-base font-sans">
                          {userData.firstName && userData.lastName 
                            ? `${userData.firstName} ${userData.lastName}` 
                            : 'Your Name'}
                        </p>
                      </div>
                      <div>
                        <p className="opacity-80 text-xs font-sans">Date of Birth</p>
                        <p className="font-bold text-base font-sans">
                          {userData.dateOfBirth 
                            ? new Date(userData.dateOfBirth).toLocaleDateString() 
                            : 'MM/DD/YYYY'}
                        </p>
                      </div>
                      <div>
                        <p className="opacity-80 text-xs font-sans">Nationality</p>
                        <p className="font-bold text-base font-sans">{userData.nationality || 'Your Nationality'}</p>
                      </div>
                    </div>
                    
                    {/* Right side information - larger photo */}
                    <div className="w-2/5 pl-2 flex flex-col space-y-2">
                      <div>
                        <p className="opacity-80 text-xs font-sans">ID Number</p>
                        <p className="font-bold text-base font-sans">{userData.idNumber || 'CN00000000'}</p>
                      </div>
                      <div className="id-card-photo bg-white rounded-md overflow-hidden ml-auto mt-1" style={{ height: '5rem', width: '4rem' }}>
                        {photoPreview ? (
                          <img 
                            src={photoPreview} 
                            alt="User Photo" 
                            className="h-full w-full object-cover" 
                            crossOrigin="anonymous"
                          />
                        ) : (
                          <span className="text-xs text-center text-gray-500 flex items-center justify-center h-full">
                            User Photo<br/>3:4 ratio
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Footer information */}
                  <div className="flex justify-between text-xs mt-auto pt-2 font-sans">
                    <div>
                      <p className="opacity-80">Issue Date</p>
                      <p className="font-bold">{new Date(userData.issueDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="opacity-80">Expiry Date</p>
                      <p className="font-bold">{new Date(userData.expiryDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Design Options and Personal Information */}
          <div className="flex-1">
            {/* Personal Information Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-claude-dark mb-4">Your Information</h2>
              <div className="space-y-3">
                <div>
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="form-input"
                    placeholder="Your first name"
                    value={userData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className="form-input"
                    placeholder="Your last name"
                    value={userData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    className="form-input"
                    value={userData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="nationality" className="form-label">Nationality</label>
                  <input
                    id="nationality"
                    name="nationality"
                    type="text"
                    className="form-input"
                    placeholder="Your nationality"
                    value={userData.nationality}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="photo" className="form-label">Upload Photo</label>
                  <input
                    id="photo"
                    name="photo"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-claude-primary file:text-white
                      hover:file:bg-claude-secondary"
                  />
                </div>
              </div>
            </div>

            {/* Design Selection Section */}
            <h2 className="text-xl font-bold text-claude-dark mb-4">Choose a Design</h2>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((designNumber) => (
                <div
                  key={designNumber}
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                    selectedDesign === designNumber ? 'border-claude-primary' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedDesign(designNumber)}
                >
                  <div 
                    className="bg-gray-200 aspect-video"
                    style={{
                      backgroundImage: `url(${designBackgroundUrls[designNumber - 1]})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="h-full flex items-center justify-center bg-black bg-opacity-20">
                      <span className="text-white font-medium">
                        {ID_CARD_CONFIG.designs[designNumber - 1]?.name || `Design ${designNumber}`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 space-y-4">
              <button 
                onClick={downloadIDCard}
                className="btn-primary w-full"
              >
                Download ID Card
              </button>
              
              <button 
                onClick={emailIDCard}
                className="btn-secondary w-full"
              >
                Email ID Card
              </button>
              
              <Link href="/" className="mt-4 block text-center text-sm text-claude-primary hover:text-claude-secondary">
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
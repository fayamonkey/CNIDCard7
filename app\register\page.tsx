'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    nationality: '',
    address: '',
    profileImage: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        profileImage: e.target.files[0],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would handle form submission to an API
    console.log('Form submitted:', formData);
    setStep(step + 1);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-claude-light to-white">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-claude-dark">
            {step === 1 ? 'Register for ClaudeNation' : 
             step === 2 ? 'Personal Information' : 
             step === 3 ? 'Complete Your Registration' : 
             'Registration Complete!'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {step < 4 ? `Step ${step} of 3` : 'Welcome to ClaudeNation!'}
          </p>
        </div>

        {step < 4 ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <div className="rounded-md shadow-sm space-y-4">
                  <div>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="form-input"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="form-input"
                      placeholder="********"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="form-input"
                      placeholder="********"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="rounded-md shadow-sm space-y-4">
                  <div>
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      className="form-input"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      className="form-input"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      required
                      className="form-input"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="nationality" className="form-label">Nationality</label>
                    <input
                      id="nationality"
                      name="nationality"
                      type="text"
                      autoComplete="country-name"
                      required
                      className="form-input"
                      placeholder="Country"
                      value={formData.nationality}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="rounded-md shadow-sm space-y-4">
                  <div>
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      autoComplete="street-address"
                      required
                      className="form-input"
                      placeholder="123 Main St, City, Country"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="profileImage" className="form-label">
                      Upload Photo for ID Card (3:4 ratio preferred)
                    </label>
                    <input
                      id="profileImage"
                      name="profileImage"
                      type="file"
                      accept="image/*"
                      required
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-claude-primary file:text-white
                        hover:file:bg-claude-secondary"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="btn-secondary"
                >
                  Back
                </button>
              )}
              
              <button
                type="submit"
                className="btn-primary ml-auto"
              >
                {step < 3 ? 'Next' : 'Complete Registration'}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-8 text-center">
            <div className="rounded-full bg-green-100 p-3 mx-auto w-16 h-16 flex items-center justify-center">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="mt-4 text-lg text-gray-700">
              Your registration is complete! You'll receive an email with your ClaudeNation ID card shortly.
            </p>
            <div className="mt-6">
              <Link href="/id-card" className="btn-primary">
                View Your ID Card
              </Link>
            </div>
          </div>
        )}

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already a citizen?{' '}
            <Link href="/login" className="font-medium text-claude-primary hover:text-claude-secondary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 
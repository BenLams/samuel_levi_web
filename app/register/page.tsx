'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  const [formData, setFormData] = useState({
    studentName: '',
    gender: '',
    dob: '',
    nationality: 'Ugandan',
    admissionClass: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    address: '',
    medicalConditions: '',
    emergencyContact: '',
    submissionStatus: '',
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.studentName ||
      !formData.gender ||
      !formData.dob ||
      !formData.admissionClass ||
      !formData.parentName ||
      !formData.parentPhone ||
      !formData.address
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('/api/submit-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          studentName: '',
          gender: '',
          dob: '',
          nationality: 'Ugandan',
          admissionClass: '',
          parentName: '',
          parentPhone: '',
          parentEmail: '',
          address: '',
          medicalConditions: '',
          emergencyContact: '',
          submissionStatus: '',
        });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        alert('Failed to submit registration. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please contact support.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Student Registration</h1>
        <p className="text-gray-600 mb-6 text-center">Please fill out the form below to register your child for Bugema Adventist Primary School.</p>
        {success && (
          <p className="text-green-600 text-center mb-4">Registration submitted successfully! We will contact you soon.</p>
        )}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          {/* Student Information */}
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Student Information</h2>
          <div>
            <label htmlFor="studentName" className="block text-gray-700">Full Name *</label>
            <input
              id="studentName"
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              placeholder="Enter full name"
              title="Full Name"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="gender" className="block text-gray-700">Gender *</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
                aria-label="Gender"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label htmlFor="dob" className="block text-gray-700">Date of Birth *</label>
              <input
                id="dob"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
                title="Date of Birth"
                placeholder="Select date of birth"
              />
            </div>
          </div>
          <div>
            <label htmlFor="nationality" className="block text-gray-700">Nationality</label>
            <input
              id="nationality"
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              title="Nationality"
              placeholder="Enter nationality"
            />
          </div>
          <div>
            <label htmlFor="admissionClass" className="block text-gray-700">Admission Class/Grade *</label>
            <select
              id="admissionClass"
              name="admissionClass"
              value={formData.admissionClass}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              aria-label="Admission Class or Grade"
            >
              <option value="">Select Class</option>
              <option value="P1">Primary 1</option>
              <option value="P2">Primary 2</option>
              <option value="P3">Primary 3</option>
              <option value="P4">Primary 4</option>
              <option value="P5">Primary 5</option>
              <option value="P6">Primary 6</option>
              <option value="P7">Primary 7</option>
            </select>
          </div>

          {/* Parent/Guardian Information */}
          <h2 className="text-xl font-semibold text-blue-600 mb-4 mt-6">Parent/Guardian Information</h2>
          <div>
            <label htmlFor="parentName" className="block text-gray-700">Full Name *</label>
            <input
              id="parentName"
              type="text"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              title="Parent or Guardian Full Name"
              placeholder="Enter parent or guardian full name"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="parentPhone" className="block text-gray-700">Phone Number *</label>
              <input
                id="parentPhone"
                type="tel"
                name="parentPhone"
                value={formData.parentPhone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
                title="Parent or Guardian Phone Number"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label htmlFor="parentEmail" className="block text-gray-700">Email</label>
              <input
                id="parentEmail"
                type="email"
                name="parentEmail"
                value={formData.parentEmail}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                title="Parent or Guardian Email"
                placeholder="Enter email address"
              />
            </div>
          </div>
          <div>
            <label htmlFor="address" className="block text-gray-700">Address *</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={3}
              required
              title="Address"
              placeholder="Enter address"
            />
          </div>

          {/* Medical Information */}
          <h2 className="text-xl font-semibold text-blue-600 mb-4 mt-6">Medical Information</h2>
          <div>
            <label htmlFor="medicalConditions" className="block text-gray-700">Medical Conditions (if any)</label>
            <textarea
              id="medicalConditions"
              name="medicalConditions"
              value={formData.medicalConditions}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={3}
              title="Medical Conditions"
              placeholder="List any medical conditions (optional)"
            />
          </div>
          <div>
            <label htmlFor="emergencyContact" className="block text-gray-700">Emergency Contact</label>
            <input
              id="emergencyContact"
              type="tel"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              title="Emergency Contact"
              placeholder="Enter emergency contact number"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300 mt-6"
          >
            Submit Application
          </button>
          <p className="text-center mt-4">
            <Link href="/" className="text-blue-600 hover:underline">Back to Home</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
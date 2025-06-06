import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setError('');
    setSuccess('');

    if (selectedFile) {
      const isValidType = ['image/png', 'image/jpeg', 'image/jpg'].includes(selectedFile.type);
      const isValidSize = selectedFile.size <= 512 * 1024;

      if (!isValidType) {
        setError('Only PNG, JPG, or JPEG files are allowed.');
        return;
      }

      if (!isValidSize) {
        setError('File size must be less than 512KB.');
        return;
      }

      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a valid photo.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Prepare FormData
      const formData = new FormData();
      formData.append('profile', file);

      // Get token and gr_number from localStorage
      const token = localStorage.getItem('token');
      const gr_number = localStorage.getItem('gr_number'); // Optional: backend extracts this from token

      // Call upload API
      const response = await fetch('https://placement-portal-backend.ramshekade20.workers.dev/api/student/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Send token for auth middleware
          // Don't set Content-Type here; browser sets it automatically for FormData
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || data.message || 'Upload failed. Please try again.');
      } else {
        setSuccess('✅ Profile picture uploaded successfully!');
        console.log('Upload response:', data);
        // Optionally clear file & preview
        setFile(null);
        setPreview(null);
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">Upload Profile Photo *</div>

      <div className="profile-preview-box">
        {preview ? (
          <img src={preview} alt="Preview" className="preview-image" />
        ) : (
          <span className="preview-placeholder">No Photo Selected</span>
        )}
      </div>

      <input type="file" accept=".jpg,.jpeg,.png" onChange={handleChange} id="fileInput" hidden />

      <label htmlFor="fileInput" className="upload-button">Choose Photo</label>

      {error && <p className="error-message">{error}</p>}
      {success && <p style={{ color: 'green', marginBottom: '1rem' }}>{success}</p>}

      <p className="note-text">
        Upload a photo with a plain background. Max size: <strong>512KB</strong>
      </p>
      <p className="note-text red">
        Accepted formats: <strong>.png</strong>, <strong>.jpg</strong>, <strong>.jpeg</strong>
      </p>

      <button onClick={handleUpload} disabled={!file || loading} className={`submit-btn ${!file ? 'disabled' : ''}`}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default Profile;

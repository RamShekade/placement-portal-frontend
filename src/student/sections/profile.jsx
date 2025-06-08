import React, { useEffect, useState } from 'react';

const Profile = ({ data, setData }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (data?.profilePicture) {
      setPreview(data.profilePicture);
    }
  }, [data]);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setError('');

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

      const objectUrl = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setPreview(objectUrl);

      // Pass the actual file to the parent, so it can be sent in the form
      setData(prev => ({ ...prev, profile_photo: selectedFile }));
    }
  };

  const handleUpload = () => {
    if (file) {
      alert('Photo uploaded successfully.');
      console.log('Uploaded file:', file);
      // Note: actual upload to backend/cloud storage can be done here
    } else {
      alert('Please select a valid photo.');
    }
  };

  return (
    <div style={{
      background: '#fff',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      border: '1px solid #ccc',
      maxWidth: '600px',
      width: '100%',
      margin: '30px auto',
      textAlign: 'center',
      maxHeight: 'calc(100vh - 100px)',
      overflowY: 'auto'
    }}>
      <div style={{
        backgroundColor: '#1e1e3f',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px 8px 0 0',
        fontSize: '18px',
        marginBottom: '25px'
      }}>
        Upload Profile Photo *
      </div>

      <div style={{
        width: '280px',
        height: '220px',
        border: '3px dashed #1e3a8a',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        margin: '0 auto 15px auto',
        backgroundColor: '#f0f4ff',
      }}>
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span style={{ color: '#999', fontSize: '16px' }}>
            No Photo Selected
          </span>
        )}
      </div>

      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleChange}
        style={{ display: 'none' }}
        id="fileInput"
      />

      <label htmlFor="fileInput" style={{
        cursor: 'pointer',
        backgroundColor: '#1e3a8a',
        color: '#fff',
        padding: '10px 22px',
        borderRadius: '10px',
        fontWeight: 'bold',
        fontSize: '15px',
        marginBottom: '10px',
        display: 'inline-block',
      }}>
        Choose Photo 
      </label>

      {error && (
        <p style={{ color: 'red', marginTop: '8px', fontSize: '14px' }}>{error}</p>
      )}

      <p style={{ fontSize: '14px', color: '#444', marginTop: '6px' }}>
        Upload a photo with a plain background. Max size: <strong>512KB</strong>
      </p>
      <p style={{ fontSize: '14px', color: 'red', marginTop: '4px' }}>
        Accepted formats: <strong>.png</strong>, <strong>.jpg</strong>, <strong>.jpeg</strong>
      </p>

      <button
        onClick={handleUpload}
        disabled={!file}
        style={{
          cursor: file ? 'pointer' : 'not-allowed',
          backgroundColor: file ? '#1e3a8a' : '#888',
          color: '#fff',
          padding: '10px 32px',
          borderRadius: '10px',
          fontWeight: 'bold',
          fontSize: '15px',
          border: 'none',
          marginTop: '18px',
          transition: 'background-color 0.3s ease',
        }}
      >
        Upload
      </button>
    </div>
  );
};

export default Profile;

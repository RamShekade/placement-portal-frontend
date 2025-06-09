import React, { useEffect, useState } from 'react';

const ResumeUpload = ({ data, setData }) => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // If resume already exists in data, set it
    if (data?.resumeName) {
      setFilename(data.resumeName);
    }
  }, [data]);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setError('');

    if (selectedFile) {
      const isValidType = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ].includes(selectedFile.type);
      const isValidSize = selectedFile.size <= 1024 * 1024; // 1MB

      if (!isValidType) {
        setError('Only PDF, DOC, or DOCX files are allowed.');
        return;
      }

      if (!isValidSize) {
        setError('File size must be less than 1MB.');
        return;
      }

      setFile(selectedFile);
      setFilename(selectedFile.name);
      setData({ ...data, resume: selectedFile }); // update parent
    }
  };

  const handleUpload = () => {
    if (file) {
      alert('Resume uploaded successfully.');
      console.log('Uploaded file:', file);
      // Further upload to backend or storage can be done here
    } else {
      alert('Please select a valid resume.');
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
        Upload Resume *
      </div>

      <div style={{
        width: '280px',
        height: '150px',
        border: '3px dashed #1e3a8a',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto 15px auto',
        backgroundColor: '#f0f4ff',
        padding: '10px',
        fontSize: '15px',
        color: '#000'
      }}>
        {filename ? (
          <span>{filename}</span>
        ) : (
          <span style={{ color: '#999' }}>No Resume Selected</span>
        )}
      </div>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleChange}
        style={{ display: 'none' }}
        id="resumeInput"
      />

      <label htmlFor="resumeInput" style={{
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
        Choose Resume
      </label>

      {error && (
        <p style={{ color: 'red', marginTop: '8px', fontSize: '14px' }}>{error}</p>
      )}

      <p style={{ fontSize: '14px', color: '#444', marginTop: '6px' }}>
        Upload your resume. Max size: <strong>1MB</strong>
      </p>
      <p style={{ fontSize: '14px', color: 'red', marginTop: '4px' }}>
        Accepted formats: <strong>.pdf</strong>, <strong>.doc</strong>, <strong>.docx</strong>
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

export default ResumeUpload;

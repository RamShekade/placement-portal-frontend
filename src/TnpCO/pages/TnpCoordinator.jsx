import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import CollegeHeader from '../../shared/CollegeHeader';
import StatusMessage from '../components/StatusMessage';
import './TnpCoordinator.css';

const TnpCoordinator = () => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  // Company details state
  const [companyDetails, setCompanyDetails] = useState({
    companyName: '',
    companyEmail: ''
  });
  const [companyError, setCompanyError] = useState('');
  const [companySuccess, setCompanySuccess] = useState('');
  const [sendingMail, setSendingMail] = useState(false);

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    setError('');
    
    if (!selectedFile) return;

    const isExcel = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
      'application/vnd.ms-excel'
    ].includes(selectedFile.type);

    if (!isExcel) {
      setError('Only Excel files (.xls, .xlsx) are allowed.');
      setFile(null);
      return;
    }

    console.log('📁 File selected:', selectedFile.name);
    setFile(selectedFile);
    
    const reader = new FileReader();

    reader.onload = (event) => {
      console.log('📄 File read successfully');
      try {
        const workbook = XLSX.read(event.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        console.log('📊 Sheet name:', sheetName);
        
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        console.log(`📋 Parsed ${jsonData.length} rows from Excel:`, {
          firstRow: jsonData[0],
          lastRow: jsonData[jsonData.length - 1]
        });
        
        setData(jsonData);
      } catch (error) {
        console.error('❌ Excel parsing error:', error);
        setError('Error parsing Excel file. Please check the format.');
        setFile(null);
      }
    };

    reader.onerror = (error) => {
      console.error('❌ File reading error:', error);
      setError('Error reading file. Please try again.');
      setFile(null);
    };

    reader.readAsBinaryString(selectedFile);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleUpload = async () => {
    if (!data.length) {
      setError('Please select an Excel file before uploading.');
      return;
    }

    try {
      setLoading(true);
      setUploadSuccess(null);
      setError('');
      const batchSize = 10;
      let index = 0;
      let overallResult = [];

      console.log(`🚀 Starting upload of ${data.length} records in batches of ${batchSize}`);
      console.time('Total Upload Time');

      while (index < data.length) {
        const batch = data.slice(index, index + batchSize);
        const batchNumber = Math.floor(index / batchSize) + 1;
        const totalBatches = Math.ceil(data.length / batchSize);

        console.log(`📦 Processing batch ${batchNumber}/${totalBatches}:`, {
          startIndex: index,
          endIndex: index + batch.length - 1,
          records: batch
        });

        console.time(`Batch ${batchNumber} Request`);
        try {
          const response = await fetch('https://placement-portal-backend.placementportal.workers.dev/api/dummydata', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(batch),
          });

          const responseData = await response.json();

          if (!response.ok) {
            console.error(`❌ Batch ${batchNumber} failed:`, {
              status: response.status,
              statusText: response.statusText,
              response: responseData
            });
            throw new Error(`Batch ${batchNumber} failed: ${JSON.stringify(responseData)}`);
          }

          console.log(`✅ Batch ${batchNumber} success:`, {
            status: response.status,
            response: responseData
          });

          overallResult.push({
            batch: batchNumber,
            result: responseData
          });

        } catch (error) {
          console.error(`❌ Batch ${batchNumber} error:`, error);
          throw error;
        } finally {
          console.timeEnd(`Batch ${batchNumber} Request`);
        }

        index += batchSize;

        if (index < data.length) {
          console.log(`⏳ Waiting 1s before next batch...`);
          await delay(1500);
        }
      }

      console.timeEnd('Total Upload Time');
      console.log('🎉 Upload completed:', {
        totalBatches: overallResult.length,
        results: overallResult
      });

      const successMessage = `✅ All batches uploaded successfully!\n\nResults:\n${
        overallResult.map(({batch, result}) => 
          `Batch ${batch}: ${result.message || 'OK'}`
        ).join('\n')
      }`;

      setUploadSuccess(successMessage);
      setFile(null);
      setData([]);

    } catch (err) {
      console.error('❌ Upload failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Company details handlers
  const handleCompanyInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails(prev => ({
      ...prev,
      [name]: value
    }));
    setCompanyError('');
    setCompanySuccess('');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendMail = async () => {
    setCompanyError('');
    setCompanySuccess('');

    // Validation
    if (!companyDetails.companyName.trim()) {
      setCompanyError('Company name is required.');
      return;
    }

    if (!companyDetails.companyEmail.trim()) {
      setCompanyError('Company email is required.');
      return;
    }

    if (!validateEmail(companyDetails.companyEmail)) {
      setCompanyError('Please enter a valid email address.');
      return;
    }

    try {
      setSendingMail(true);
      
      const mailPayload = {
        company_name: companyDetails.companyName.trim(),
        email: companyDetails.companyEmail.trim()
      };

      console.log('📧 Sending mail with payload:', mailPayload);

      const response = await fetch('https://placement-portal-backend.placementportal.workers.dev/api/list-company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mailPayload)
      });

      const responseData = await response.json();
      console.log('📧 Mail response:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || `Failed to send mail: ${response.status}`);
      }

      setCompanySuccess(`✅ Invitation email sent successfully to ${companyDetails.companyEmail}`);
      
      // Clear form after successful send
      setCompanyDetails({
        companyName: '',
        companyEmail: ''
      });

    } catch (error) {
      console.error('❌ Mail sending failed:', error);
      setCompanyError(`Failed to send email: ${error.message}`);
    } finally {
      setSendingMail(false);
    }
  };

  return (
    <div className="tnp-container">
      <CollegeHeader />
      
      {/* Company Invitation Section */}
      <div className="upload-section">
        <h2 className="header">Company Invitation Portal</h2>
        
        <div className="company-form">
          <div className="form-group">
            <label htmlFor="companyName" className="form-label">
              🏢 Company Name
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              placeholder="Enter company name"
              value={companyDetails.companyName}
              onChange={handleCompanyInputChange}
              className="form-input"
              disabled={sendingMail}
            />
          </div>

          <div className="form-group">
            <label htmlFor="companyEmail" className="form-label">
              📧 Company Email
            </label>
            <input
              id="companyEmail"
              name="companyEmail"
              type="email"
              placeholder="Enter company email address"
              value={companyDetails.companyEmail}
              onChange={handleCompanyInputChange}
              className="form-input"
              disabled={sendingMail}
            />
          </div>

          {companyError && <p className="error-msg">{companyError}</p>}
          {companySuccess && <p className="success-msg-text">{companySuccess}</p>}

          <button
            onClick={handleSendMail}
            disabled={sendingMail || !companyDetails.companyName.trim() || !companyDetails.companyEmail.trim()}
            className={`send-mail-btn ${(sendingMail || !companyDetails.companyName.trim() || !companyDetails.companyEmail.trim()) ? 'disabled' : ''}`}
          >
            {sendingMail ? '📧 Sending...' : '📧 Send Invitation'}
          </button>
        </div>
      </div>

      {/* Student Data Upload Section */}
      <div className="upload-section">
        <h2 className="header">Student Data Upload Portal</h2>

        <div className={`file-box ${loading ? 'loading' : ''}`}>
          {loading ? (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <p>Processing... Please keep this tab open.</p>
            </div>
          ) : file ? (
            <div className="file-info">
              <p className="file-name">{file.name}</p>
              <p className="file-size">
                Records to process: {data.length || 'Calculating...'}
              </p>
            </div>
          ) : (
            <p className="file-name placeholder">
              Drag & drop your Excel file here or click "Choose File"
            </p>
          )}
        </div>

        {error && <p className="error-msg">{error}</p>}
        {uploadSuccess && (
          <div className="success-msg">
            <pre>{uploadSuccess}</pre>
          </div>
        )}

        <input
          id="fileInput"
          type="file"
          accept=".xls,.xlsx"
          onChange={handleFile}
          onClick={(e) => e.target.value = null}
          style={{ display: 'none' }}
        />

        <div className="button-group">
          <label htmlFor="fileInput" className="choose-file-btn">
            Choose File
          </label>

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className={`upload-btn ${(!file || loading) ? 'disabled' : ''}`}
          >
            {loading ? '⏳ Processing...' : '📤 Upload & Send Mail'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TnpCoordinator;
// Home.jsx
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

export default function Home() {
  const [data, setData] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [emailStatus, setEmailStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  const handleUpload = async () => {
    if (!data.length) {
      alert('Please upload and parse a file first!');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('https://placement-portal-backend.ramshekade20.workers.dev/api/dummydata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setUploadSuccess(result.message);
    } catch (err) {
      setUploadSuccess(`❌ Error uploading: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmails = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://placement-portal-backend.ramshekade20.workers.dev/api/send-creds-batch', {
        method: 'POST',
      });

      const result = await response.json();
      setEmailStatus(`✅ Sent: ${result.message}\n❌ Failed: ${result.failed.length}`);
      console.log(result.failed); // view failed ones in console
    } catch (err) {
      setEmailStatus(`❌ Error sending emails: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>📤 Upload Students Excel</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFile} />
      <br /><br />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload to DB'}
      </button>
      {uploadSuccess && <p>{uploadSuccess}</p>}

      <hr />

      <h3>📧 Send Login Credentials to All Students</h3>
      <button onClick={handleSendEmails} disabled={loading}>
        {loading ? 'Sending...' : 'Send Emails'}
      </button>
      {emailStatus && <pre>{emailStatus}</pre>}
    </div>
  );
}

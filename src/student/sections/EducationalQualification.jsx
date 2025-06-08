import React, { useState } from 'react';

const EducationalQualification = () => {
  const [form, setForm] = useState({
    tenthPercent: '', tenthYear: '',
    twelfthPercent: '', twelfthYear: '',
    diplomaPercent: '', diplomaYear: '',
    fySem1: '', fySem2: '',
    sySem3: '', sySem4: '',
    tySem5: '', tySem6: '',
    finalSem7: '', finalSem8: '',
    liveKT: ''  // ✅ added liveKT field
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const has12th = form.twelfthPercent || form.twelfthYear;
    const hasDiploma = form.diplomaPercent || form.diplomaYear;

    if (!has12th && !hasDiploma) {
      alert('Please fill either 12th or Diploma details.');
      return;
    }

    alert('Educational Qualification submitted successfully.');
    console.log('Form Data:', form);
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    color: '#000',
    fontSize: '14px',
    width: '100%'
  };

  const sectionHeaderStyle = {
    gridColumn: '1 / -1',
    margin: '10px 0 5px',
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#1e1e3f'
  };

  const noteStyle = {
    backgroundColor: '#e7f3ff',
    color: '#003366',
    padding: '10px 15px',
    borderRadius: '6px',
    fontSize: '14px',
    marginBottom: '20px',
    border: '1px solid #b3d8ff'
  };

  return (
    <div style={{
      background: '#fff',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      border: '1px solid #ccc'
    }}>
      <div style={{
        backgroundColor: '#1e1e3f',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px 8px 0 0',
        fontSize: '18px',
        marginBottom: '25px'
      }}>
        Educational Qualification
      </div>

      <div style={noteStyle}>
        <strong>⚠️ Note:</strong> If marks are not available, type <strong>"NA"</strong>.
      </div>

      <form onSubmit={handleSubmit} style={{
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))'
      }}>
        {/* 10th */}
        <div style={sectionHeaderStyle}>10th Details</div>
        <input name="tenthPercent" placeholder="10th Percentage" value={form.tenthPercent} onChange={handleChange} style={inputStyle} required />
        <input name="tenthYear" placeholder="Year of Passing" value={form.tenthYear} onChange={handleChange} style={inputStyle} required />
        <input type="file" accept=".pdf,.jpg,.png" style={inputStyle} />

        {/* 12th */}
        <div style={sectionHeaderStyle}>12th Details</div>
        <input name="twelfthPercent" placeholder="12th Percentage" value={form.twelfthPercent} onChange={handleChange} style={inputStyle} />
        <input name="twelfthYear" placeholder="Year of Passing" value={form.twelfthYear} onChange={handleChange} style={inputStyle} />
        <input type="file" accept=".pdf,.jpg,.png" style={inputStyle} />

        {/* Diploma */}
        <div style={sectionHeaderStyle}>Diploma Details</div>
        <input name="diplomaPercent" placeholder="Diploma Percentage" value={form.diplomaPercent} onChange={handleChange} style={inputStyle} />
        <input name="diplomaYear" placeholder="Year of Passing" value={form.diplomaYear} onChange={handleChange} style={inputStyle} />
        <input type="file" accept=".pdf,.jpg,.png" style={inputStyle} />

        {/* First Year */}
        <div style={sectionHeaderStyle}>First Year</div>
        <input name="fySem1" placeholder="Sem 1 CGPA" value={form.fySem1} onChange={handleChange} style={inputStyle} required />
        <input name="fySem2" placeholder="Sem 2 CGPA" value={form.fySem2} onChange={handleChange} style={inputStyle} required />

        {/* Second Year */}
        <div style={sectionHeaderStyle}>Second Year</div>
        <input name="sySem3" placeholder="Sem 3 CGPA" value={form.sySem3} onChange={handleChange} style={inputStyle} required />
        <input name="sySem4" placeholder="Sem 4 CGPA" value={form.sySem4} onChange={handleChange} style={inputStyle} required />

      

        {/* Third Year */}
        <div style={sectionHeaderStyle}>Third Year</div>
        <input name="tySem5" placeholder="Sem 5 CGPA" value={form.tySem5} onChange={handleChange} style={inputStyle} required />
        <input name="tySem6" placeholder="Sem 6 CGPA" value={form.tySem6} onChange={handleChange} style={inputStyle} required />

        {/* Fourth Year */}
        <div style={sectionHeaderStyle}>Fourth Year</div>
        <input name="finalSem7" placeholder="Sem 7 CGPA" value={form.finalSem7} onChange={handleChange} style={inputStyle} required />
        <input name="finalSem8" placeholder="Sem 8 CGPA" value={form.finalSem8} onChange={handleChange} style={inputStyle} required />


  {/* ✅ Live KT Field */}
<div style={{ gridColumn: '1 / -1' }}>
  <label style={{
    display: 'block',
    margin: '5px 0 12px',
    fontWeight: '600',
    color: '#1e1e3f',
    fontSize: '16px'
  }}>
    Do you have any Live KT?
  </label>

  <label style={{
    marginRight: '30px',
    fontSize: '15px',
    color: '#1e1e3f',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px'
  }}>
    <input
      type="radio"
      name="liveKT"
      value="Yes"
      checked={form.liveKT === 'Yes'}
      onChange={handleChange}
      style={{
        appearance: 'none',
        width: '20px',
        height: '20px',
        border: '2px solid #ccc',
        borderRadius: '50%',
        backgroundColor: '#fff',
        cursor: 'pointer',
        boxShadow: form.liveKT === 'Yes' ? 'inset 0 0 0 6px #1e1e3f' : 'none',
        transition: 'box-shadow 0.2s ease'
      }}
    />
    Yes
  </label>

  <label style={{
    fontSize: '15px',
    color: '#1e1e3f',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px'
  }}>
    <input
      type="radio"
      name="liveKT"
      value="No"
      checked={form.liveKT === 'No'}
      onChange={handleChange}
      style={{
        appearance: 'none',
        width: '20px',
        height: '20px',
        border: '2px solid #ccc',
        borderRadius: '50%',
        backgroundColor: '#fff',
        cursor: 'pointer',
        boxShadow: form.liveKT === 'No' ? 'inset 0 0 0 6px #1e1e3f' : 'none',
        transition: 'box-shadow 0.2s ease'
      }}
    />
    No
  </label>
</div>




        {/* Submit */}
        <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
          <button type="submit" style={{
            padding: '12px 30px',
            backgroundColor: '#1e1e3f',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold'
          }}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EducationalQualification;

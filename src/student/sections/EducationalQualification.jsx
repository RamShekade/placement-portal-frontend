import React, { useState } from 'react';

const EducationalQualification = () => {
  const [form, setForm] = useState({
    tenthPercent: '', tenthYear: '',
    twelfthPercent: '', twelfthYear: '',
    diplomaPercent: '', diplomaYear: '',
    fySem1: '', fySem2: '',
    sySem3: '', sySem4: '',
    tySem5: '', tySem6: '',
    finalSem7: '', finalSem8: ''
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

      <form onSubmit={handleSubmit} style={{
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))'
      }}>
        {/* 10th */}
        <div style={sectionHeaderStyle}>10th Details</div>
        <input name="tenthPercent" placeholder="10th Percentage" value={form.tenthPercent} onChange={handleChange} style={inputStyle} />
        <input name="tenthYear" placeholder="Year of Passing" value={form.tenthYear} onChange={handleChange} style={inputStyle} />

        {/* 12th */}
        <div style={sectionHeaderStyle}>12th Details</div>
        <input name="twelfthPercent" placeholder="12th Percentage" value={form.twelfthPercent} onChange={handleChange} style={inputStyle} />
        <input name="twelfthYear" placeholder="Year of Passing" value={form.twelfthYear} onChange={handleChange} style={inputStyle} />

        {/* OR Divider */}
        <div style={{
          gridColumn: '1 / -1',
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#555',
          fontSize: '16px'
        }}>
          
        </div>

        {/* Diploma */}
        <div style={sectionHeaderStyle}>Diploma Details (optional)</div>
        <input name="diplomaPercent" placeholder="Diploma Percentage" value={form.diplomaPercent} onChange={handleChange} style={inputStyle} />
        <input name="diplomaYear" placeholder="Year of Passing" value={form.diplomaYear} onChange={handleChange} style={inputStyle} />

        {/* First Year */}
        <div style={sectionHeaderStyle}>First Year</div>
        <input name="fySem1" placeholder="Sem 1 CGPA" value={form.fySem1} onChange={handleChange} style={inputStyle} />
        <input name="fySem2" placeholder="Sem 2 CGPA" value={form.fySem2} onChange={handleChange} style={inputStyle} />

        {/* Second Year */}
        <div style={sectionHeaderStyle}>Second Year</div>
        <input name="sySem3" placeholder="Sem 3 CGPA" value={form.sySem3} onChange={handleChange} style={inputStyle} />
        <input name="sySem4" placeholder="Sem 4 CGPA" value={form.sySem4} onChange={handleChange} style={inputStyle} />

        {/* Third Year */}
        <div style={sectionHeaderStyle}>Third Year</div>
        <input name="tySem5" placeholder="Sem 5 CGPA" value={form.tySem5} onChange={handleChange} style={inputStyle} />
        <input name="tySem6" placeholder="Sem 6 CGPA" value={form.tySem6} onChange={handleChange} style={inputStyle} />

        {/* Fourth Year */}
        <div style={sectionHeaderStyle}>Fourth Year</div>
        <input name="finalSem7" placeholder="Sem 7 CGPA" value={form.finalSem7} onChange={handleChange} style={inputStyle} />
        <input name="finalSem8" placeholder="Sem 8 CGPA" value={form.finalSem8} onChange={handleChange} style={inputStyle} />

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

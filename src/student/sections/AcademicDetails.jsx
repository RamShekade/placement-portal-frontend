import React from 'react';

const AcademicDetails = ({ data, setData }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'student_id') {
      if (/^\d{0,12}$/.test(value)) {
        setData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Academic details submitted successfully.');
    console.log('Form Data:', data);
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1.5px solid #ccc',
    backgroundColor: '#fff',
    color: '#000',
    boxSizing: 'border-box',
    fontWeight: '500',
  };

  const yearOptions = [];
  for (let year = 2020; year <= 2030; year++) {
    yearOptions.push(<option key={year} value={year}>{year}</option>);
  }

  const departmentOptions = [
    'Humanities and Science',
    'Information Technology',
    'Civil Engineering',
    'Civil & Infrastructure Engineering',
    'Mechanical Engineering',
    'Computer Engineering',
    'Artificial Intelligence and Data Science Engineering',
    'Electronics and Telecommunication Engineering (Formerly Electronic Engineering)',
    'Chemical Engineering'
  ];

  return (
    <div style={{
      background: '#fff',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      border: '1px solid #ccc',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    }}>
      <div style={{
        backgroundColor: '#1e1e3f',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px 8px 0 0',
        fontSize: '18px',
        marginBottom: '25px',
        fontWeight: '600',
        userSelect: 'none',
      }}>
        Academic Details
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'grid',
          gap: '20px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        }}
      >
        <input
          name="student_id"
          placeholder="Student ID *"
          value={data.student_id || ''}
          onChange={handleChange}
          required
          maxLength="12"
          pattern="\d{12}"
          style={inputStyle}
        />

        <input
          name="current_year"
          placeholder="Current Year *"
          value={data.current_year || ''}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <select
          name="year_of_admission"
          value={data.year_of_admission || ''}
          onChange={handleChange}
          required
          style={{ ...inputStyle, color: data.year_of_admission ? '#000' : '#666' }}
        >
          <option value="">Admission Year *</option>
          {yearOptions}
        </select>

        <select
          name="expected_graduation_year"
          value={data.expected_graduation_year || ''}
          onChange={handleChange}
          required
          style={{ ...inputStyle, color: data.expected_graduation_year ? '#000' : '#666' }}
        >
          <option value="">Passing Year *</option>
          {yearOptions}
        </select>

        <select
          name="department"
          value={data.department || ''}
          onChange={handleChange}
          required
          style={{ ...inputStyle, color: data.department ? '#000' : '#666' }}
        >
          <option value="">Select Department *</option>
          {departmentOptions.map((dept, index) => (
            <option key={index} value={dept}>{dept}</option>
          ))}
        </select>

        <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
          <button
            type="submit"
            style={{
              padding: '12px 30px',
              backgroundColor: '#1e1e3f',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: '0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1e1e3f')}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AcademicDetails;

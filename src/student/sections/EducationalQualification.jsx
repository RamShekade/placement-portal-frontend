// import React from 'react';

// const EducationalQualification = ({ data, setData }) => {
//   const handleChange = (e) => {
//     const { name, value } = e.target;aa

//     if (
//       name.includes("Percent") &&
//       value !== "NA" &&
//       value !== "" &&
//       !/^\d{0,3}(\.\d{0,2})?$/.test(value)
//     ) {
//       return; // allow only valid numeric percentage
//     }

//     if (
//       name === "cgpa" &&
//       value !== "" &&
//       !/^\d{0,1}(\.\d{0,2})?$/.test(value)
//     ) {
//       return; // allow CGPA like 8.5, 9.25
//     }

//     setData({ ...data, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const has12th = data.hsce_percentage || data.hsc_year;
//     const hasDiploma = data.diploma_percentage || data.diploma_year;

//     if (!has12th && !hasDiploma) {
//       alert('Please fill either 12th or Diploma details.');
//       return;
//     }

//     alert('Educational Qualification submitted successfully.');
//     console.log('Data:', data);
//   };

//   const handleFileChange = (e, field) => {
//   const selectedFile = e.target.files[0];

//   if (!selectedFile) return;

//   const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
//   const isValidType = validTypes.includes(selectedFile.type);
//   const isValidSize = selectedFile.size <= 1024 * 1024; // Max 1MB (change as per your limit)

//   if (!isValidType) {
//     alert('Invalid file type. Only PDF, JPG, JPEG, PNG allowed.');
//     return;
//   }

//   if (!isValidSize) {
//     alert('File too large. Max size allowed is 1MB.');
//     return;
//   }

//   setData(prev => ({ ...prev, [field]: selectedFile }));
// };


//   const inputStyle = {
//     padding: '10px',
//     borderRadius: '6px',
//     border: '1px solid #ccc',
//     backgroundColor: '#fff',
//     color: '#000',
//     fontSize: '14px',
//     width: '100%',
//   };

//   const sectionHeaderStyle = {
//     gridColumn: '1 / -1',
//     margin: '10px 0 5px',
//     fontWeight: 'bold',
//     fontSize: '16px',
//     color: '#1e1e3f',
//   };

//   const noteStyle = {
//     backgroundColor: '#e7f3ff',
//     color: '#003366',
//     padding: '10px 15px',
//     borderRadius: '6px',
//     fontSize: '14px',
//     marginBottom: '20px',
//     border: '1px solid #b3d8ff',
//   };

//   const semOptions = Array.from({ length: 8 }, (_, i) => `Sem ${i + 1}`);

//   return (
//     <div style={{
//       background: '#fff',
//       padding: '30px',
//       borderRadius: '12px',
//       boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
//       border: '1px solid #ccc',
//     }}>
//       <div style={{
//         backgroundColor: '#1e1e3f',
//         color: 'white',
//         padding: '12px 20px',
//         borderRadius: '8px 8px 0 0',
//         fontSize: '18px',
//         marginBottom: '25px',
//       }}>
//         Educational Qualification
//       </div>

//       <div style={noteStyle}>
//         <strong>⚠️ Note:</strong> If marks are not available, type <strong>"NA"</strong>.
//       </div>

//       <form onSubmit={handleSubmit} style={{
//         display: 'grid',
//         gap: '20px',
//         gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
//       }}>
//         {/* 10th */}
//         <div style={sectionHeaderStyle}>10th Details</div>
//         <input name="ssc_percentage" placeholder="10th Percentage (eg - 87)" value={data.tenthPercent} onChange={handleChange} style={inputStyle} required />
//         <input name="ssc_year" placeholder="Year of Passing (eg - 2020)" value={data.tenthYear} onChange={handleChange} style={inputStyle} required />
//         <input type="file" accept=".pdf,.jpg,.png" style={inputStyle} onChange={(e) => handleFileChange(e, 'ssc_marksheet')} />

//         {/* 12th */}
//         <div style={sectionHeaderStyle}>12th Details</div>
//         <input name="hsc_percentage" placeholder="12th Percentage (eg - 67)" value={data.twelfthPercent} onCfhange={handleChange} style={inputStyle} />
//         <input name="hsc_year" placeholder="Year of Passing (eg - 2024)" value={data.twelfthYear} onChange={handleChange} style={inputStyle} />
//         <input type="file" accept=".pdf,.jpg,.png" style={inputStyle} onChange={(e) => handleFileChange(e, 'hsc_marksheet')} />

//         {/* Diploma */}
//         <div style={sectionHeaderStyle}>Diploma Details</div>
//         <input name="diploma_percentage" placeholder="Diploma Percentage" value={data.diplomaPercent} onChange={handleChange} style={inputStyle} />
//         <input name="diploma_year" placeholder="Year of Passing" value={data.diplomaYear} onChange={handleChange} style={inputStyle} />
//         <input type="file" accept=".pdf,.jpg,.png" style={inputStyle} onChange={(e) => handleFileChange(e, 'diploma_marksheet')}/>

//         {/* Last Passed Semester */}
//         <div style={sectionHeaderStyle}>Last Passed Semester</div>
//         <select name="last_semester" value={data.lastSemester || ''} onChange={handleChange} style={inputStyle} required>
//           <option value="">Select Semester</option>
//           {semOptions.map((sem, idx) => (
//             <option key={idx} value={sem}>{sem}</option>
//           ))}
//         </select>

//         <input
//           name="cgpa"
//           placeholder="Enter CGPA (eg - 8.98)"
//           value={data.cgpa || ''}
//           onChange={handleChange}
//           style={inputStyle}
//           required
//         />

//         {/* Live KT */}
//         <div style={{ gridColumn: '1 / -1' }}>
//           <label style={{
//             display: 'block',
//             margin: '5px 0 12px',
//             fontWeight: '600',
//             color: '#1e1e3f',
//             fontSize: '16px',
//           }}>
//             Do you have any Live KT?
//           </label>

//           <label style={{
//             marginRight: '30px',
//             fontSize: '15px',
//             color: '#1e1e3f',
//             display: 'inline-flex',
//             alignItems: 'center',
//             gap: '8px',
//           }}>
//             <input
//               type="radio"
//               name="liveKT"
//               value="Yes"
//               checked={data.liveKT === 'Yes'}
//               onChange={handleChange}
//               style={{
//                 appearance: 'none',
//                 width: '20px',
//                 height: '20px',
//                 border: '2px solid #ccc',
//                 borderRadius: '50%',
//                 backgroundColor: '#fff',
//                 cursor: 'pointer',
//                 boxShadow: data.liveKT === 'Yes' ? 'inset 0 0 0 6px #1e1e3f' : 'none',
//               }}
//             />
//             Yes
//           </label>

//           <label style={{
//             fontSize: '15px',
//             color: '#1e1e3f',
//             display: 'inline-flex',
//             alignItems: 'center',
//             gap: '8px',
//           }}>
//             <input
//               type="radio"
//               name="liveKT"
//               value="No"
//               checked={data.liveKT === 'No'}
//               onChange={handleChange}
//               style={{
//                 appearance: 'none',
//                 width: '20px',
//                 height: '20px',
//                 border: '2px solid #ccc',
//                 borderRadius: '50%',
//                 backgroundColor: '#fff',
//                 cursor: 'pointer',
//                 boxShadow: data.liveKT === 'No' ? 'inset 0 0 0 6px #1e1e3f' : 'none',
//               }}
//             />
//             No
//           </label>
//         </div>

//         {/* Submit */}
//         <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
//           <button type="submit" style={{
//             padding: '12px 30px',
//             backgroundColor: '#1e1e3f',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '6px',
//             fontWeight: 'bold',
//           }}>
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EducationalQualification;




import React from 'react';

const EducationalQualification = ({ data, setData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name.includes("Percent") &&
      value !== "NA" &&
      value !== "" &&
      !/^\d{0,3}(\.\d{0,2})?$/.test(value)
    ) {
      return; // allow only valid numeric percentage
    }

    if (
      name === "cgpa" &&
      value !== "" &&
      !/^\d{0,1}(\.\d{0,2})?$/.test(value)
    ) {
      return; // allow CGPA like 8.5, 9.25
    }

    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const has12th = data.twelfthPercent || data.twelfthYear;
    const hasDiploma = data.diplomaPercent || data.diplomaYear;

    if (!has12th && !hasDiploma) {
      alert('Please fill either 12th or Diploma details.');
      return;
    }

    alert('Educational Qualification submitted successfully.');
    console.log('Data:', data);
  };

  const handleFileChange = (e, field) => {
  const selectedFile = e.target.files[0];

  if (!selectedFile) return;

  const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
  const isValidType = validTypes.includes(selectedFile.type);
  const isValidSize = selectedFile.size <= 1024 * 1024; // Max 1MB (change as per your limit)

  if (!isValidType) {
    alert('Invalid file type. Only PDF, JPG, JPEG, PNG allowed.');
    return;
  }

  if (!isValidSize) {
    alert('File too large. Max size allowed is 1MB.');
    return;
  }

  setData(prev => ({ ...prev, [field]: selectedFile }));
};

  const inputStyle = {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    color: '#000',
    fontSize: '14px',
    width: '100%',
  };

  const sectionHeaderStyle = {
    gridColumn: '1 / -1',
    margin: '10px 0 5px',
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#1e1e3f',
  };

  const noteStyle = {
    backgroundColor: '#e7f3ff',
    color: '#003366',
    padding: '10px 15px',
    borderRadius: '6px',
    fontSize: '14px',
    marginBottom: '20px',
    border: '1px solid #b3d8ff',
  };

  const semOptions = Array.from({ length: 8 }, (_, i) => `Sem ${i + 1}`);

  return (
    <div style={{
      background: '#fff',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      border: '1px solid #ccc',
    }}>
      <div style={{
        backgroundColor: '#1e1e3f',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px 8px 0 0',
        fontSize: '18px',
        marginBottom: '25px',
      }}>
        Educational Qualification
      </div>

      <div style={noteStyle}>
        <strong>⚠️ Note:</strong> If marks are not available, type <strong>"NA"</strong>.
      </div>

      <form onSubmit={handleSubmit} style={{
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      }}>
                 {/* 10th */}
         <div style={sectionHeaderStyle}>10th Details</div>
         <input name="ssc_percentage" placeholder="10th Percentage (eg - 87)" value={data.tenthPercent} onChange={handleChange} style={inputStyle} required />
         <input name="ssc_year" placeholder="Year of Passing (eg - 2020)" value={data.tenthYear} onChange={handleChange} style={inputStyle} required />
         <input type="file" accept=".pdf,.jpg,.png" style={inputStyle} onChange={(e) => handleFileChange(e, 'ssc_marksheet')} />

         {/* 12th */}
         <div style={sectionHeaderStyle}>12th Details</div>
         <input name="hsc_percentage" placeholder="12th Percentage (eg - 67)" value={data.twelfthPercent} onCfhange={handleChange} style={inputStyle} />
         <input name="hsc_year" placeholder="Year of Passing (eg - 2024)" value={data.twelfthYear} onChange={handleChange} style={inputStyle} />
         <input type="file" accept=".pdf,.jpg,.png" style={inputStyle} onChange={(e) => handleFileChange(e, 'hsc_marksheet')} />

         {/* Diploma */}
         <div style={sectionHeaderStyle}>Diploma Details</div>
           <input name="diploma_percentage" placeholder="Diploma Percentage" value={data.diplomaPercent} onChange={handleChange} style={inputStyle} />         <input name="diploma_year" placeholder="Year of Passing" value={data.diplomaYear} onChange={handleChange} style={inputStyle} />
         <input type="file" accept=".pdf,.jpg,.png" style={inputStyle} onChange={(e) => handleFileChange(e, 'diploma_marksheet')}/>

        {/* Last Passed Semester */}
        <div style={sectionHeaderStyle}>Last Passed Semester</div>
        <select name="last_semester" value={data.last_semester || ''} onChange={handleChange} style={inputStyle} required>
          <option value="">Select Semester</option>
          {semOptions.map((sem, idx) => (
            <option key={idx} value={sem}>{sem}</option>
          ))}
        </select>

        <input
          name="cgpa"
          placeholder="Enter CGPA (eg - 8.98)"
          value={data.cgpa || ''}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        {/* Live KT */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{
            display: 'block',
            margin: '5px 0 12px',
            fontWeight: '600',
            color: '#1e1e3f',
            fontSize: '16px',
          }}>
            Do you have any Live KT?
          </label>

          <label style={{
            marginRight: '30px',
            fontSize: '15px',
            color: '#1e1e3f',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <input
              type="radio"
              name="liveKT"
              value="Yes"
              checked={data.liveKT === 'Yes'}
              onChange={handleChange}
              style={{
                appearance: 'none',
                width: '20px',
                height: '20px',
                border: '2px solid #ccc',
                borderRadius: '50%',
                backgroundColor: '#fff',
                cursor: 'pointer',
                boxShadow: data.liveKT === 'Yes' ? 'inset 0 0 0 6px #1e1e3f' : 'none',
              }}
            />
            Yes
          </label>

          <label style={{
            fontSize: '15px',
            color: '#1e1e3f',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <input
              type="radio"
              name="liveKT"
              value="No"
              checked={data.liveKT === 'No'}
              onChange={handleChange}
              style={{
                appearance: 'none',
                width: '20px',
                height: '20px',
                border: '2px solid #ccc',
                borderRadius: '50%',
                backgroundColor: '#fff',
                cursor: 'pointer',
                boxShadow: data.liveKT === 'No' ? 'inset 0 0 0 6px #1e1e3f' : 'none',
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
            fontWeight: 'bold',
          }}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EducationalQualification;

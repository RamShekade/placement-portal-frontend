import React, { useState } from 'react';

const Achievements = ({data, setData}) => {
  const [achievements, setAchievements] = useState([
    { title: '', description: '', media: '' }
  ]);

  const handleChange = (index, e) => {
  const { name, value } = e.target;
  const updated = [...achievements];
  updated[index][name] = value;
  setAchievements(updated);
  setData(prev => ({ ...prev, achievements: updated })); // ✅ update parent state
};

  const handleAdd = () => {
    if (achievements.length < 5) {
      setAchievements([...achievements, { title: '', description: '', media: '' }]);
    }
  };

  const handleSubmit = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Token not found. Please log in.');
    return;
  }

  const formData = new FormData();

  // Append text fields from `data`
  formData.append('first_name', data.first_name);
  formData.append('middle_name', data.middle_name);
  formData.append('last_name', data.last_name);
  formData.append('gender', data.gender);
  formData.append('date_of_birth', data.date_of_birth);
  formData.append('contact_number_primary', data.contact_number_primary);
  formData.append('contact_number_alternate', data.contact_number_alternate);
  formData.append('email', data.email);
  formData.append('aadhaar_number', data.aadhaar_number);
  formData.append('pan_number', data.pan_number);
  formData.append('student_id_number', data.student_id_number);
  formData.append('current_year', data.current_year);
  formData.append('department', data.department);
  formData.append('year_of_admission', data.year_of_admission);
  formData.append('expected_graduation_year', data.expected_graduation_year);

  // Academic Percentages
  formData.append('ssc_percentage', data.ssc_percentage);
  formData.append('ssc_year', data.ssc_year);
  formData.append('hsc_percentage', data.hsc_percentage);
  formData.append('hsc_year', data.hsc_year);
  formData.append('diploma_percentage', data.diploma_percentage);
  formData.append('diploma_year', data.diploma_year);

  // Semester CGPAs

    formData.append('cgpa', data['cgpa']);
    formData.append('last_semester',data.last_semester)
  

  // JSON fields
  formData.append('programming_languages', JSON.stringify(data.programming_languages || []));
  formData.append('soft_skills', JSON.stringify(data.soft_skills || []));
  formData.append('certifications', JSON.stringify(data.certifications || []));
  formData.append('projects', JSON.stringify(data.projects || []));
  formData.append('achievements', JSON.stringify(data.achievements || []));
  formData.append('internships', JSON.stringify(data.internships || []));

  // File fields (ensure they are File objects from input[type="file"])
  if (data.profile_photo instanceof File) {
    formData.append('profile_photo', data.profile_photo);
  }

  // similarly for resume, marksheets etc. if they are File objects
  if (data.resume instanceof File) {
    formData.append('resume', data.resume);
  }
  if (data.ssc_marksheet instanceof File) {
    formData.append('ssc_marksheet', data.ssc_marksheet);
  }
  if (data.hsc_marksheet instanceof File) {
    formData.append('hsc_marksheet', data.hsc_marksheet);
  }
  if (data.diploma_marksheet instanceof File) {
    formData.append('diploma_marksheet', data.diploma_marksheet);
  }
for (let pair of formData.entries()) {
  console.log(`${pair[0]}:`, pair[1]);
}



  try {
    const res = await fetch('https://placement-portal-backend.ramshekade20.workers.dev/api/student/profile/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // ✅ token from localStorage
        // Do NOT manually set content-type when using FormData
      },
      body: formData,
    });

    const result = await res.json();

    if (res.ok) {
      alert('✅ Profile created successfully!');
      console.log(result);
    } else {
      alert('❌ Failed: ' + result?.error || 'Something went wrong');
      console.error(result);
    }
  } catch (error) {
    console.error('❌ Error:', error);
    alert('❌ Error occurred during profile submission.');
  }
};
  return (
    <div style={{
      background: '#fff',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      border: '1px solid #ccc',
      maxWidth: '700px',
      width: '100%',
      margin: '30px auto',
      maxHeight: 'calc(100vh - 100px)',
      overflowY: 'auto'
    }}>
      <div style={{
        backgroundColor: '#1e1e3f',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px 8px 0 0',
        fontSize: '18px',
        marginBottom: '25px',
        textAlign: 'center'
      }}>
        Achievements & Extra Curricular Activities
      </div>

      {achievements.map((item, index) => (
        <div key={index} style={{
          marginBottom: '25px',
          paddingBottom: '20px',
          borderBottom: index !== achievements.length - 1 ? '1px solid #eee' : 'none'
        }}>
          <h4 style={{
            color: '#1e3a8a',
            fontSize: '17px',
            marginBottom: '15px'
          }}>
            Achievement {index + 1}
          </h4>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontWeight: 'bold', color: '#000' }}>Title *</label><br />
            <input
              type="text"
              name="title"
              value={item.title}
              onChange={(e) => handleChange(index, e)}
              placeholder="e.g., Hackathon Winner"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                marginTop: '6px',
                backgroundColor: '#fff',
                color: '#000'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontWeight: 'bold', color: '#000' }}>Description *</label><br />
            <textarea
              name="description"
              value={item.description}
              onChange={(e) => handleChange(index, e)}
              rows={3}
              placeholder="Explain what you achieved..."
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                marginTop: '6px',
                backgroundColor: '#fff',
                color: '#000',
                resize: 'vertical'
              }}
              required
            ></textarea>
          </div>

          <div>
            <label style={{ fontWeight: 'bold', color: '#000' }}>Media URL (optional)</label><br />
            <input
              type="url"
              name="media"
              value={item.media}
              onChange={(e) => handleChange(index, e)}
              placeholder="e.g., https://youtu.be/example"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                marginTop: '6px',
                backgroundColor: '#fff',
                color: '#000'
              }}
            />
          </div>
        </div>
      ))}

      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <button
          onClick={handleAdd}
          disabled={data.achievements.length >= 5}
          style={{
            backgroundColor: data.achievements.length < 5 ? '#1e3a8a' : '#aaa',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '10px',
            border: 'none',
            fontWeight: 'bold',
            fontSize: '15px',
            marginRight: '12px',
            cursor: data.achievements.length < 5 ? 'pointer' : 'not-allowed'
          }}
        >
          Add Achievement
        </button>

        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: '#22c55e',
            color: 'white',
            padding: '10px 22px',
            borderRadius: '10px',
            border: 'none',
            fontWeight: 'bold',
            fontSize: '15px',
            cursor: 'pointer'
          }}
        >
          Save All
        </button>
      </div>
    </div>
  );
};

export default Achievements;
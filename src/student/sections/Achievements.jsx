import React, { useState } from 'react';

const Achievements = () => {
  const [achievements, setAchievements] = useState([
    { title: '', description: '', media: '' }
  ]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...achievements];
    updated[index][name] = value;
    setAchievements(updated);
  };

  const handleAdd = () => {
    if (achievements.length < 5) {
      setAchievements([...achievements, { title: '', description: '', media: '' }]);
    }
  };

  const handleSave = () => {
    console.log('Achievements saved:', achievements);
    alert('Achievements saved successfully!');
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
          disabled={achievements.length >= 5}
          style={{
            backgroundColor: achievements.length < 5 ? '#1e3a8a' : '#aaa',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '10px',
            border: 'none',
            fontWeight: 'bold',
            fontSize: '15px',
            marginRight: '12px',
            cursor: achievements.length < 5 ? 'pointer' : 'not-allowed'
          }}
        >
          Add Achievement
        </button>

        <button
          onClick={handleSave}
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

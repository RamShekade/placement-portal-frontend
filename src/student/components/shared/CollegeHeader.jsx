import React from 'react';
import dmceLogo from '../../../assets/images/dmce.png';

const CollegeHeader = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center', // centers the content horizontally
      alignItems: 'center',
      backgroundColor: '#1e1e3f',
      color: 'white',
      padding: '10px 20px'
    }}>
      <img src={dmceLogo} alt="DMCE Logo" style={{ width: '50px', marginRight: '15px' }} />
      <div>
        <div style={{ fontSize: '14px', opacity: 0.8,}}>Nagar Yuvak Shikshan Sanstha, Airoli</div>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Datta Meghe College Of Engineering</div>
      </div>
    </div>
  );
};

export default CollegeHeader;

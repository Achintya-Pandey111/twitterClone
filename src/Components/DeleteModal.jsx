import React from 'react';

const DeleteModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(2px)'
    }}>
      <div style={{
        backgroundColor: '#000',
        padding: '20px',
        borderRadius: '16px',
        width: '300px',
        border: '1px solid #333'
      }}>
        <h3 style={{ marginTop: 0 }}>Delete post?</h3>
        <p style={{ color: '#71767b', fontSize: '15px' }}>This can’t be undone and it will be removed from your profile and the timeline.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button 
            onClick={onConfirm}
            style={{ backgroundColor: '#f4212e', color: 'white', border: 'none', padding: '12px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Delete
          </button>
          <button 
            onClick={onCancel}
            style={{ backgroundColor: 'transparent', color: 'white', border: '1px solid #333', padding: '12px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

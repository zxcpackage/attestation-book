import React from 'react';

function ErrorMessage({ message, type = 'error' }) {
    const styles = {
        error: {
            color: '#721c24',
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c6cb',
            borderRadius: '4px',
            padding: '12px',
            margin: '10px 0',
            fontSize: '14px'
        },
        success: {
            color: '#155724',
            backgroundColor: '#d4edda',
            border: '1px solid #c3e6cb',
            borderRadius: '4px',
            padding: '12px',
            margin: '10px 0',
            fontSize: '14px'
        },
        warning: {
            color: '#856404',
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeeba',
            borderRadius: '4px',
            padding: '12px',
            margin: '10px 0',
            fontSize: '14px'
        }
    };

    if (!message) return null;

    return (
        <div style={styles[type]}>
            {message}
        </div>
    );
}

export default ErrorMessage;
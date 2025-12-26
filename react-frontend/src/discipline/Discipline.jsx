import React from 'react';


function Discipline(props) {
    const style = props.style ? props.style : {color: "blue"};
    
    return (
        <div 
            id={props.id} 
            style={{
                ...style,
                margin: '10px 0',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                backgroundColor: '#f9f9f9'
            }}
        >
            <div style={{fontWeight: 'bold', fontSize: '18px'}}>
                {props.content}
            </div>
            {props.children && (
                <div style={{marginTop: '5px', fontSize: '14px', color: '#666'}}>
                    {props.children}
                </div>
            )}
        </div>
    );
}

export default Discipline;
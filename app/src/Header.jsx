import React from "react";

export default function Header() {
    return (
        <header style={{
            backgroundColor: 'black',
            width: '100%',
            margin: 0,
            padding: '20px 0',
            maxHeight: '10%'
        }}>
            <h1 style={{
                color: 'white',
                paddingLeft: '20px',
            }}>
            <strong>STL Emergency Funds ROI Dashboard</strong>
            </h1>
        </header>
    );
}
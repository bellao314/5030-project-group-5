import React from "react";

export default function Header() {
    return (
        <header style={{
            backgroundColor: 'black',
            width: '100%',
            margin: 0,
            padding: '20px 0',
        }}>
            <h1 style={{
                color: 'white',
                paddingLeft: '20px',
                margin: 0
            }}>
            STL Emergency ROI Dashboard
            </h1>
        </header>
    );
}
import React from 'react';
import './page.css';

const Background: React.FC = () => {
  return (
    <div className="context h-screen w-full fixed top-0 left-0 z-[-1]">
      <div className="area h-full w-full">
        <ul className="circles">
          {Array.from({ length: 10 }).map((_, index) => (
            <li key={index}></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Background;

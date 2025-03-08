import React from 'react';
import './background.css';

const Background: React.FC = () => {
  return (
    <div className="context">
      <div className="area">
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

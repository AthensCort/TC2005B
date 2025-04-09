import React from "react";
import styles from "./page.module.css";

const Background: React.FC = () => {
  return (
    <div className={`${styles.context} h-screen w-full fixed top-0 left-0 z-[-1]`}>
      <div className={`${styles.area} h-full w-full`}>
        <ul className={`${styles.circles}`}>
          {Array.from({ length: 10 }).map((_, index) => (
            <li key={index}></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Background;

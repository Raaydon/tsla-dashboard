import React from "react";
import './styles.css';
import Clock from '../../components/clock/Clock';

const Dashboard = () => {
  return (
    <div>
      <Clock />
      <div className="elipse"></div>
    </div>
  );
}

export default Dashboard
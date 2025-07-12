import React from "react";
import { useState, useEffect } from "react";
import "../css/appointment .css";
import { useNavigate } from "react-router-dom";
const AppointmentPage = () => {
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    time: '',
  });

  const [username, setUsername] = useState("User");
  const navigate =useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("patient"));
    if (user && user.name) {
      setUsername(user.name);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      name: username,
      doctor: formData.doctor,
      date: formData.date,
      time: formData.time,
    };

    try {
      const res = await fetch("http://localhost:5000/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      const result = await res.json();
      alert(result.message || "Appointment scheduled!");  
      navigate('/')
    } catch (err) {
      alert("Failed to schedule appointment");
      console.error(err);
    }
  };


  return (
    <div className="appointment-container">
      <div className="glass-box">
        <div className="appointment-left">
          <h2 style={{ marginBottom: "20px" }}>Welcome, {username}</h2>
          <h3 style={{ marginBottom: "15px" }}>Book an Appointment</h3>

          <form className="appointment-form" onSubmit={handleSubmit}>
            <label>Doctor</label>
            <select name="doctor" value={formData.doctor} onChange={handleChange} required>
              <option value="">Select Doctor</option>
              <option value="Dr. Sharma">🩺 Dr. Sharma</option>
              <option value="Dr. Gupta">🩺 Dr. Gupta</option>
              <option value="Dr. Bose">🩺 Dr. Bose</option>
              <option value="Dr. Fernandes">🩺 Dr. Fernandes</option>
            </select>

            <div className="form-row">
              <div>
                <label>Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
              </div>
              <div>
                <label>Time</label>
                <input type="time" name="time" value={formData.time} onChange={handleChange} required />
              </div>
            </div>

            <button type="submit">Schedule Appointment</button>
          </form>
        </div>

        <div className="appointment-right">
          <img
            src="https://images.unsplash.com/photo-1734094546615-045bf5f7ea0e?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hospital"
          />
        </div>
      </div>
    </div>
  );

};

export default AppointmentPage;
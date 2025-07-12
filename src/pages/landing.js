import React, { useState } from 'react';
import "../css/landing.css";
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [pass,setpass]=useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      phone: `${countryCode}${phone}`,
    };

    try {
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      alert(result.message);

      localStorage.setItem("patient", JSON.stringify(formData));
      navigate("/details");

    } catch (error) {
      alert("Failed to submit");
      console.error(error);
    }
  };

  return (
    <div className="landing-wrapper">
      <div className="left-section plain-form">
        <h1 className="title">Hi there 👋</h1>
        <h className="title-det"> Get started with your details</h>
        <form className="form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>pass</label>
          <input
            type="Password"
            placeholder="Enter your password"
        
            value={pass}
            onChange={(e) => setpass(e.target.value)}
            required
          />

          <label>Phone Number</label>
          <div className="phone-input">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+61">+61</option>
              <option value="+81">+81</option>
            </select>
            <input
              type="tel"
              placeholder="1234567890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-submit">Submit</button>
        </form>
        <a href="/admin" className="btn-login" style={{color:'White'}}>Admin</a>
      </div>

      <div className="right-section">
        <img
          src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hospital"
        />
      </div>
    </div>
  );
};

export default LandingPage;

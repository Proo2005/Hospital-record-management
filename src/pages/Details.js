import React, { useState, useEffect } from "react";
import "../css/Details.css";
import { useNavigate } from 'react-router-dom';

const DetailsPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    occupation: "",
    emergencyName: "",
    emergencyContact: "",
    physician: "",
    insuranceProvider: "",
    insuranceNumber: "",
    allergies: "",
    medications: "",
    familyHistory: "",
    pastHistory: "",
    idNumber: ""
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("patient"));
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/medical_details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      alert(result.message || "Details submitted!");

      // navigate to appointment page
      navigate("/appointment");
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };

  return (
    <div className="details-page">
      {/* Left - Image */}
      <div className="details-image">
        <img
          src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=2071&auto=format&fit=crop"
          alt="Hospital"
        />
      </div>

      {/* Right - Form */}
      <div className="details-form-section">
        <h1 style={{ color: "white", fontSize: "48px", marginTop: "100px" }}>Hi there 👋</h1>
        <form onSubmit={handleSubmit}>
          <h3 style={{ color: "white" }}>Personal Information</h3>

          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange}  required  />

          <div className="form-row">
            <div>
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{width: "300px"}}/>
            </div>
            <div>
              <label>Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={{width: "300px"}}/>
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Date of Birth</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} required style={{width: "300px"}}/>
            </div>
            <div className="gender-radio">
              <label>Gender</label>
              <div className="radio-group">
                <label><input type="radio" name="gender" value="Male" onChange={handleChange} /> Male</label>
                <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
                <label><input type="radio" name="gender" value="Other" onChange={handleChange} /> Other</label>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} style={{width: "500px"  }}/>
            </div>
            <div>
              <label className="l">Occupation</label>
              <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} style={{width: "500px"}}/>
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Emergency Contact Name</label>
              <input type="text" name="emergencyName" value={formData.emergencyName} onChange={handleChange} style={{width: "300px"}}/>
            </div>
            <div>
              <label>Emergency Contact Number</label>
              <input type="tel" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} style={{width: "300px"}}/>
            </div>
          </div>

          <h1 style={{ color: "white", fontSize: "48px", marginTop: "100px" }}>Medical Information</h1>

          <label>Primary Care Physician</label>
          <input type="text" name="physician" value={formData.physician} onChange={handleChange} style={{width: "300px"}}/>

          <div className="form-row">
            <div>
              <label>Insurance Provider</label>
              <input type="text" name="insuranceProvider" value={formData.insuranceProvider} onChange={handleChange} style={{width: "300px"}}/>
            </div>
            <div>
              <label>Insurance Policy Number</label>
              <input type="text" name="insuranceNumber" value={formData.insuranceNumber} onChange={handleChange} style={{width: "300px"}}/>
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Allergies (if any)</label>
              <input type="text" name="allergies" value={formData.allergies} onChange={handleChange} style={{width: "500px", height: "80px"}}/>
            </div>
            <div>
              <label>Current Medications</label>
              <input type="text" name="medications" value={formData.medications} onChange={handleChange} style={{width: "500px", height: "80px"}}/>
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Family Medical History</label>
              <input type="text" name="familyHistory" value={formData.familyHistory} onChange={handleChange} style={{width: "500px", height: "80px"}}/>
            </div>
            <div>
              <label>Past Medical History</label>
              <input type="text" name="pastHistory" value={formData.pastHistory} onChange={handleChange} style={{width: "500px", height: "80px"}}/>
            </div>
          </div>

          <h1 style={{ color: "white", fontSize: "48px", marginTop: "100px" }}>Identification Verification</h1>
          <label >Identification Number</label>
          <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default DetailsPage;

import React, { useEffect, useState } from "react";
import "../css/admin.css";

const AdminPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [selected, setSelected] = useState(null);
  const [otp, setOtp] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [verified, setVerified] = useState(false);

  const username = "Admin";

  useEffect(() => {
    // Load appointment data
    fetch("http://localhost:5000/appointment")
      .then((res) => res.json())
      .then((data) => {
        const updated = data.map((item, i) => ({
          ...item,
          status: item.status || "pending",
          srNo: i + 1,
          action: item.status || "pending",
        }));
        setAppointments(updated);
      });
  }, [verified]);

  const handleStatusClick = (appt) => {
    setSelected(appt);
  };

  const handleSendOtp = () => {
    setShowOtpBox(true);
    // Simulate OTP sending logic here
    alert(`OTP sent to ${selected.phone}`);
  };

  const handleVerifyOtp = () => {
    if (otp === "1234") {
      setAppointments((prev) =>
        prev.map((item) =>
          item.srNo === selected.srNo
            ? { ...item, status: "scheduled", action: "scheduled" }
            : item
        )
      );
      setVerified(true);
      setShowOtpBox(false);
      setSelected(null);
      setOtp("");
    } else {
      alert("Invalid OTP");
    }
  };

  const handleCancel = () => {
    setAppointments((prev) =>
      prev.map((item) =>
        item.srNo === selected.srNo
          ? { ...item, status: "cancelled", action: "cancelled" }
          : item
      )
    );
    setSelected(null);
  };

  const scheduledCount = appointments.filter((a) => a.status === "scheduled").length;
  const cancelledCount = appointments.filter((a) => a.status === "cancelled").length;
  const pendingCount = appointments.filter((a) => a.status === "pending").length;

  return (
    <div className="admin-container">
      <h2 className="admin-header">Welcome, {username}</h2>

      <div className="card-box">
        <div className="card scheduled">Scheduled: {scheduledCount}</div>
        <div className="card cancelled">Cancelled: {cancelledCount}</div>
        <div className="card pending">Pending: {pendingCount}</div>
      </div>

      <table className="appointment-table">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Status</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.srNo}>
              <td>{a.srNo}</td>
              <td>
                <button className={`status-btn ${a.status}`} onClick={() => handleStatusClick(a)}>
                  {a.status}
                </button>
              </td>
              <td>{a.doctor}</td>
              <td>{a.date}</td>
              <td>{a.time}</td>
              <td>{a.action}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div className="popup-box">
          <h3>Appointment Details</h3>
          <p>Name: {selected.name}</p>
          <p>Phone: {selected.phone}</p>
          <p>Doctor: {selected.doctor}</p>
          <p>Date: {selected.date}</p>
          <p>Time: {selected.time}</p>
          <button onClick={handleSendOtp}>Schedule</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}

      {showOtpBox && (
        <div className="otp-box">
          <h4>Enter OTP sent to {selected?.phone}</h4>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOtp}>Verify & Schedule</button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;

import React from 'react';
import { useHealthStats } from './useHealthStats';
import './HealthStats.css';

const HealthStats = () => {
    const {
        filteredStats,
        filter,
        form,
        handleDelete,
        handleInputChange,
        handleSubmit,
        setFilter,
    } = useHealthStats();

    return (
        <div className="content-box">
            <h2>Health Stats</h2>
            <div className="health-stats-container">
                <form onSubmit={handleSubmit} className="stat-form">
                    <input name="patientID" value={form.patientID} onChange={handleInputChange} placeholder="Patient ID" required />
                    <input name="heartRate" value={form.heartRate} onChange={handleInputChange} placeholder="Heart Rate" required />
                    <input name="bloodPressure" value={form.bloodPressure} onChange={handleInputChange} placeholder="Blood Pressure" required />
                    <input name="temperature" value={form.temperature} onChange={handleInputChange} placeholder="Temperature" required />
                    <button type="submit">Add Stat</button>
                </form>
                <input
                    type="text"
                    placeholder="Filter by Patient ID"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="filter-input"
                />
                {filteredStats.map(stat => (
                    <div key={stat.statID} className="stat-card">
                        <h3>Stat ID: {stat.statID}</h3>
                        <p><strong>Patient ID:</strong> {stat.patientID}</p>
                        <p><strong>Date:</strong> {new Date(stat.date).toLocaleDateString()}</p>
                        <p><strong>Heart Rate:</strong> {stat.heartRate}</p>
                        <p><strong>Blood Pressure:</strong> {stat.bloodPressure}</p>
                        <p><strong>Temperature:</strong> {stat.temperature}</p>
                        <button onClick={() => handleDelete(stat.statID)} className="delete-btn">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HealthStats;

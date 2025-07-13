
import React, { useState, useEffect, useCallback } from 'react';
import './HealthStats.css';

const HealthStats = () => {
    const [healthStats, setHealthStats] = useState([]);
    const [filteredStats, setFilteredStats] = useState([]);
    const [filter, setFilter] = useState('');
    const [form, setForm] = useState({ patientID: '', heartRate: '', bloodPressure: '', temperature: '' });

    const fetchHealthStats = useCallback(() => {
        fetch('/api/healthstats')
            .then(response => response.json())
            .then(data => {
                setHealthStats(data);
                setFilteredStats(data);
            })
            .catch(error => console.error('Error fetching health stats:', error));
    }, []);

    useEffect(() => {
        fetchHealthStats();
    }, [fetchHealthStats]);

    useEffect(() => {
        setFilteredStats(
            healthStats.filter(stat =>
                stat.patientID.toString().includes(filter)
            )
        );
    }, [filter, healthStats]);

    const handleDelete = (id) => {
        fetch(`/api/healthstats/${id}`, { method: 'DELETE' })
            .then(() => fetchHealthStats())
            .catch(error => console.error('Error deleting health stat:', error));
    };

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/healthstats', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...form, date: new Date() }),
        })
            .then(() => {
                fetchHealthStats();
                setForm({ patientID: '', heartRate: '', bloodPressure: '', temperature: '' });
            })
            .catch(error => console.error('Error creating health stat:', error));
    };

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

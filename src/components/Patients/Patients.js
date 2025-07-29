
import React, { useState, useEffect } from 'react';
import './Patients.css';

const Patients = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
                fetch('https://ctrlapiapp.azurewebsites.net/api/patient')
            .then(response => response.json())
            .then(data => setPatients(data))
            .catch(error => console.error('Error fetching patients:', error));
    }, []);

    return (
        <div className="content-box">
            <h2>Patients</h2>
            <ul className="patients-list">
                {patients.map(patient => (
                    <li key={patient.patientID} className="patient-item">
                        <div><strong>Name:</strong> {patient.FullName}</div>
                        <div><strong>DOB:</strong> {new Date(patient.DateOfBirth).toLocaleDateString()}</div>
                        <div><strong>Gender:</strong> {patient.Gender}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Patients;

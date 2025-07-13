
import React, { useState, useEffect } from 'react';
import './Appointments.css';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetch('/api/appointment')
            .then(response => response.json())
            .then(data => setAppointments(data))
            .catch(error => console.error('Error fetching appointments:', error));
    }, []);

    return (
        <div className="content-box">
            <h2>Appointments</h2>
            <table className="appointments-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => (
                        <tr key={appointment.appointmentID}>
                            <td>{new Date(appointment.dateTime).toLocaleString()}</td>
                            <td>{appointment.reason}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Appointments;

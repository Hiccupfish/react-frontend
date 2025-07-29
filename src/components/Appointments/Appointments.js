
import React, { useState, useEffect, useMemo } from 'react';
import './Appointments.css';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [filterStatus, setFilterStatus] = useState('All');
    const [sortField, setSortField] = useState('dateTime');
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAppointment, setCurrentAppointment] = useState(null); // For editing

    const fetchAppointments = () => {
                fetch('https://ctrlapiapp.azurewebsites.net/api/appointment')
            .then(response => response.json())
            .then(data => setAppointments(data))
            .catch(error => console.error('Error fetching appointments:', error));
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const filteredAndSortedAppointments = useMemo(() => {
        let filtered = appointments;

        // Filter by status
        if (filterStatus !== 'All') {
            filtered = filtered.filter(appointment => appointment.status === filterStatus);
        }

        // Sort
        return filtered.sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (sortField === 'dateTime') {
                const dateA = new Date(aValue);
                const dateB = new Date(bValue);
                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            } else {
                if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            }
        });
    }, [appointments, filterStatus, sortField, sortOrder]);

    const handleSortChange = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const handleAddEditAppointment = (appointmentData) => {
        const method = appointmentData.appointmentID ? 'PUT' : 'POST';
                const url = appointmentData.appointmentID ? `https://ctrlapiapp.azurewebsites.net/api/appointment/${appointmentData.appointmentID}` : 'https://ctrlapiapp.azurewebsites.net/api/appointment';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointmentData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            fetchAppointments(); // Refresh the list
            setIsModalOpen(false);
            setCurrentAppointment(null);
        })
        .catch(error => console.error(`Error ${method === 'PUT' ? 'updating' : 'adding'} appointment:`, error));
    };

    const handleDeleteAppointment = (appointmentID) => {
        if (window.confirm('Are you sure you want to delete this appointment?')) {
                        fetch(`https://ctrlapiapp.azurewebsites.net/api/appointment/${appointmentID}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                fetchAppointments(); // Refresh the list
            })
            .catch(error => console.error('Error deleting appointment:', error));
        }
    };

    const openAddModal = () => {
        setCurrentAppointment(null);
        setIsModalOpen(true);
    };

    const openEditModal = (appointment) => {
        setCurrentAppointment(appointment);
        setIsModalOpen(true);
    };

    const closeAddEditModal = () => {
        setIsModalOpen(false);
        setCurrentAppointment(null);
    };

    return (
        <div className="content-box appointments-container">
            <h2>Appointments</h2>

            <div className="controls-section">
                <div className="filter-controls">
                    <label htmlFor="statusFilter">Filter by Status:</label>
                    <select
                        id="statusFilter"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="form-control"
                    >
                        <option value="All">All</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                        {/* Add other statuses as needed from your backend */}
                    </select>
                </div>

                <div className="sort-controls">
                    <button
                        onClick={() => handleSortChange('dateTime')}
                        className="btn-outline-primary"
                    >
                        Sort by Date {sortField === 'dateTime' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </button>
                    <button
                        onClick={() => handleSortChange('reason')}
                        className="btn-outline-primary"
                    >
                        Sort by Reason {sortField === 'reason' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </button>
                    <button
                        onClick={() => handleSortChange('status')}
                        className="btn-outline-primary"
                    >
                        Sort by Status {sortField === 'status' && (sortOrder === 'asc' ? '▲' : '▼')}
                    </button>
                </div>
                <button onClick={openAddModal} className="btn-primary add-appointment-btn">
                    Add New Appointment
                </button>
            </div>

            {filteredAndSortedAppointments.length > 0 ? (
                <table className="appointments-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSortChange('dateTime')}>Date</th>
                            <th onClick={() => handleSortChange('reason')}>Reason</th>
                            <th onClick={() => handleSortChange('status')}>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedAppointments.map(appointment => (
                            <tr key={appointment.appointmentID}>
                                <td>{new Date(appointment.dateTime).toLocaleString()}</td>
                                <td>{appointment.reason}</td>
                                <td>{appointment.status}</td>
                                <td>
                                    <button onClick={() => openEditModal(appointment)} className="btn-outline-primary small-btn">Edit</button>
                                    <button onClick={() => handleDeleteAppointment(appointment.appointmentID)} className="btn-outline-danger small-btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-appointments">No appointments found.</p>
            )}

            {isModalOpen && (
                <AppointmentFormModal
                    appointment={currentAppointment}
                    onClose={closeAddEditModal}
                    onSave={handleAddEditAppointment}
                />
            )}
        </div>
    );
};

const AppointmentFormModal = ({ appointment, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        appointmentID: appointment?.appointmentID || 0,
        providerID: appointment?.providerID || '',
        patientID: appointment?.patientID || '',
        dateTime: appointment?.dateTime ? new Date(appointment.dateTime).toISOString().slice(0, 16) : '',
        reason: appointment?.reason || '',
        status: appointment?.status || 'Scheduled',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{appointment ? 'Edit Appointment' : 'Add New Appointment'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="providerID">Provider ID:</label>
                        <input
                            type="number"
                            id="providerID"
                            name="providerID"
                            value={formData.providerID}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="patientID">Patient ID:</label>
                        <input
                            type="number"
                            id="patientID"
                            name="patientID"
                            value={formData.patientID}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateTime">Date and Time:</label>
                        <input
                            type="datetime-local"
                            id="dateTime"
                            name="dateTime"
                            value={formData.dateTime}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reason">Reason:</label>
                        <textarea
                            id="reason"
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            className="form-control"
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status:</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="form-control"
                            required
                        >
                            <option value="Scheduled">Scheduled</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div className="modal-actions">
                        <button type="submit" className="btn-primary">Save</button>
                        <button type="button" onClick={onClose} className="btn-outline-primary">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Appointments;

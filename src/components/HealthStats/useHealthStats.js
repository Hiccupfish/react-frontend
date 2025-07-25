import { useState, useEffect, useCallback } from 'react';

export const useHealthStats = () => {
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

    return {
        filteredStats,
        filter,
        form,
        handleDelete,
        handleInputChange,
        handleSubmit,
        setFilter,
    };
};
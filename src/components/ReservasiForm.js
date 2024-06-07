import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReservasiForm = ({ fetchReservasi, editReservasi, clearEdit }) => {
    const [name, setName] = useState('');
    const [alamat, setAlamat] = useState('');
    const [nohp, setNohp] = useState('');

    useEffect(() => {
        if (editReservasi) {
            setName(editReservasi.name);
            setAlamat(editReservasi.alamat);
            setNohp(editReservasi.nohp);
        } else {
            setName('');
            setAlamat('');
            setNohp('');
        }
    }, [editReservasi]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newReservasi = { name, alamat, nohp };

        try {
            if (editReservasi) {
                await axios.put(`http://localhost:5000/${editReservasi.id}`, newReservasi);
            } else {
                await axios.post('http://localhost:5000', newReservasi);
            }
            fetchReservasi();
            clearEdit();
        } catch (error) {
            console.error('Error creating/updating reservasi', error);
        }

        setName('');
        setAlamat('');
        setNohp('');
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="form-group">
                <label>Nama:</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Alamat:</label>
                <input
                    type="text"
                    className="form-control"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>No HP:</label>
                <input
                    type="text"
                    className="form-control"
                    value={nohp}
                    onChange={(e) => setNohp(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary mt-2">
                {editReservasi ? 'Update' : 'Submit'}
            </button>
        </form>
    );
};

export default ReservasiForm;

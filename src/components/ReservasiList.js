import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReservasiItem from './ReservasiItem';
import ReservasiForm from './ReservasiForm';

const ReservasiList = () => {
    const [reservasi, setReservasi] = useState([]);
    const [editReservasi, setEditReservasi] = useState(null);

    useEffect(() => {
        fetchReservasi();
    }, []);

    const fetchReservasi = async () => { 
        try {
            const response = await axios.get('http://localhost:5000');
            setReservasi(response.data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/${id}`);
            fetchReservasi();
        } catch (error) {
            console.error('Error deleting data', error);
        }
    };

    const handleEdit = (reservasi) => {
        setEditReservasi(reservasi);
    };

    const clearEdit = () => {
        setEditReservasi(null);
    };

    return (
        <div className="container mt-4">
            <h2>Input dan Update Reservasi</h2>
            <ReservasiForm 
                fetchReservasi={fetchReservasi} 
                editReservasi={editReservasi} 
                clearEdit={clearEdit}
            />
            <table className="table table-dark table-striped mt-4">
                <thead>
                    <tr>
                        <th scope="col">Nama</th>
                        <th scope="col">Alamat</th>
                        <th scope="col">No HP</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reservasi.map((item) => (
                        <ReservasiItem 
                            key={item.id} 
                            reservasi={item} 
                            onDelete={handleDelete} 
                            onEdit={handleEdit} 
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReservasiList;

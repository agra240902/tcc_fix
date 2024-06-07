import React from 'react';

const ReservasiItem = ({ reservasi, onDelete, onEdit }) => {
    return (
        <tr>
            <td>{reservasi.name}</td>
            <td>{reservasi.alamat}</td>
            <td>{reservasi.nohp}</td>
            <td>
                <button onClick={() => onEdit(reservasi)} className="btn btn-warning">Edit</button>
                <button onClick={() => onDelete(reservasi.id)} className="btn btn-danger">Delete</button>
            </td>
        </tr>
    );
};

export default ReservasiItem;

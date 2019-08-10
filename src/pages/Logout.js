import React from 'react';
import { Redirect } from 'react-router-dom';

export default function LogOut ({ history }) {
    localStorage.removeItem('token');

    return <Redirect to="/login" />;
}

import React from 'react';
import { Redirect } from 'react-router-dom';

export default function LogOut ({ history }) {
    localStorage.removeItem('token');
    // localStorage.clear();

    // history.push('/login');

    return <Redirect to="/login" />;
}

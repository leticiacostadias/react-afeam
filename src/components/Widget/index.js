import React, { Component } from 'react'
import './widget.css'

// function Widget (props) {
// function Widget ({ children }) {
// const Widget = ({ children }) => (
export default ({ children }) => (
    <div className="widget">
        {children}
    </div>
)

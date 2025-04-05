import React from 'react'
import { Link } from 'react-router-dom'

export default function Homepage() {
  return (
    <div>
      Home Page
      <Link to="/dashboard/overview">Dashboard</Link>
    </div>
  )
}

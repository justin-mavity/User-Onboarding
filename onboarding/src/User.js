import React from "react";

export default function User({ details }) {
  if (!details) {
    return <h3>Working fetching user&apos;s details...</h3>;
  }

  return (
    <div className="user-container">
      <h2>{details.name}</h2>
      <div>Username: {details.username}</div>
      <div>Email: {details.email}</div>
    </div>
  );
}

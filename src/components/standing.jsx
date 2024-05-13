import React from "react";
import Table from "react-bootstrap/Table";

const Standing = (props) => {
  const { standings } = props;
  return (
    <Table>
      <thead>
        <tr>
          <th style={{ backgroundColor: "#111", color: "#fff" }}>Team</th>
          <th style={{ backgroundColor: "#111", color: "#fff" }}>W</th>
          <th style={{ backgroundColor: "#111", color: "#fff" }}>D</th>
          <th style={{ backgroundColor: "#111", color: "#fff" }}>L</th>
          <th style={{ backgroundColor: "#111", color: "#fff" }}>Pts</th>
        </tr>
      </thead>
      <tbody>
        {standings?.map((standing) => (
          <tr key={standing.id}>
            <td>{standing.team?.team_name}</td>
            <td>{standing.won}</td>
            <td>{standing.drawn}</td>
            <td>{standing.lost}</td>
            <td>{standing.points}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Standing;

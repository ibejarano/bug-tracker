import React, { useState, useEffect } from "react";
import { userHandler } from "../../handlers/users";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    if (!users.length)
      userHandler.getAllUsers().then(data => {
        setUsers(data);
        setLoadingUsers(false);
      });
  });

  const deleteUserById = async (id) => {
    const res = await userHandler.deleteById(id);
    setUsers([]);
    console.log(res)
  }


  const usersDataRow = users.map((user, idx) => {
    return (
      <tr key={idx}>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.isAdmin? 'Yes':'No'}</td>
        <td>{user.isDev? 'Yes':'No'}</td>
        <td> EDIT </td>
        <td> <button onClick={() => deleteUserById(user._id)} >Delete</button> </td>
      </tr>
    );
  });
  return (
    <div>
      {!loadingUsers && (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>is Admin</th>
              <th>is Dev</th>
              <th>Edit</th>
              <th> Delete </th>
            </tr>
          </thead>
          <tbody>{usersDataRow}</tbody>
        </table>
      )}
      {loadingUsers && <p>Loading...</p>}
    </div>
  );
}

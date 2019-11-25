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
      }).catch(error => {
        window.location = '/user'
      });
  });

  const deleteUserById = async id => {
    const res = await userHandler.deleteById(id);
    setUsers([]);
    console.log(res);
  };

  console.log(users)

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
          <tbody>
            {users.map((user, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    <input
                      type="text"
                      name="username"
                      defaultValue={user.username}
                    />
                  </td>
                  <td>
                    <input type="text" name="email" defaultValue={user.email} />
                  </td>
                  <td>{user.isAdmin ? "Yes" : "No"}</td>
                  <td>{user.isDev ? "Yes" : "No"}</td>
                  <td>
                    {" "}
                    <button onClick={() => deleteUserById(user._id)}>
                      Delete
                    </button>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {loadingUsers && <p>Loading...</p>}
    </div>
  );
}

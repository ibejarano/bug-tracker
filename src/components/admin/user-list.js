import React from "react";

export default function UsersList({ users }) {
  const usersLi = users.map((user, val) => {
    return <li key={val}>{user}</li>;
  });
  return (
    <div>
      <ol>{usersLi}</ol>
    </div>
  );
}

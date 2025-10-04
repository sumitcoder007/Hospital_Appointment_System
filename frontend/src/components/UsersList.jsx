import React, { useEffect, useState } from "react";
import API from "../api/api";

const UsersList = ({ role }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await API.get(`/users?role=${role}`);
      setUsers(data);
    };
    fetchUsers();
  }, [role]);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl mb-2 font-semibold">{role}s List</h2>
      <ul className="list-disc pl-5">
        {users.map(user => <li key={user._id}>{user.name} ({user.username})</li>)}
      </ul>
    </div>
  );
};

export default UsersList;

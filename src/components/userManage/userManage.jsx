import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { ImUnlocked } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import "./userManage.scss";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://userservers.onrender.com/api/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchUsers();
  }, []);

  const handleBlockUser = async (user) => {
    try {
      const response = await axios.patch(
        `https://userservers.onrender.com/api/user/block/${user.email}`
      );
      if (response.status === 200) {
        toast.success("User blocked successfully");
        updateUserStatus(user.email, "blocked");
      }
    } catch (error) {
      console.error(error.response.data);
      toast.error("Failed to block user");
    }
  };
  const handleUnblockUser = async (user) => {
    try {
      const response = await axios.patch(
        `https://userservers.onrender.com/api/user/unblock/${user.email}`
      );
      if (response.status === 200) {
        toast.success("User unblocked successfully");
        updateUserStatus(user.email, "unblocked");
      } else {
        toast.error("Failed to unblock user");
      }
    } catch (error) {
      if (error.response.status === 404) {
        toast.error("User not found");
      } else {
        console.error(error.response.data);
        toast.error("Failed to unblock user");
      }
    }
  };

  const handleDeleteUser = async (user) => {
    try {
      const response = await axios.delete(
        `https://userservers.onrender.com/api/users/${user.id}`
      );
      if (response.status === 204) {
        toast.success("User deleted successfully");
        setUsers((prevUsers) =>
          prevUsers.filter((prevUser) => prevUser.id !== user.id)
        );
      }
    } catch (error) {
      console.error(error.response.data);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="user-management">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Last Login Time</th>
            <th>Registration Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.lastLoginTime}</td>
              <td>{user.registrationTime}</td>
              <td>{user.status}</td>
              <td className="button-group">
                <button onClick={() => handleBlockUser(user)}>Block</button>
                <button onClick={() => handleUnblockUser(user)}>
                  <ImUnlocked />
                </button>
                <button onClick={() => handleDeleteUser(user)}>
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default UserManagement;

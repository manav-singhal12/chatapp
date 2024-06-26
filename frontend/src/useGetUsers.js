// useGetUsers.js

import { useEffect, useState } from 'react';

const useGetUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/users', {
          credentials: 'include' // Include credentials (cookies)
        });

        if (!res.ok) {
          throw new Error('Failed to fetch userss');
        }

        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { loading, users };
};

export default useGetUsers;

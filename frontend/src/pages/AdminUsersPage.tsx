import { useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
  fullName: string;
  role: string;
}

export default function AdminUsersPage() {

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {

    fetch("http://localhost:5262/api/users")
      .then(r => r.json())
      .then((data: User[]) => setUsers(data));

  }, []);

  return (

    <div>

      <h1>Users</h1>

      <table>

        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>

          {users.map(u => (

            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.fullName}</td>
              <td>{u.role}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

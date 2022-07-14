import React, { useState } from 'react';
import { httpGetUser } from 'src/api/http';

export default function Users() {
  const [users, setUsers] = useState<[User]>();
  const [quantity, setQuantity] = useState(0);

  const handleClick = async () => {
    const userDetails = await httpGetUser(quantity);
    setUsers(userDetails);
  };

  return (
    <>
      <label htmlFor="quantity">Enter quantity</label>
      <input
        id="quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(+e.target.value)}
      />
      {users &&
        users.map((user) => (
          <div key={user.name.first}>
            <h2>
              {user.name.title} {user.name.first} {user.name.last}
            </h2>
            <p>{user.gender}</p>
            <p>{user.email}</p>
          </div>
        ))}
      {!users && <h1>No data</h1>}
      <button onClick={handleClick}>Fetch users</button>
    </>
  );
}

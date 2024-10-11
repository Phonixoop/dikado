import Link from "next/link";

const tables = ["Users", "Forms"]; // Add your table names here

const Admin = () => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <ul>
        {tables.map((table) => (
          <li key={table}>
            <Link href={`/admin/${table.toLowerCase()}`}>{table}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;

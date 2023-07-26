import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <main className="Missing">
      <h2>Missing</h2>
      <p>Well, that&apos;s dissapointing.</p>
      <p>
        <Link to="/">Visit Our Homepage</Link>
      </p>
    </main>
  );
};

export default Missing;

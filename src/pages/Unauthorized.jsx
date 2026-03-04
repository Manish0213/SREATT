import { useNavigate } from "react-router-dom";

const Unauthorized = () => {

  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.code}>403</h1>
        <h2>Access Denied</h2>
        <p>You do not have permission to access this page.</p>

        <button
          style={styles.button}
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f9"
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  code: {
    fontSize: "60px",
    margin: "0",
    color: "#e74c3c"
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    border: "none",
    backgroundColor: "#3498db",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "4px"
  }
};

export default Unauthorized;
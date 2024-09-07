import { LoaderIcon } from "react-hot-toast";

function Loader() {
  
  return (
    <div
      style={{
        color: "var(--slate-700)",
        display: "flex",
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        gap: "1rem",
        marginTop: "2rem",
      }}
    >
      <p> Loading Data...</p>
      <LoaderIcon style={{ width: "1.3rem", height: "1.3rem" }} />
    </div>
  );
}

export default Loader;

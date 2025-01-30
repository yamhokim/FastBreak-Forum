import ballAnimation from "../basketball-animation.gif";

const Spinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={ballAnimation}
        alt="Loading animation"
        style={{
          display: "block",
          margin: "0 auto",
        }}
      />
    </div>
  );
};

export default Spinner;

const Modal = ({ children, toggleModal }) => {
  function handleToggleModal(e) {
    console.log(e.target.id);
    if (e.target.id === "modal") {
      toggleModal();
    }
  }
  return (
    <div
      onClick={handleToggleModal}
      id="modal"
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 h-s"
    >
      {children}
    </div>
  );
};

export default Modal;

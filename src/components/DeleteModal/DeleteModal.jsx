export const DeleteModal = ({ setShowDeleteModal }) => {
  return (
    <div className="delete-modal">
      <div className="modal-inner">
        <h5>Silmek İstiyor Musunuz?</h5>
        <button
          onClick={() => setShowDeleteModal(false)}
          className="btn btn-warning"
        >
          Vazgeç
        </button>
        <button className="btn btn-danger">Onayla</button>
      </div>
    </div>
  );
};

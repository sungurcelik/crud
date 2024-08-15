export const BookCard = ({ bookInfo, handleModal }) => {
  const { title, date, isRead, id } = bookInfo;

  return (
    <div className="d-flex justify-content-between align-items-center p-3 mt-5 border rounded shadow">
      <div>
        <h5
          style={{
            textDecoration: isRead ? "line-through" : "none",
          }}
        >
          {title}
        </h5>
        <p>{date}</p>
      </div>
      <div className="btn-group">
        <button onClick={() => handleModal(id)} className="btn btn-danger">
          Sil
        </button>
        <button className="btn btn-primary">Düzenle</button>
        <button className="btn btn-success">
          {isRead ? "Okundu" : "Okunmadı"}
        </button>
      </div>
    </div>
  );
};

import { useState } from "react";
import { Header } from "./components/Header/Header";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { BookCard } from "./components/BookCard/BookCard";
import { DeleteModal } from "./components/DeleteModal/DeleteModal";
import { EditModal } from "./components/EditModal/EditModal";

function App() {
  //Yeni kitabın adının tutulduğu state
  const [bookName, setBookName] = useState("");
  // tüm kitapların tutulduğu state
  const [books, setBooks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteTitle, setDeleteTitle] = useState("");
  const [editItem, setEditItem] = useState({});
  //inputun içeriğini almak için fonksiyon
  const handleChange = (e) => {
    setBookName(e.target.value);
  };
  //Add
  const handleSubmit = (e) => {
    e.preventDefault(); //form yenilenmez
    if (!bookName) {
      toast.warn("Lütfen Kitap İsmi Giriniz!", { autoClose: 2000 });
      // fonksiyonun aşağı gitmesini engelledik.
      return;
    }
    const newBook = {
      id: v4(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };
    // console.log("yeni Kitap", newBook);
    setBooks([...books, newBook]);
    toast.success("Kitap Başarıyla Eklendi", { autoClose: 2000 });
    //ekleme işlemnden sonra inputu temizleme
    setBookName("");
  };
  const handleModal = (deleteBookId, deleteBookTitle) => {
    setDeleteId(deleteBookId);
    setDeleteTitle(deleteBookTitle);
    setShowDeleteModal(true);
  };
  const handleDelete = () => {
    const filteredBooks = books.filter((book) => book.id !== deleteId);
    // console.log(filteredBooks);
    setBooks(filteredBooks);
    setShowDeleteModal(false);
    toast.error("Kitap Başarıyla Silindi", { autoClose: 2000 });
  };
  const handleEditModal = (editBook) => {
    setEditItem(editBook);
    setShowEditModal(true);
    console.log(editBook);
  };
  const handleEditBook = () => {
    const editIndex = books.findIndex((book) => book.id === editItem.id);
    const cloneBooks = [...books];
    cloneBooks.splice(editIndex, 1, editItem);
    setBooks(cloneBooks);
    setShowEditModal(false);
    toast.info("Kitap Güncellendi", { autoClose: 2000 });
  };
  //Kitabı Okundu Olarak İşaretleme
  const handleRead = (readBook) => {
    // console.log(readBook);
    const updatedBook = { ...readBook, isRead: !readBook.isRead };
    // console.log(updatedBook);

    const index = books.findIndex((book) => book.id === readBook.id);
    const cloneBooks = [...books];
    cloneBooks[index] = updatedBook;
    setBooks(cloneBooks);
  };
  return (
    <div>
      <Header />

      <div className="container">
        <form className="d-flex gap-3 mt-4" onSubmit={handleSubmit}>
          <input
            value={bookName}
            onChange={handleChange}
            placeholder="Bir kitap ismi giriniz.."
            className="form-control shadow"
            type="text"
          />
          <button className="btn btn-warning shadow">Ekle</button>
        </form>
        {books.length === 0 ? (
          <h4>Henüz Herhangi bir kitap eklenmedi!</h4>
        ) : (
          // kitap dizimde eleman varsa
          books.map((book) => (
            <BookCard
              handleEditModal={handleEditModal}
              handleModal={handleModal}
              bookInfo={book}
              key={book.id}
              handleRead={handleRead}
            />
          ))
        )}
      </div>
      {showDeleteModal && (
        <DeleteModal
          bookTitle={deleteTitle}
          handleDelete={handleDelete}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}

      {showEditModal && (
        <EditModal
          handleEditBook={handleEditBook}
          editItem={editItem}
          setEditItem={setEditItem}
          setShowEditModal={setShowEditModal}
        />
      )}
    </div>
  );
}

export default App;

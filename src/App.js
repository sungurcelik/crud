import { useState } from "react";
import { Header } from "./components/Header/Header";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { BookCard } from "./components/BookCard/BookCard";
import { DeleteModal } from "./components/DeleteModal/DeleteModal";

function App() {
  //Yeni kitabın adının tutulduğu state
  const [bookName, setBookName] = useState("");
  // tüm kitapların tutulduğu state
  const [books, setBooks] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
      isRead: true,
    };
    console.log("yeni Kitap", newBook);
    setBooks([...books, newBook]);
    //ekleme işlemnden sonra inputu temizleme
    setBookName("");
  };

  const handleModal = (deleteId) => {
    console.log("çalıştı")
    setShowDeleteModal(true);
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
            <BookCard handleModal={handleModal} bookInfo={book} key={book.id} />
          ))
        )}
      </div>
      {showDeleteModal && <DeleteModal setShowDeleteModal={setShowDeleteModal} />}
    </div>
  );
}

export default App;

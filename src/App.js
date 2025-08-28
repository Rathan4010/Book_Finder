import React, { useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);

    fetch(`https://openlibrary.org/search.json?title=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Books:", data.docs);
        setBooks(data.docs)
      })
      .catch((err) => console.error("Error:", err));
  };


  return (
    <>
      <div className="top-section">
        <div className="heading"><i>book finder</i></div>
        <div className="searchbar">
          <label htmlFor="book-name">Book Name </label>
          <input
            id="book-name"
            type="text"
            placeholder="enter the book name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        </div>
      {/* results*/}
      <div className="results">
        {books.map((book, index) => (
          <div key={index} className="book">
            {book.cover_i ? (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
          alt={book.title}
          className="book-cover"
        />
      ) : (
        <div className="no-cover">No Image</div>
      )}
            <h3>{book.title}</h3>
            <p>
              {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
            </p>
            <p>
              <strong>First Published:</strong> {book.first_publish_year || "N/A"}
            </p>
          </div>
        ))}
      </div>

      {/* Background image section */}
      <div className="background-section"></div>
    </>
  );
}

export default App;

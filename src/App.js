import React, { useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState("");         

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setError("Please enter a book name.");
      setBooks([]);
      return;
    }

    setLoading(true);
    setError("");
    setBooks([]);

    fetch(`https://openlibrary.org/search.json?title=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.docs.length === 0) {
          setError("No books found for your search.");
        }
        setBooks(data.docs);
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
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

      {/* Show loading, error, or results */}
      <div className="results">
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        
        {!loading && !error && books.map((book, index) => (
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

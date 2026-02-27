import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

  /* ================= FETCH BOOKS ================= */
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${API_BASE}/books/all`);
        setBooks(res.data.books);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="px-4 max-w-7xl mx-auto py-6">
      <div className="px-4 md:px-10 max-w-7xl mx-auto py-16 bg-linear-to-b from-slate-50 to-white min-h-screen">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">
            Explore Our Books
          </h2>
          <p className="mt-3 text-slate-500 text-sm md:text-base">
            Curated resources to improve your English communication skills
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {books.length === 0 ? (
            <p className="text-center col-span-full text-slate-500 text-lg">
              No Books Available
            </p>
          ) : (
            books.map((book) => (
              <div
                key={book._id}
                onClick={() =>
                  book.amazonUrl && window.open(book.amazonUrl, "_blank")
                }
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden border border-slate-100 hover:-translate-y-2"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden">
                  <img
                    src={`${API_BASE}/images/${book.image}`}
                    alt={book.title}
                    className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Price Tag */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-slate-800 px-4 py-1.5 rounded-full text-sm font-semibold shadow">
                    ₹ {book.price}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col">
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-slate-800 line-clamp-2 group-hover:text-indigo-600 transition">
                    {book.title}
                  </h3>

                  {/* Category */}
                  <p className="text-sm text-indigo-500 font-medium mt-2">
                    {book.category}
                  </p>

                  {/* Date */}
                  {book.createdAt && (
                    <span className="text-xs text-slate-400 mt-3">
                      {new Date(book.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  )}

                  {/* Button */}
                  <button className="mt-6 w-full border border-indigo-600 text-indigo-600 py-2 rounded-xl font-medium hover:bg-indigo-600 hover:text-white transition">
                    View on Amazon
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;

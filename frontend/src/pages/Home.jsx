import axios from "axios";
import React, { useEffect, useState } from "react";
import LatestBlogs from "../components/LatestBlogs";
import { BookOpen, FileText, GraduationCap, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const Home = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [banners, setBanners] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 4;

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books.length / booksPerPage);

  const navigate = useNavigate();

  const [reviews, setReviews] = useState([
    { id: 1, name: "Arshdeep Singh", message: "Very helpful app", rating: 5 },
    { id: 2, name: "Anisha", message: "Very very nice app 😍", rating: 5 },
    { id: 3, name: "Pinka", message: "Working time kya hai?", rating: 4 },
  ]);

  const [showPopup, setShowPopup] = useState(false);

  const [newReview, setNewReview] = useState({
    name: "",
    message: "",
    rating: 5,
  });

  const scrollRef = useRef();

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

  /* ================= FETCH BOOKS ================= */
  useEffect(() => {
    if (isHovering) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners, isHovering]);

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

  useEffect(() => {
    const fetchBanners = async () => {
      const res = await axios.get(`${API_BASE}/banner/all`);
      setBanners(res.data.banners);
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (!banners.length) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [banners]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 350;
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const handleAddReview = () => {
    if (!newReview.name || !newReview.message) return;

    setReviews([{ id: Date.now(), ...newReview }, ...reviews]);

    setShowPopup(false);

    setNewReview({
      name: "",
      message: "",
      rating: 5,
    });
  };

  return (
    <div className="w-full bg-blue-50 min-h-screen py-1">
      {/* ===== BANNER SLIDER ===== */}
      <div
        className="relative w-full h-[70vh] md:h-[60vh] overflow-hidden rounded-3xl shadow-2xl"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {banners.map((banner, index) => (
          <div
            key={banner._id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === activeIndex
                ? "opacity-100 scale-100 z-10"
                : "opacity-0 scale-110 z-0"
            }`}
          >
            {/* Background Image */}
            <img
              src={`${API_BASE}/images/${banner.image}`}
              alt={banner.title}
              className="w-full h-full object-cover"
            />

            {/* Premium Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-black/70 flex items-center">
              <div className="max-w-6xl mx-auto px-6 md:px-12 text-white">
                <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight animate-fadeIn">
                  {banner.title}
                </h2>

                <p className="text-base md:text-xl text-gray-200 mb-8 max-w-2xl">
                  {banner.description}
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <span className="text-4xl font-bold text-yellow-400">
                    ₹ {banner.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Left Arrow */}
        <button
          onClick={() =>
            setActiveIndex(
              activeIndex === 0 ? banners.length - 1 : activeIndex - 1,
            )
          }
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-4 rounded-full text-white transition"
        >
          ❮
        </button>

        {/* Right Arrow */}
        <button
          onClick={() =>
            setActiveIndex(
              activeIndex === banners.length - 1 ? 0 : activeIndex + 1,
            )
          }
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-4 rounded-full text-white transition"
        >
          ❯
        </button>

        {/* Animated Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div
            key={activeIndex}
            className="h-full bg-red-500 animate-progress"
            style={{ animationDuration: "5s" }}
          ></div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
          {banners.map((_, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                index === activeIndex ? "bg-white scale-125" : "bg-white/50"
              }`}
            ></div>
          ))}
        </div>
      </div>

      <h2 className="text-4xl mt-6 ml-30 md:text-5xl font-bold text-blue-700 tracking-tight">
        Browse
      </h2>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {/* BOOKS  */}
          <div
            onClick={() => navigate("/books")}
            className="bg-pink-100 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl transition cursor-pointer"
          >
            <BookOpen size={40} className="text-red-500 mb-3" />
            <h3 className="font-semibold text-lg">Books</h3>
          </div>

          {/* COURSES  */}
          <div
            onClick={() => navigate("/mycourses")}
            className="bg-pink-100 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl transition cursor-pointer"
          >
            <GraduationCap size={40} className="text-blue-500 mb-3" />
            <h3 className="font-semibold text-lg">MyCourses</h3>
          </div>

          {/* LIVE CLASS  */}
          <div
            onClick={() => navigate("/live-courses")}
            className="bg-pink-100 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl transition cursor-pointer"
          >
            <Video size={40} className="text-green-500 mb-3" />
            <h3 className="font-semibold text-lg">Courses</h3>
          </div>

          {/* BLOGS  */}
          <div
            onClick={() => navigate("/blogs")}
            className="bg-pink-100 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl transition cursor-pointer"
          >
            <FileText size={40} className="text-purple-500 mb-3" />
            <h3 className="font-semibold text-lg">Blogs</h3>
          </div>
        </div>
      </div>

      <LatestBlogs />

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
            currentBooks.map((book) => (
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
        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  currentPage === index + 1
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <div className="bg-[#eff3f7] py-12 relative">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold">Testimonials</h2>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPopup(true)}
                className="bg-blue-600 text-white w-10 h-10 rounded-full text-xl"
              >
                +
              </button>

              <button
                onClick={() => (scrollRef.current.scrollLeft -= 350)}
                className="border w-10 h-10 rounded-full"
              >
                ←
              </button>

              <button
                onClick={() => (scrollRef.current.scrollLeft += 350)}
                className="border w-10 h-10 rounded-full"
              >
                →
              </button>
            </div>
          </div>

          {/* Slider */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="min-w-100 bg-white p-8 rounded-3xl shadow-lg"
              >
                <div className="text-blue-600 text-5xl mb-4">“</div>

                <h3 className="text-xl font-semibold">{review.name}</h3>

                <div className="text-yellow-500 mb-3">
                  {"⭐".repeat(review.rating)}
                </div>

                <p className="text-gray-600 text-lg">{review.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl w-100">
            <h2 className="text-2xl font-bold mb-4">Add Review</h2>

            <input
              type="text"
              placeholder="Your Name"
              className="border p-2 w-full mb-3 rounded"
              value={newReview.name}
              onChange={(e) =>
                setNewReview({ ...newReview, name: e.target.value })
              }
            />

            <textarea
              placeholder="Your Review"
              className="border p-2 w-full mb-3 rounded"
              value={newReview.message}
              onChange={(e) =>
                setNewReview({ ...newReview, message: e.target.value })
              }
            />

            <select
              className="border p-2 w-full mb-3 rounded"
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: Number(e.target.value) })
              }
            >
              <option value="5">⭐⭐⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="2">⭐⭐</option>
              <option value="1">⭐</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleAddReview}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

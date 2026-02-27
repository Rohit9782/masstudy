import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {

  const [activeTab, setActiveTab] = useState("list");
  const [bannerTab, setBannerTab] = useState("bannerList");
  const [booksTab, setBooksTab] = useState("booksList");
  const [live_courseTab, setLive_courseTab] = useState("live_courseList");


  const token = localStorage.getItem("token");

  /* ================= BLOG STATES ================= */

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    offPrice: "",
    off: "",
    image: null,
  });

  const [blogs, setBlogs] = useState([]);

  /* ================= BOOKS STATES ================= */
  const [booksForm, setBooksForm] = useState({
    title: "",
    category: "",
    price: "",
    amazonUrl: "",
    image: null,
  });

  const [books, setBooks] = useState([]);

   /* ================= LIVE_COURSE STATES ================= */
  const [live_courseForm, setLive_courseForm] = useState({
    title: "",
    description: "",
    nowPrice: "",
    beforePrice: "",
    discount: "",
    image: null,
  });

  const [live_course, setLive_course] = useState([]);


  /* ================= BANNER STATES ================= */

  const [bannerForm, setBannerForm] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });

  const [banners, setBanners] = useState([]);

  /* ================= HANDLERS ================= */

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const bannerChangeHandler = (e) => {
    setBannerForm({ ...bannerForm, [e.target.name]: e.target.value });
  };

  const bannerFileHandler = (e) => {
    setBannerForm({ ...bannerForm, image: e.target.files[0] });
  };

  const booksChangeHandler = (e) => {
    setBooksForm({ ...booksForm, [e.target.name]: e.target.value });
  };

  const booksFileHandler = (e) => {
    setBooksForm({ ...booksForm, image: e.target.files[0] });
  };

  const live_courseChangeHandler = (e) => {
    setLive_courseForm({ ...live_courseForm, [e.target.name]: e.target.value });
  };

  const live_courseFileHandler = (e) => {
    setLive_courseForm({ ...live_courseForm, image: e.target.files[0] });
  }

  /* ================= CREATE BLOG ================= */

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please select an image");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("offPrice", formData.offPrice);
    data.append("off", formData.off);
    data.append("image", formData.image);

    try {
      const res = await axios.post(
        "http://localhost:5000/blog/create",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(res.data.message);
      setBlogs((prev) => [res.data.blog, ...prev]);

      setFormData({
        title: "",
        category: "",
        description: "",
        price: "",
        offPrice: "",
        off: "",
        image: null,
      });

      setActiveTab("list");
    } catch (error) {
      toast.error(error.response?.data?.message || "Blog creation failed");
    }
  };

  /* ================= CREATE BANNER ================= */

  const submitBannerHandler = async (e) => {
    e.preventDefault();

    if (!bannerForm.image) {
      toast.error("Please select banner image");
      return;
    }

    const data = new FormData();
    data.append("title", bannerForm.title);
    data.append("description", bannerForm.description);
    data.append("price", bannerForm.price);
    data.append("image", bannerForm.image);

    try {
      const res = await axios.post(
        "http://localhost:5000/banner/create",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(res.data.message);
      setBanners((prev) => [res.data.banner, ...prev]);

      // ✅ FIXED RESET
      setBannerForm({
        title: "",
        description: "",
        price: "",
        image: null,
      });

      setBannerTab("bannerList");
    } catch (error) {
      toast.error("Banner create failed");
    }
  };

   /* ================= CREATE BOOKS ================= */

   const submitBooksHandler = async (e) => {
    e.preventDefault();

    if (!booksForm.image) {
      toast.error("Please select books image");
      return;
    }

    const data = new FormData();
    data.append("title", booksForm.title);
    data.append("category", booksForm.category);
    data.append("price", booksForm.price);
    data.append("amazonUrl", booksForm.amazonUrl);
    data.append("image", booksForm.image);

    try {
      const res = await axios.post(
        "http://localhost:5000/books/create",
        data,
        {
          headers: { Authorization: `Bearer ${token}`},
        }
      );

      toast.success(res.data.message);
      setBooks((prev) => [res.data.books, ...prev]);

      setBooksForm({
        title: "",
        category: "",
        price: "",
        amazonUrl: "",
        image: null,
      });

      setBooksTab("booksList");
    } catch (error) {
      toast.error("Books create failed");
    }
   };

   /* ================= CREATE LIVE_COURSE ================= */

  const submitLive_courseHandler = async (e) => {
    e.preventDefault();

    if (!live_courseForm.image) {
      toast.error("Please select course image");
      return;
    }

    const data = new FormData();
    data.append("title", live_courseForm.title);
    data.append("description", live_courseForm.description);
    data.append("nowPrice", live_courseForm.nowPrice);
    data.append("beforePrice", live_courseForm.beforePrice);
    data.append("discount", live_courseForm.discount);
    data.append("image", live_courseForm.image);

    try {
      const res = await axios.post(
        "http://localhost:5000/live_course/create",
        data,
        {
          headers: { Authorization: `Bearer ${token}`},
        }
      );

      toast.success(res.data.message);
      setLive_course((prev) => [res.data.live_course, ...prev]);

      setLive_courseForm({
        title: "",
        description: "",
        nowPrice: "",
        beforePrice: "",
        discount: "",
        image: null,
      });

      setLive_courseTab("live_courseList");
    } catch (error) {
      toast.error("Course create failed");
    }
  }


  /* ================= GET BLOGS ================= */

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/blog/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(res.data.blogs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, [token]);

  /* ================= GET BANNERS ================= */

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get("http://localhost:5000/banner/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBanners(res.data.banners);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBanners();
  }, [token]);

   /* ================= GET BOOKS ================= */

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/books/all", {
          headers: { Authorization: `Bearer ${token}`},
        });
        setBooks(res.data.books);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, [token]);

   /* ================= GET LIVE_COURSE ================= */

  useEffect(() => {
    const fetchLive_course = async () => {
      try {
        const res = await axios.get("http://localhost:5000/live_course/all", {
          headers: { Authorization: `Bearer ${token}`},
        });
        setLive_course(res.data.live_course);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLive_course();
  }, [token]);

  /* ================= DELETE BLOG ================= */

  const removeBlog = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/blog/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch {
      toast.error("Delete Failed");
    }
  };

  /* ================= DELETE BANNER ================= */

  const removeBanner = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/banner/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Banner deleted");
      setBanners((prev) => prev.filter((b) => b._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ================= DELETE BOOKS ================= */

  const removeBooks = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/books/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}`}}
      );
      toast.success(res.data.message);
      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (error) {
      toast.error("Delete Failed");
    }
  }

  /* ================= DELETE LIVE_COURSE ================= */

  const removeLive_course = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/live_course/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` }}
      );
      toast.success(res.data.message);
      setLive_course((prev) => prev.filter((b) => b._id !== id));
    } catch (error) {
      toast.error("Delete Failed");
    }
  }

  /* ================= UI ================= */

  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-lg font-semibold mb-6">Dashboard</h2>

        <button
          onClick={() => setActiveTab("post")}
          className={`w-full py-2 px-4 mb-2 rounded ${activeTab === "post" ? "bg-orange-500" : "bg-gray-700"}`}
        >
          Post Blog
        </button>

        <button
          onClick={() => setActiveTab("list")}
          className={`w-full py-2 px-4 rounded ${activeTab === "list" ? "bg-orange-500" : "bg-gray-700"}`}
        >
          Blog List
        </button>

        <button
          onClick={() => setActiveTab("banner")}
          className={`w-full py-2 px-4 mt-4 rounded ${activeTab === "banner" ? "bg-orange-500" : "bg-gray-700"}`}
        >
          Banner Manager
        </button>

        <button
          onClick={() => setActiveTab("books")}
          className={`w-full py-2 px-4 mt-4 rounded ${activeTab === "books" ? "bg-orange-500" : "bg-gray-700"}`}
        >
          Book Manager
        </button>

        <button
          onClick={() => setActiveTab("live_course")}
          className={`w-full py-2 px-4 mt-4 rounded ${activeTab === "live_course" ? "bg-orange-500" : "bg-gray-700"}`}
        >
          Course Manager
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">

        {activeTab === "post" && (
          /* BLOG POST */
          <form onSubmit={submitHandler} className="w-1/2 flex flex-col gap-3">
            <input name="title" value={formData.title} onChange={onChangeHandler} placeholder="Blog Title" className="border p-2" required />
            <input name="category" value={formData.category} onChange={onChangeHandler} placeholder="Category" className="border p-2" required />
            <textarea name="description" value={formData.description} onChange={onChangeHandler} placeholder="Description" className="border p-2" required />
            <input name="price" value={formData.price} onChange={onChangeHandler} placeholder="Price" className="border p-2" required />
            <input name="offPrice" value={formData.offPrice} onChange={onChangeHandler} placeholder="OffPrice" className="border p-2" required />
            <input name="off" value={formData.off} onChange={onChangeHandler} placeholder="Off" className="border p-2" required />
            <input type="file" onChange={fileHandler} className="border p-2" required />
            <button className="bg-black text-white py-2">Post Blog</button>
          </form>
        )}

        {activeTab === "list" && (
          /* BLOG LIST */
          <table className="min-w-full border">
            <thead>
                <tr>
                  <th className='border p-2'>Title</th>
                  <th className='border p-2'>Category</th>
                  <th className='border p-2'>Description</th>
                  <th className='border p-2'>Price</th>
                  <th className='border p-2'>OffPrice</th>
                  <th className='border p-2'>Off</th>
                  <th className='border p-2'>Image</th>
                  <th className='border p-2'>Action</th>
                </tr>
              </thead>
            <tbody>
              {blogs.map((b) => (
                <tr key={b._id}>
                  <td className="border p-2">{b.title}</td>
                  <td className="border p-2">{b.category}</td>
                  <td className="border p-2">{b.description}</td>
                  <td className="border p-2">{b.price}</td>
                  <td className='border p-2'>{b.offPrice}</td>
                  <td className='border p-2'>{b.off}</td>
                  <td className="border p-2">
                    <img src={`http://localhost:5000/images/${b.image}`} className="w-16 mx-auto" />
                  </td>
                  <td className="border p-2">
                    <button onClick={() => removeBlog(b._id)} className="text-red-600 cursor-pointer pl-12"> X</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "banner" && (
          <>
            <div className="flex gap-4 mb-4">
              <button onClick={() => setBannerTab("bannerPost")} className="bg-blue-600 text-white px-4 py-2">Post Banner</button>
              <button onClick={() => setBannerTab("bannerList")} className="bg-green-600 text-white px-4 py-2">Banner List</button>
            </div>

            {bannerTab === "bannerPost" ? (
              <form onSubmit={submitBannerHandler} className="w-1/2 flex flex-col gap-3">
                <input name="title" value={bannerForm.title} onChange={bannerChangeHandler} placeholder="Title" className="border p-2" required />
                <input name="description" value={bannerForm.description} onChange={bannerChangeHandler} placeholder="Description" className="border p-2" required />
                <input name="price" value={bannerForm.price} onChange={bannerChangeHandler} placeholder="Price" className="border p-2" required />
                <input type="file" onChange={bannerFileHandler} className="border p-2" required />
                <button className="bg-black text-white py-2">Upload Banner</button>
              </form>
            ) : (
              <table className="min-w-full border">
                <thead>
                <tr>
                  <th className='border p-2'>Title</th>
                  <th className='border p-2'>Description</th>
                  <th className='border p-2'>Price</th>
                  <th className='border p-2'>Image</th>
                  <th className='border p-2'>Action</th>
                </tr>
              </thead>
                <tbody>
                  {banners.map((b) => (
                    <tr key={b._id}>
                      <td className="border p-2">{b.title}</td>
                      <td className="border p-2">{b.description}</td>
                      <td className="border p-2">{b.price}</td>
                      <td className="border p-2">
                        <img src={`http://localhost:5000/images/${b.image}`} className="w-32 mx-auto" />
                      </td>
                      <td className="border p-2">
                        <button onClick={() => removeBanner(b._id)} className="text-red-600">X</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}

        {activeTab === "books" && (
          <>
            <div className='flex gap-4 mb-4'>
              <button onClick={() => setBooksTab("booksPost")} className='bg-blue-600 text-white px-4 py-2'>Post Books</button>
              <button onClick={() => setBooksTab("booksList")} className='bg-green-600 text-white px-4 py-2'>Books List</button>
            </div>

            {booksTab === "booksPost" ? (
              <form onSubmit={submitBooksHandler} className='w-1/2 md:w-1/2 flex flex-col gap-3'>
                <input name='title' value={booksForm.title} onChange={booksChangeHandler} placeholder='Title' className='border p-2' required />
                <input name='category' value={booksForm.category} onChange={booksChangeHandler} placeholder='Category' className='border p-2' required />
                <input name='price' value={booksForm.price} onChange={booksChangeHandler} placeholder='Price' className='border p-2' required />
                <input name='amazonUrl' value={booksForm.amazonUrl} onChange={booksChangeHandler} placeholder='Amazon Url' className='border p-2' required />
                <input type="file" onChange={booksFileHandler} className='border p-2' required />
                <button className='bg-black text-white py-2'>Upload Books</button>
              </form>
            ) : (
              <table className='min-w-full border'>
                <thead>
                  <tr>
                    <th className='border p-2'>Title</th>
                    <th className='border p-2'>Category</th>
                    <th className='border p-2'>Price</th>
                    <th className='border p-2'>Amazon Url</th>
                    <th className='border p-2'>Image</th>
                    <th className='border p-2'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((b) => (
                    <tr key={b._id}>
                      <td className='border p-2'>{b.title}</td>
                      <td className='border p-2'>{b.category}</td>
                      <td className='border p-2'>{b.price}</td>
                      <td className='border p-2 line-clamp-6 w-50'>{b.amazonUrl}</td>
                      <td className='border p-2'>
                        <img src={`http://localhost:5000/images/${b.image}`} className='w-32 mx-auto' />
                      </td>
                      <td className='border p-2'>
                        <button onClick={() => removeBooks(b._id)} className='text-red-600'>X</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}

        {activeTab === "live_course" && (
          <>
            <div className='flex gap-4 mb-4'>
              <button onClick={() => setLive_courseTab("live_coursePost")} className='bg-blue-600 text-white px-4 py-4'>Post Course</button>
              <button onClick={() => setLive_courseTab("live_courseList")} className='bg-green-600 text-white px-4 py-4'>Course List</button>
            </div>

            {live_courseTab === "live_coursePost" ? (
              <form onSubmit={submitLive_courseHandler} className='w-1/2 md:w-1/2 flex flex-col gap-3' >
                <input name='title' value={live_courseForm.title} onChange={live_courseChangeHandler} placeholder='Title' className='border p-2' required />
                <input name='description' value={live_courseForm.description} onChange={live_courseChangeHandler} placeholder='Description' className='border p-2' required />
                <input name='nowPrice' value={live_courseForm.nowPrice} onChange={live_courseChangeHandler} placeholder='New Price' className='border p-2' required />
                <input name='beforePrice' value={live_courseForm.beforePrice} onChange={live_courseChangeHandler} placeholder='Before Price' className='border p-2' required />
                <input name='discount' value={live_courseForm.discount} onChange={live_courseChangeHandler} placeholder='Discount' className='border p-2' required />
                <input type="file" onChange={live_courseFileHandler} className='border p-2' required />
                <button className='bg-black text-white py-2'>Upload Books</button>
              </form>
            ) : (
              <table className='min-w-full border'>
                <thead>
                  <tr>
                    <th className='border p-2'>Title</th>
                    <th className='border p-2'>Description</th>
                    <th className='border p-2'>New Price</th>
                    <th className='border p-2'>Before Price</th>
                    <th className='border p-2'>Discount</th>
                    <th className='border p-2'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {live_course.map((b) => (
                    <tr key={b._id}>
                      <td className='border p-2'>{b.title}</td>
                      <td className='border p-2'>{b.description}</td>
                      <td className='border p-2'>{b.nowPrice}</td>
                      <td className='border p-2'>{b.beforePrice}</td>
                      <td className='border p-2'>{b.discount}</td>
                      <td className='border p-2'>
                        <img src={`http://localhost:5000/images/${b.image}`} className='w-32 mx-auto' />
                      </td>
                      <td className='border p-2'>
                        <button onClick={() => removeLive_course(b._id)} className='text-red-600'>X</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  deletePost,
  detailPost,
  getPost,
  updatePost,
} from "../../redux/api/post-api";
import PaddingContainer from "../../components/moleculars/padding-container/padding-container";
import { createSchema } from "../../yup-validation/formSchema";
import { setPostDetail } from "../../redux/action/glocalAction";

function Post() {
  const [formStatus, setFormStatus] = useState("create");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { post, post_detail } = useSelector((store) => store?.global);

  useEffect(() => {
    getPostFn();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPostFn = () => {
    dispatch(getPost());
  };

  const deletePostFn = (id) => {
    dispatch(deletePost(id));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: post_detail?.title ? post_detail.title : "",
      description: post_detail?.description ? post_detail.description : "",
      category_id: post_detail?.category_id ? post_detail.category_id : "",
      thumbnail: post_detail?.thumbnail ? post_detail.thumbnail : "",
      base_url: window.location.origin,
    },
    onSubmit: (values) => {
      values.category_id = parseInt(values.category_id);
      if (formStatus === "create") {
        dispatch(createPost(values));
        formik.resetForm();
      } else {
        dispatch(updatePost(values, post_detail?.id));
        formik.resetForm();
      }
    },
    validationSchema: createSchema,
  });

  const targetRef = useRef(null);

  const handleClick = (id) => {
    // Scroll to the target element using the `scrollIntoView` method
    targetRef.current.scrollIntoView({
      behavior: "smooth", // Use 'auto' for instant scrolling
      block: "start", // The vertical alignment: 'start', 'center', 'end', or 'nearest'
      inline: "nearest", // The horizontal alignment: 'start', 'center', 'end', or 'nearest'
    });
    setFormStatus("update");
    dispatch(detailPost(id));
  };

  const refresh = () => {
    setFormStatus("create");
    dispatch(setPostDetail(""));
  };

  const handleSearch = () => {
    dispatch(getPost(searchTerm));
  };

  return (
    <PaddingContainer>
      <div className="mt-10" />
      <div className="mb-2 border-b gap-5 flex py-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Breeds"
          className="p-3 text-sm text-gray-900 border border-gray-100 rounded-md bg-neutral-100 focus:ring-blue-500 focus:border-blue-500 "
        />
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 flex-col-reverse gap-10 md:grid-cols-2 ">
        <div className="grid grid-cols-1 items-start">
          <div ref={targetRef} className="border p-5">
            <button
              onClick={refresh}
              className="whitespace-nowrap rounded-md bg-neutral-200 px-3 py-2 text-neutral-600 hover:bg-neutral-700"
            >
              Refresh
            </button>
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 mb-2">
                <label htmlFor="" className="text-md text-neutral-600">
                  Pilih Kategori
                </label>
                <select
                  value={formik.values.category_id}
                  onChange={formik.handleChange("category_id")}
                  onBlur={formik.handleBlur("category_id")}
                  className="w-full rounded-md bg-white/80 px-3 py-2 text-base outline-none ring-orange-300 placeholder:text-sm focus:ring-2 md:w-auto border"
                >
                  <option value="">Pilih</option>
                  <option value="1">Olahraga</option>
                  <option value="2">Teknologi</option>
                  <option value="3">Makanan</option>
                </select>
                {formik.errors.category_id && formik.touched.category_id ? (
                  <div className="text-sm text-red-500">
                    {formik.errors.category_id}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="grid grid-cols-1 mb-2">
                <label htmlFor="" className="text-md text-neutral-600">
                  Title
                </label>
                <input
                  type="text"
                  value={formik.values.title}
                  onChange={formik.handleChange("title")}
                  onBlur={formik.handleBlur("title")}
                  placeholder="title"
                  className="w-full rounded-md bg-white/80 px-3 py-2 text-base outline-none ring-orange-300 placeholder:text-sm focus:ring-2 md:w-auto border"
                />
                {formik.errors.title && formik.touched.title ? (
                  <div className="text-sm text-red-500">
                    {formik.errors.title}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="grid grid-cols-1 mb-2">
                <label htmlFor="" className="text-md text-neutral-600">
                  Description
                </label>
                <textarea
                  value={formik.values.description}
                  onChange={formik.handleChange("description")}
                  onBlur={formik.handleBlur("description")}
                  placeholder="description"
                  className="w-full rounded-md bg-white/80 px-3 py-2 text-base outline-none ring-orange-300 placeholder:text-sm focus:ring-2 md:w-auto border"
                  cols="30"
                  rows="10"
                ></textarea>
                {formik.errors.description && formik.touched.description ? (
                  <div className="text-sm text-red-500">
                    {formik.errors.description}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="grid grid-cols-1 mb-2">
                <label htmlFor="" className="text-md text-neutral-600">
                  Thumbnail
                </label>
                <input
                  type="text"
                  value={formik.values.thumbnail}
                  onChange={formik.handleChange("thumbnail")}
                  onBlur={formik.handleBlur("thumbnail")}
                  placeholder="thumbnail"
                  className="w-full rounded-md bg-white/80 px-3 py-2 text-base outline-none ring-orange-300 placeholder:text-sm focus:ring-2 md:w-auto border"
                />
                {formik.errors.thumbnail && formik.touched.thumbnail ? (
                  <div className="text-sm text-red-500">
                    {formik.errors.thumbnail}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <button
                type="submit"
                className="whitespace-nowrap rounded-md bg-neutral-900 px-3 py-2 text-neutral-200 hover:bg-neutral-700"
              >
                {formStatus === "create" ? "Buat Post" : "Ubah Post"}
              </button>
            </form>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-20 lg:auto-cols-fr  ">
          {post.length > 0 ? (
            post.map((row, key) => (
              <div key={key} className="relative">
                <div className="absolute bottom-0 right-0  z-1000  rounded-tl-md ">
                  <button
                    onClick={() => handleClick(row.id)}
                    className="bg-green-200 text-green-600 p-2"
                  >
                    Ubah
                  </button>
                  <button
                    onClick={() => deletePostFn(row.id)}
                    className="bg-red-200 text-red-600 p-2"
                  >
                    Hapus
                  </button>
                </div>
                <div className="rounded w-100 overflow-hidden shadow-lg">
                  <img
                    className="w-full"
                    src={`${row.thumbnail}`}
                    alt="Sunset in the mountains"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{row.title} </div>
                    <p className="text-gray-700 text-base text-justify line-clamp-2">
                      {row.description}
                    </p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      {row.category_title}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className=" text-sm">
              {`Oops, maaf keyword yang ada masukan tidak ditemukan, silahkan
              gunakan keyword yang lain: `}
              <span className="font-bold">{searchTerm}</span>
            </div>
          )}
        </div>
      </div>
      <div className="mt-10" />
    </PaddingContainer>
  );
}

export default Post;

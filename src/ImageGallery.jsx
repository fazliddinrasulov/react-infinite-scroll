import { useState, useEffect } from "react";
import axios from "axios";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/?client_id=jIRQOyAjuOjVo_kqu-2uIyYAOnuYDRMBRWdsSLcEpiI&page=${page}`
      );
      const newImages = response.data;
      setImages((prevImages) => [...prevImages, ...newImages]);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    } catch (error) {
      console.log("Something went wrong:", error);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setLoading(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!loading) return;
    fetchImages();
  }, [loading]);

  return (
    <>
      <h1 className="title ">Photo Gallery</h1>
      <div className="title-underline"></div>
      <main className="image-container">
        {images.map((image, index) => (
          <img
            className="img"
            key={index}
            src={image.urls.small}
            alt={image.alt_description}
          />
        ))}
        {loading && <p>Loading more images...</p>}
      </main>
    </>
  );
};

export default ImageGallery;

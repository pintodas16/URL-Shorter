import { useEffect, useState } from "react";
import UrlList from "./components/UrlList";
import Form from "./components/form";

function App() {
  const [urls, setUrls] = useState(() => {
    return JSON.parse(localStorage.getItem("urls")) || [];
  });
  const [url, setUrl] = useState("");

  useEffect(() => {
    localStorage.setItem("urls", JSON.stringify(urls));
  }, [urls]);

  // useEffect(() => {
  //   const savedUrls = localStorage.getItem("urls");
  //   if (savedUrls) {
  //     setUrls(JSON.parse(savedUrls));
  //   }
  // }, []);

  const handleChange = (e) => {
    setUrl(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setUrls([...urls, { id: urls.length + 1, url }]);
    setUrl("");
  };

  const deleteUrl = (id) => {
    const newUrls = urls.filter((url) => url.id !== id);
    setUrls(newUrls);
  };

  const editUrl = (id) => {};

  return (
    <>
      <Form
        handleChange={handleChange}
        value={url}
        handleSubmit={handleSubmit}
      />
      <UrlList urls={urls} deleteUrl={deleteUrl} editUrl={editUrl} />
    </>
  );
}

export default App;

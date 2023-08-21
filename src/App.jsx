import axios from "axios";
import { useEffect, useState } from "react";
import UrlList from "./components/UrlList";
import Form from "./components/form";

async function urlShort(url) {
  const shortUrl = await axios.get(
    `https://api.shrtco.de/v2/shorten?url=${url}`
  );
  // console.log(shortUrl.data.result.full_short_link);
  return shortUrl.data.result.full_short_link;
}

function IdGenerate(urls) {
  const id = urls.reduce((accumulator, value) => {
    return Math.max(accumulator, value.id);
  }, 0);
  return id + 1;
}

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUrls([...urls, { id: IdGenerate(urls), url: await urlShort(url) }]);
    setUrl("");
  };

  const deleteUrl = (id) => {
    const newUrls = urls.filter((url) => url.id !== id);
    setUrls(newUrls);
  };

  const editUrl = (id, editUrl) => {
    console.log(editUrl, id);
    const editedUrl = urls.map((value) => {
      if (value.id === id) {
        return { ...value, url: editUrl };
      }
      return value;
    });
    setUrls(editedUrl);
  };

  return (
    <div className="bg-gray-500">
      <Form
        handleChange={handleChange}
        value={url}
        handleSubmit={handleSubmit}
      />
      <UrlList urls={urls} deleteUrl={deleteUrl} editUrl={editUrl} />
    </div>
  );
}

export default App;

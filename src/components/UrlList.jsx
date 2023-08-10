/* eslint-disable react/prop-types */
import Url from "./Url";
function UrlList({ urls, deleteUrl, editUrl }) {
  let content = "";
  urls.length > 0
    ? (content = urls.map((url) => (
        <li key={url.id} className="mb-4">
          <Url url={url} deleteUrl={deleteUrl} editUrl={editUrl} />
        </li>
      )))
    : (content = null);

  return <ul>{content}</ul>;
}
export default UrlList;

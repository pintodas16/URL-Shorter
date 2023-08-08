import Url from "./Url";
function UrlList({ urls, deleteUrl }) {
  let content = "";
  urls.length > 0
    ? (content = urls.map((url) => (
        <Url key={url.id} url={url} deleteUrl={deleteUrl} />
      )))
    : (content = null);

  return content;
}
export default UrlList;

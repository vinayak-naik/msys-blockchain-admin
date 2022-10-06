export const uploadNftImageToNext = async (formData: any) => {
  return fetch("http://localhost:3000/api/nft/upload", {
    method: "POST",
    body: formData,
    headers: {},
  })
    .then((response) => response.json())
    .catch(() => {});
};

export const uploadArticleImage = async (formData: any) => {
  return fetch("http://localhost:3000/api/article/image/upload", {
    method: "POST",
    body: formData,
    headers: {},
  })
    .then((response) => response.json())
    .catch(() => {});
};
export const addArticle = async (formData: any) => {
  return fetch("http://localhost:3000/api/article/json/add", {
    method: "POST",
    body: formData,
    headers: {},
  })
    .then((response) => response.json())
    .catch(() => {});
};
export const getArticles = async () => {
  return fetch("http://localhost:3000/api/article/json/getList")
    .then((response) => response.json())
    .catch(() => {});
};
export const getArticle = async (fileName: string) => {
  return fetch(`http://localhost:3000/api/article/json/${fileName}`)
    .then((response) => response.json())
    .catch(() => {});
};

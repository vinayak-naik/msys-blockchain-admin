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
  return fetch("http://localhost:3000/api/article/upload", {
    method: "POST",
    body: formData,
    headers: {},
  })
    .then((response) => response.json())
    .catch(() => {});
};
export const addArticle = async (formData: any) => {
  return fetch("http://localhost:3000/api/article/add", {
    method: "POST",
    body: formData,
    headers: {},
  })
    .then((response) => response.json())
    .catch(() => {});
};

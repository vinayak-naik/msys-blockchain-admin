// const vercelHost = "https://msys-blockchain-admin.vercel.app/api";
// const host = vercelHost;

const localHost = "http://localhost:3000/api";
const host = localHost;

export const uploadNftImageToNext = async (formData: any) => {
  return fetch(`${host}/nft/upload`, {
    method: "POST",
    body: formData,
    headers: {},
  })
    .then((response) => response.json())
    .catch(() => {});
};

export const uploadArticleImage = async (formData: any) => {
  return fetch(`${host}/article/image/upload`, {
    method: "POST",
    body: formData,
    headers: {},
  })
    .then((response) => response.json())
    .catch(() => {});
};
export const addArticle = async (formData: any) => {
  return fetch(`${host}/article/json/add`, {
    method: "POST",
    body: formData,
    headers: {},
  })
    .then((response) => response.json())
    .catch(() => {});
};
export const getArticles = async () => {
  return fetch(`${host}/article/json/getList`)
    .then((response) => response.json())
    .catch(() => {});
};
export const getArticle = async (fileName: string) => {
  return fetch(`${host}/article/json/${fileName}`)
    .then((response) => response.json())
    .catch(() => {});
};
export const getGuides = async () => {
  return fetch(`${host}/guide/json/getList`)
    .then((response) => response.json())
    .catch(() => {});
};
export const getGuide = async (fileName: string) => {
  return fetch(`${host}/guide/json/${fileName}`)
    .then((response) => response.json())
    .catch(() => {});
};
export const uploadGuideImage = async (formData: any) => {
  return fetch(`${host}/guide/image/upload`, {
    method: "POST",
    body: formData,
    headers: {},
  })
    .then((response) => response.json())
    .catch(() => {});
};
export const addGuide = async (formData: any) => {
  return fetch(`${host}/guide/json/add`, {
    method: "POST",
    body: formData,
    headers: {},
  })
    .then((response) => response.json())
    .catch(() => {});
};

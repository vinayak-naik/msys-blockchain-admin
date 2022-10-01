const PINATA_FILE_URL = `${process.env.NEXT_PUBLIC_PINATA_FILE_URL}`;
const PINATA_JSON_URL = `${process.env.NEXT_PUBLIC_PINATA_JSON_URL}`;
const PINATA_API_KEY = `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`;
const PINATA_SECRET_API_KEY = `${process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY}`;

export const uploadImageToPinata = async (formData: any) => {
  return fetch(PINATA_FILE_URL, {
    method: "POST",
    body: formData,
    headers: {
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET_API_KEY,
    },
  })
    .then((response) => response.json())
    .catch(() => {});
};

export const uploadJsonToPinata = async (formData: any) => {
  return fetch(PINATA_JSON_URL, {
    method: "POST",
    body: formData,
    headers: {
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET_API_KEY,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch(() => {});
};

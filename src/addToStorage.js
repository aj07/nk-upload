import { NFTStorage, File } from "nft.storage";
const token = process.env.REACT_APP_API_KEY;
const endpoint = "https://api.nft.storage";

export const addJsonToStorage = async (json, file) => {
  try {
    const storage = new NFTStorage({ endpoint, token });
    json.image = new File([file], file.name, {
      type: file.type,
    });
    console.log(json);
    var metadata = await storage.store(json);
      return metadata;
  } catch (err) {
    console.log(err);
  }
};

// export const addJsonToStorage = (json) => {};

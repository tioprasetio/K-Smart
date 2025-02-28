import { Product } from "../../data/products";
import api from "../axiosInstance";

export const getProduct = async (): Promise<Product[]> => {
  try {
    const response = await api.get("/product");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.data.documents.map((doc: any) => ({
      id: parseInt(doc.name.split("/").pop(), 10), // Assuming ID is a number
      name: doc.fields.name.stringValue,
      picture: doc.fields.picture.stringValue,
      harga: parseInt(doc.fields.harga.integerValue, 10),
      rate: doc.fields.rate.stringValue,
      terjual: parseInt(doc.fields.terjual.integerValue, 10),
      beratPengiriman: parseInt(doc.fields.beratPengiriman.integerValue, 10),
      beratBersih: parseInt(doc.fields.beratBersih.integerValue, 10),
      pemesananMin: parseInt(doc.fields.pemesananMin.integerValue, 10),
      deskripsi: doc.fields.deskripsi.stringValue,
      category: doc.fields.category.stringValue,
      bv: parseInt(doc.fields.bv.integerValue, 10),
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getBestSellers = async (): Promise<Product[]> => {
  try {
    const response = await api.get("/best_sellers"); // Ambil dari endpoint best_sellers
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.data.documents.map((doc: any) => ({
      id: parseInt(doc.name.split("/").pop(), 10),
      name: doc.fields.name.stringValue,
      picture: doc.fields.picture.stringValue,
      harga: parseInt(doc.fields.harga.integerValue, 10),
      rate: doc.fields.rate.stringValue,
      terjual: parseInt(doc.fields.terjual.integerValue, 10),
      beratPengiriman: parseInt(doc.fields.beratPengiriman.integerValue, 10),
      beratBersih: parseInt(doc.fields.beratBersih.integerValue, 10),
      pemesananMin: parseInt(doc.fields.pemesananMin.integerValue, 10),
      deskripsi: doc.fields.deskripsi.stringValue,
      category: doc.fields.category.stringValue,
      bv: parseInt(doc.fields.bv.integerValue, 10),
    }));
  } catch (error) {
    console.error("Error fetching best sellers:", error);
    throw error;
  }
};
import { Voucher } from "../../data/vouchers";
import api from "../axiosInstance";

export const getVoucher = async (): Promise<Voucher[]> => {
  try {
    const response = await api.get("/vouchers");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.data.documents.map((doc: any) => ({
      id: parseInt(doc.name.split("/").pop(), 10),
      code: doc.fields.code.stringValue,
      image: doc.fields.image.stringValue,
      discount: parseInt(doc.fields.discount.integerValue, 10),
      valid: doc.fields.valid.booleanValue,
    }));
  } catch (error) {
    console.error("Error fetching promo:", error);
    throw error;
  }
};

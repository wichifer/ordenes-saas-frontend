import { api } from "@/api/api";

import type { Product } from "../types/product";


export const productsService = {


  async getAll() {

    const {
      data,
    } = await api.get<Product[]>(
      "/products",
    );


    return data;

  },


  async getById(
    id:number,
  ) {

    const {
      data,
    } = await api.get<Product>(
      `/products/${id}`,
    );


    return data;

  },


};
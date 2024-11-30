import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { getProductsAPI } from "../../../services/customer/Products.service";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const STALE_TIME_FIVE_MINUTES = 5 * 60 * 1000;

export default function ViewProducts() {
  const location = useLocation();

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    const subCatId = params.get("sub_cat_id");
    const catId = params.get("cat_id");

    return { subCatId, catId };
  };

  const { subCatId, catId } = getQueryParams();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", subCatId, catId],
    queryFn: () => getProductsAPI(subCatId, catId),
    staleTime: STALE_TIME_FIVE_MINUTES,
  });

  if (isError) {
    toast.error("An error occurred! Please try again.");
  }

  return <div>ViewProducts</div>;
}

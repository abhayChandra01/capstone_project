import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProductsAPI } from "../../../services/customer/Products.service";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Loading from "../../../components/Shared/Loading/Loading";
import { useAppContext } from "../../../context/AppProvider";
import { IoIosArrowForward } from "react-icons/io";
import ProductCard from "../../../components/Customer/ProductsCard/ProductsCard";

const STALE_TIME_FIVE_MINUTES = 5 * 60 * 1000;

const discountsAvailable = ["Below 10", "10-20", "Above 20"];

const priceRange = ["Below 10K", "10K-30K", "30K-70K", "Above 70K"];

export default function ViewProducts() {
  const location = useLocation();
  const navigate = useNavigate();
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    const subCatId = params.get("sub_cat_id");
    const catId = params.get("cat_id");

    return { subCatId, catId };
  };

  const { subCatId, catId } = getQueryParams();
  const { categories } = useAppContext();
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedSubCatId, setSelectedSubCatId] = useState<string | null>(
    subCatId
  );
  const [selectedDiscount, setSelectedDiscount] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
    null
  );

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      "products",
      subCatId,
      catId,
      selectedDiscount,
      selectedPriceRange,
    ],
    queryFn: () =>
      getProductsAPI(subCatId, catId, selectedDiscount, selectedPriceRange),
    staleTime: STALE_TIME_FIVE_MINUTES,
  });

  if (isError) {
    toast.error("An error occurred! Please try again.");
  }

  const updateCategoryNames = () => {
    const foundCategoryName =
      categories.find((cat) => cat.category_id === catId)?.category_name || "";

    const foundSubCategoryName =
      categories
        .find((cat) => cat.category_id === catId)
        ?.sub_categories?.find((sub) => sub.sub_category_id === subCatId)
        ?.sub_category_name || "";

    setCategoryName(foundCategoryName);
    setSubCategoryName(foundSubCategoryName);
  };

  const handleCatNameClick = () => {
    const params = new URLSearchParams(location.search);
    params.delete("sub_cat_id");
    navigate(`?${params.toString()}`);
  };

  const handleSubCategoryChange = (subCatId: string) => {
    const params = new URLSearchParams(location.search);
    if (params.get("sub_cat_id") === subCatId) {
      params.delete("sub_cat_id");
    } else {
      params.set("sub_cat_id", subCatId);
    }
    navigate(`?${params.toString()}`);
    setSelectedSubCatId(subCatId);
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams(location.search);
    if (params.get("sub_cat_id")) {
      params.delete("sub_cat_id");
      navigate(`?${params.toString()}`);
    }
    setSelectedDiscount(null);
    setSelectedPriceRange(null);
  };

  const handleDiscountChange = (value: string) => {
    if (value === selectedDiscount) {
      setSelectedDiscount(null);
    } else {
      setSelectedDiscount(value);
    }
  };

  const handlePriceRangeChange = (value: string) => {
    if (value === selectedPriceRange) {
      setSelectedPriceRange(null);
    } else {
      setSelectedPriceRange(value);
    }
  };

  useEffect(() => {
    if (catId || subCatId) {
      updateCategoryNames();
      setSelectedSubCatId(subCatId);
    }
  }, [categories, catId, subCatId]);

  return (
    <div className="flex flex-col md:flex-row">
      {isLoading ? <Loading fullscreen={true} /> : null}

      <div className="w-full md:w-[20%] border-r border-gray-200 bg-gray-50 p-4 md:h-[calc(100vh-95.11px)] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          {selectedDiscount || selectedPriceRange || selectedSubCatId ? (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-[#8863FB] font-semibold hover:underline text-sm px-4 rounded"
            >
              Clear filters
            </button>
          ) : null}
        </div>
        <div className="flex gap-4 flex-wrap flex-row md:flex-col">
          {categories.find((cat) => cat.category_id === catId)
            ?.sub_categories ? (
            <div>
              <h3 className="font-medium mb-2">Select a sub-category</h3>
              <div className="space-y-2 text-sm">
                {categories
                  .find((cat) => cat.category_id === catId)
                  ?.sub_categories?.map((sub) => (
                    <div
                      key={sub.sub_category_id}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id={`subCategory-${sub.sub_category_id}`}
                        checked={selectedSubCatId === sub.sub_category_id}
                        onChange={() =>
                          handleSubCategoryChange(sub.sub_category_id)
                        }
                        className="h-4 w-4"
                      />
                      <label
                        htmlFor={`subCategory-${sub.sub_category_id}`}
                        className="cursor-pointer"
                      >
                        {sub.sub_category_name}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          ) : null}

          <div className="">
            <h3 className="font-medium mb-2">Select a discount range</h3>
            <div className="space-y-2 text-sm">
              {discountsAvailable?.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    id={`checkbox-${index}`}
                    type="checkbox"
                    checked={selectedDiscount === item}
                    onChange={() => handleDiscountChange(item)}
                    className="h-4 w-4"
                  />
                  <label className="cursor-pointer">{item}%</label>
                </div>
              ))}
            </div>
          </div>

          <div className="">
            <h3 className="font-medium mb-2">Select a price range</h3>
            <div className="space-y-2 text-sm">
              {priceRange?.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    id={`checkbox-price-${index}`}
                    type="checkbox"
                    checked={selectedPriceRange === item}
                    onChange={() => handlePriceRangeChange(item)}
                    className="h-4 w-4"
                  />
                  <label className="cursor-pointer">{item}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-[80%] p-5 h-fit flex flex-wrap gap-5">
        <div className="w-full text-gray-700 flex items-center gap-2">
          {categoryName && (
            <h1
              className="text-2xl font-semibold cursor-pointer hover:scale-105 transition-all duration-150 ease-in-out"
              onClick={handleCatNameClick}
            >
              {categoryName}
            </h1>
          )}
          {subCategoryName && (
            <span className="flex items-center gap-2">
              <IoIosArrowForward />
              <h2 className="text-lg text-gray-500">{subCategoryName}</h2>
            </span>
          )}
        </div>

        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {products?.length === 0 && !isLoading ? (
          <div className="flex flex-col items-center w-full text-lg text-gray-400">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-illustration-download-in-svg-png-gif-file-formats--available-product-tokostore-pack-e-commerce-shopping-illustrations-2809510.png"
              className="w-full max-w-lg"
            />
            No products available!
          </div>
        ) : null}
      </div>
    </div>
  );
}

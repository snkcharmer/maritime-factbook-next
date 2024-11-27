'use client';

import { useState } from 'react';
import { IFbSubCategory, IFbSubCategoryByCategoryResponse } from '@/types';
import { handleRequest } from '@/utils/handleRequest';

export const useFbSubCategory = <T>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const fetchFbSubCategories = async () => {
    return handleRequest<IFbSubCategory[]>(
      `/api/fbSubCategory`,
      setLoading,
      setError,
      setData
    );
  };

  const getFbSubCategoryById = async (id: string) => {
    return handleRequest<IFbSubCategory>(
      `/api/fbSubCategory/${id}`,
      setLoading,
      setError
    );
  };

  const createFbSubCategory = async (
    fbSubCategoryData: Partial<IFbSubCategory>
  ) => {
    return handleRequest<IFbSubCategory>(
      `/api/fbSubCategory`,
      setLoading,
      setError,
      setData,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fbSubCategoryData),
      }
    );
  };

  const updateFbSubCategory = async (
    id: string,
    updatedData: IFbSubCategory
  ) => {
    return handleRequest<IFbSubCategory>(
      `/api/fbSubCategory/${id}`,
      setLoading,
      setError,
      setData,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      }
    );
  };

  const deleteFbSubCategory = async (id: string) => {
    return handleRequest<void>(
      `/api/fbSubCategory/${id}`,
      setLoading,
      setError,
      undefined,
      {
        method: 'DELETE',
      }
    );
  };

  const fetchFbSubCategoriesByCategoryId = async (fbCategoryId: string) => {
    return handleRequest<IFbSubCategoryByCategoryResponse>(
      `/api/fbSubCategory/category/${fbCategoryId}`,
      setLoading,
      setError,
      setData
    );
  };

  const resetData = () => setData(null);

  return {
    loading,
    error,
    data,
    resetData,
    fetchFbSubCategories,
    getFbSubCategoryById,
    createFbSubCategory,
    updateFbSubCategory,
    deleteFbSubCategory,
    fetchFbSubCategoriesByCategoryId,
  };
};

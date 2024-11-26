'use client';

import { useState } from 'react';
import { IFbSubCategory } from '@/types';

export const useFbSubCategory = <T>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const handleRequest = async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<{ success: boolean; data?: T; error?: string }> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(endpoint, options);

      if (!res.ok) {
        const errorResponse = await res.json();
        setError(errorResponse.error || 'Failed to process the request');
        setLoading(false);
        return { success: false, error: errorResponse.error };
      }

      const result = await res.json();
      setData(result);
      setLoading(false);
      return { success: true, data: result };
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred');
      setLoading(false);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const fetchFbSubCategories = async () => {
    return handleRequest<IFbSubCategory[]>(`/api/fbSubCategory`);
  };

  const getFbSubCategoryById = async (id: string) => {
    return handleRequest<IFbSubCategory>(`/api/fbSubCategory/${id}`);
  };

  const createFbSubCategory = async (
    fbSubCategoryData: Partial<IFbSubCategory>
  ) => {
    return handleRequest<IFbSubCategory>(`/api/fbSubCategory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fbSubCategoryData),
    });
  };

  const updateFbSubCategory = async (
    id: string,
    updatedData: IFbSubCategory
  ) => {
    return handleRequest<IFbSubCategory>(`/api/fbSubCategory/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
  };

  const deleteFbSubCategory = async (id: string) => {
    return handleRequest<void>(`/api/fbSubCategory/${id}`, {
      method: 'DELETE',
    });
  };

  const fetchFbSubCategoriesByCategoryId = async (fbCategoryId: string) => {
    return handleRequest<IFbSubCategory[]>(
      `/api/fbSubCategory/category/${fbCategoryId}`
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

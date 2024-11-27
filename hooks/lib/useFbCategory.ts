'use client';

import { useState } from 'react';
import { IFbCategory } from '@/types';
import { handleRequest } from '@/utils/handleRequest';

export const useFbCategory = <T>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const fetchFbCategories = async () => {
    return handleRequest<IFbCategory[]>(
      `/api/fbCategory`,
      setLoading,
      setError,
      setData
    );
  };

  const getFbCategoryById = async (id: string) => {
    return handleRequest<IFbCategory>(
      `/api/fbCategory/${id}`,
      setLoading,
      setError,
      setData
    );
  };

  const createFbCategory = async (fbCategoryData: Partial<IFbCategory>) => {
    return handleRequest<IFbCategory>(
      `/api/fbCategory`,
      setLoading,
      setError,
      setData,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fbCategoryData),
      }
    );
  };

  const updateFbCategory = async (id: string, updatedData: IFbCategory) => {
    return handleRequest<IFbCategory>(
      `/api/fbCategory/${id}`,
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

  const deleteFbCategory = async (id: string) => {
    return handleRequest<void>(
      `/api/fbCategory/${id}`,
      setLoading,
      setError,
      setData,
      {
        method: 'DELETE',
      }
    );
  };

  return {
    loading,
    error,
    data,
    fetchFbCategories,
    getFbCategoryById,
    createFbCategory,
    updateFbCategory,
    deleteFbCategory,
  };
};

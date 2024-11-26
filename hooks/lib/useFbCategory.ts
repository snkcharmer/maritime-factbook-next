'use client';

import { useState } from 'react';
import { IFbCategory, TFbCategoryResponse } from '@/types';

export const useFbCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TFbCategoryResponse | null>(null);

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
        return { success: false, error: errorResponse.error };
      }

      const result = await res.json();
      setData(result);
      return { success: true, data: result };
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred');
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const fetchFbCategories = async () => {
    return handleRequest<IFbCategory[]>(`/api/fbCategory`);
  };

  const getFbCategoryById = async (id: string) => {
    return handleRequest<IFbCategory>(`/api/fbCategory/${id}`);
  };

  const createFbCategory = async (fbCategoryData: Partial<IFbCategory>) => {
    return handleRequest<IFbCategory>(`/api/fbCategory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fbCategoryData),
    });
  };

  const updateFbCategory = async (id: string, updatedData: IFbCategory) => {
    return handleRequest<IFbCategory>(`/api/fbCategory/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
  };

  const deleteFbCategory = async (id: string) => {
    return handleRequest<void>(`/api/fbCategory/${id}`, {
      method: 'DELETE',
    });
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

'use client';

import { useState } from 'react';
import { handleRequest } from '@/utils/handleRequest';
import { IUserCategory, TUserCategoryResponse } from '@/types';

export const useUserCategory = <T>() => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  // Fetch all user categories
  const fetchUserCategories = async () => {
    return handleRequest<TUserCategoryResponse>(
      `/api/user-category`,
      setLoading,
      setError,
      setData
    );
  };

  // Create a new user category
  const createUserCategory = async (
    userCategoryData: Partial<IUserCategory>
  ) => {
    return handleRequest<IUserCategory>(
      `/api/user-category`,
      setLoading,
      setError,
      setData,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCategoryData),
      }
    );
  };

  return {
    loading,
    error,
    data,
    fetchUserCategories,
    createUserCategory,
  };
};

'use client';

import { IFbTableData } from '@/app/types';
import { useState } from 'react';

export const useFbTable = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<IFbTableData | IFbTableData[] | null>(null);

  const createFbTable = async (fbTableData: Partial<IFbTableData>) => {
    setLoading(true);
    setError(null);
    console.log('submitted table:', fbTableData);

    try {
      const res = await fetch('/api/fbTable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fbTableData),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        setError(errorResponse.error || 'Failed to create fbTable entry');
        return { success: false, error: errorResponse.error };
      }

      const result = await res.json();
      setData(result);
      return { success: true, data: result };
    } catch (err) {
      console.log(err);
      setError('An unexpected error occurred');
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const getFbTable = async (userId: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/fbTable/${userId}`);
      if (!res.ok) {
        const errorResponse = await res.json();
        setError(errorResponse.error || 'Failed to fetch fbTable data');
        return { success: false, error: errorResponse.error };
      }

      const result = await res.json();
      setData(result);
      return { success: true, data: result };
    } catch (err) {
      console.log(err);
      setError('An unexpected error occurred');
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const updateFbTable = async (
    fbTableId: string,
    updatedData: IFbTableData
  ) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/fbTable/${fbTableId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        setError(errorResponse.error || 'Failed to update fbTable entry');
        return { success: false, error: errorResponse.error };
      }

      const result = await res.json();
      setData(result);
      return { success: true, data: result };
    } catch (err) {
      console.log(err);
      setError('An unexpected error occurred');
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const deleteFbTable = async (fbTableId: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/fbTable/${fbTableId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        setError(errorResponse.error || 'Failed to delete fbTable entry');
        return { success: false, error: errorResponse.error };
      }

      setData(null);
      return { success: true };
    } catch (err) {
      console.log(err);
      setError('An unexpected error occurred');
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    createFbTable,
    getFbTable,
    updateFbTable,
    deleteFbTable,
  };
};

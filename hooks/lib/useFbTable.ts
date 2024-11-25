'use client';

import { useState } from 'react';
import { IFbTable, TFbTableResponse } from '@/types';

export const useFbTable = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TFbTableResponse | null>(null);

  // Generic API handler
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

  // Fetch all fbTables
  const fetchFbTables = async () => {
    return handleRequest<IFbTable[]>(`/api/fbTable`);
  };

  // Fetch fbTable by userId
  const getFbTableByUserId = async (userId: string) => {
    return handleRequest<IFbTable>(`/api/fbTable/${userId}`);
  };

  // Create a new fbTable
  const createFbTable = async (fbTableData: Partial<IFbTable>) => {
    return handleRequest<IFbTable>(`/api/fbTable`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fbTableData),
    });
  };

  // Update an existing fbTable
  const updateFbTable = async (fbTableId: string, updatedData: IFbTable) => {
    return handleRequest<IFbTable>(`/api/fbTable/${fbTableId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
  };

  // Delete an fbTable
  const deleteFbTable = async (fbTableId: string) => {
    return handleRequest<void>(`/api/fbTable/${fbTableId}`, {
      method: 'DELETE',
    });
  };

  return {
    loading,
    error,
    data,
    fetchFbTables,
    getFbTableByUserId,
    createFbTable,
    updateFbTable,
    deleteFbTable,
  };
};

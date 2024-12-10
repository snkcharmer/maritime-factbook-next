import { IFbTableAssignee } from '@/types';
import { handleRequest } from '@/utils/handleRequest';
import { useState } from 'react';

export const useFbTableAssignee = <T>() => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const assignTableToUser = async (data: Partial<IFbTableAssignee>) => {
    return handleRequest<IFbTableAssignee>(
      `/api/fbTableAssignee`,
      setLoading,
      setError,
      setData,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
  };

  const fetchFbTableAssignees = async () => {
    return handleRequest<IFbTableAssignee[]>(
      `/api/fbTableAssignee`,
      setLoading,
      setError,
      setData
    );
  };

  const fetchFbTableAssigneeByUserId = async (userId: string) => {
    return handleRequest<IFbTableAssignee>(
      `/api/fbTableAssignee/user/${userId}`,
      setLoading,
      setError,
      setData
    );
  };

  const getFbTableAssigneeById = async (id: string) => {
    return handleRequest<IFbTableAssignee>(
      `/api/fbTableAssignee/${id}`,
      setLoading,
      setError,
      setData
    );
  };

  const fetchFbTableAssigneeByFbTableId = async (fbTableId: string) => {
    return handleRequest<IFbTableAssignee[]>(
      `/api/fbTableAssignee/fbTable/${fbTableId}`,
      setLoading,
      setError,
      setData
    );
  };

  const updateFbTableAssignee = async (id: string, data: IFbTableAssignee) => {
    return handleRequest<IFbTableAssignee>(
      `/api/fbTableAssignee/${id}`,
      setLoading,
      setError,
      setData,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
  };

  return {
    loading,
    error,
    data,
    assignTableToUser,
    fetchFbTableAssignees,
    fetchFbTableAssigneeByUserId,
    getFbTableAssigneeById,
    updateFbTableAssignee,
    fetchFbTableAssigneeByFbTableId,
  };
};

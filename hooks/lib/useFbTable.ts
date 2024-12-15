"use client";

import { useState } from "react";
import { IFbTable } from "@/types";
import { handleRequest } from "@/utils/handleRequest";

export const useFbTable = <T>() => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  // Fetch all fbTables
  const fetchFbTables = async () => {
    return handleRequest<IFbTable[]>(
      `/api/fbTable`,
      setLoading,
      setError,
      setData
    );
  };

  // Fetch fbTable by userId
  const getFbTableByUserId = async (userId: string) => {
    return handleRequest<IFbTable>(
      `/api/fbTable/${userId}`,
      setLoading,
      setError,
      setData
    );
  };

  // Fetch fbTable by slug
  const getFbTableBySlug = async (slug: string) => {
    return handleRequest<IFbTable>(
      `/api/fbTable/slug/${slug}`,
      setLoading,
      setError,
      setData
    );
  };

  const getFbTableById = async (id: string) => {
    return handleRequest<IFbTable>(
      `/api/fbTable/${id}`,
      setLoading,
      setError,
      setData
    );
  };

  const getFbTableByFbCategoryId = async (id: string) => {
    return handleRequest<IFbTable[]>(
      `/api/fbTable/fbCategory/${id}`,
      setLoading,
      setError,
      setData
    );
  };

  // Create a new fbTable
  const createFbTable = async (fbTableData: Partial<IFbTable>) => {
    return handleRequest<IFbTable>(
      `/api/fbTable`,
      setLoading,
      setError,
      setData,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fbTableData),
      }
    );
  };

  // Update an existing fbTable
  const updateFbTable = async (
    fbTableId: string,
    updatedData: Partial<IFbTable>
  ) => {
    return handleRequest<IFbTable>(
      `/api/fbTable/${fbTableId}`,
      setLoading,
      setError,
      setData,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: updatedData.data }),
      }
    );
  };

  // Update an existing fbTable and with all fbTableAssignees
  const updateFbTableAndAssignees = async (
    fbTableId: string,
    data: Partial<IFbTable>
  ) => {
    return handleRequest<IFbTable>(
      `/api/fbTable/${fbTableId}/sync-assignees`,
      setLoading,
      setError,
      setData,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
  };

  // Delete an fbTable
  const deleteFbTable = async (fbTableId: string) => {
    return handleRequest<void>(
      `/api/fbTable/${fbTableId}`,
      setLoading,
      setError,
      setData,
      {
        method: "DELETE",
      }
    );
  };

  return {
    loading,
    error,
    data,
    fetchFbTables,
    getFbTableByUserId,
    getFbTableBySlug,
    getFbTableByFbCategoryId,
    getFbTableById,
    createFbTable,
    updateFbTable,
    updateFbTableAndAssignees,
    deleteFbTable,
  };
};

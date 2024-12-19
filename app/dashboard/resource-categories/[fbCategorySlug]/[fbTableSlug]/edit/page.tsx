"use client";
import { DynamicTableMaker } from "@/components/admin/table-maker";
import { PageContainer } from "@/components/reusable";
import { useFbTable } from "@/hooks";
import { IFbTable } from "@/types";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const EditTable = () => {
  const { fbCategorySlug, fbTableSlug } = useParams();
  const { data = null, getFbTableBySlug } = useFbTable<IFbTable>();

  useEffect(() => {
    if (fbTableSlug) {
      getFbTableBySlug(fbTableSlug as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fbTableSlug]);

  console.log(data);

  return (
    <PageContainer title="Updating table">
      <DynamicTableMaker data={data as IFbTable} />
    </PageContainer>
  );
};

export default EditTable;

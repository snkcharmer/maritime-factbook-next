"use client";
import { ROUTES } from "@/constants";
import { useFbCategory } from "@/hooks";
import { TFbCategoryResponse } from "@/types";
import { createPath } from "@/utils/route";
import { Title, Text, Group } from "@mantine/core";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export interface ICardItem {
  title: string;
  icon: string;
  icon2?: string;
  href: string;
  slug: string;
}

export const staticCardItems = [
  {
    icon: "/categories/stats.png",
    icon2: "/categories/stats2.png",
  },
  {
    icon: "/categories/helm.png",
    icon2: "/categories/helm2.png",
  },
  {
    icon: "/categories/cargo-ship.png",
    icon2: "/categories/cargo-ship2.png",
  },
  {
    icon: "/categories/anchor.png",
    icon2: "/categories/anchor2.png",
  },
  {
    icon: "/categories/captain.png",
    icon2: "/categories/captain2.png",
  },
];

const CategoryList = () => {
  const params = useParams();
  const { data, fetchFbCategories } = useFbCategory<TFbCategoryResponse>();
  const [cardItems, setCardItems] = useState<ICardItem[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchFbCategories();
  }, []);

  useEffect(() => {
    if (data?.data) {
      const mergedItems = data.data.map((item, index) => ({
        title: item.name,
        icon: staticCardItems[index]?.icon || "/placeholder.png",
        icon2: staticCardItems[index]?.icon2 || "/placeholder-hover.png",
        href: createPath({
          path: ROUTES.resourceCategoriesHome,
          dynamicParams: { fbCategorySlug: item.slug },
        }),
        slug: item.slug,
      }));
      setCardItems(mergedItems);
    }
  }, [data]);

  return (
    <>
      <Title>Categories</Title>
      <Group justify="center" grow>
        {cardItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <div
              className={`transition-colors duration-500 hover:bg-blue-500 hover:text-white cursor-pointer min-h-60 custom-card ${
                params.fbCategorySlug === item.slug ? "active" : ""
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex m-4">
                <Image
                  src={
                    hoveredIndex === index && item.icon2
                      ? item.icon2
                      : item.icon
                  }
                  alt={item.title || "Category"}
                  width={70}
                  height={70}
                />
              </div>
              <Text fw={500}>{item.title}</Text>
            </div>
          </Link>
        ))}
      </Group>
    </>
  );
};

export default CategoryList;

import { Skeleton } from '@mantine/core';

interface IFakeSkeleton {
  rows?: number;
  height?: number;
}

export default function FakeSkeleton({ rows = 1, height = 35 }: IFakeSkeleton) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton key={index} height={height} mb="sm" />
      ))}
    </>
  );
}

import { Card, Skeleton } from "@nextui-org/react";

type SkeletonProps = {
  rows: number;
  cardsPerRow: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

export default function CardsSkeleton({
  rows = 1,
  cardsPerRow = 3,
}: SkeletonProps) {
  const gridCols = `grid-cols-${cardsPerRow}`;

  let className = `flex-1 w-full h-full flex flex-col md:grid ${gridCols} place-items-center p-4 gap-4`;

  return (
    <div className={className}>
      {Array.from({ length: rows * cardsPerRow }).map((_, index) => (
        <Card
          key={index}
          className="size-[250px] aspect-square space-y-5 p-4"
          radius="lg"
        >
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </Card>
      ))}
    </div>
  );
}

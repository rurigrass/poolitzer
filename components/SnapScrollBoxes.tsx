type SnapScrollBoxesProps = {
  count?: number;
  className?: string;
  boxClassName?: string;
};

export function SnapScrollBoxes({ count = 8 }: SnapScrollBoxesProps) {
  return (
    <div className="no-scrollbar flex w-full snap-x snap-mandatory gap-6 overflow-x-auto">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="shrink-0 snap-center h-40 rounded-lg bg-blue-500 first:ml-6 last:mr-6"
          style={{ width: "calc(100% - 3rem)" }}
        />
      ))}
    </div>
  );
}

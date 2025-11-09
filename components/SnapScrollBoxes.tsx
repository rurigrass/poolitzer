type SnapScrollBoxesProps = {
  count?: number;
  className?: string;
  boxClassName?: string;
};

export function SnapScrollBoxes({ count = 8 }: SnapScrollBoxesProps) {

  return (
    <div className="relative flex w-full snap-x snap-mandatory gap-6 overflow-x-auto">
      <div aria-hidden className="shrink-0 snap-center w-4 sm:w-36" />
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="shrink-0 snap-center h-40 w-80 rounded-lg bg-blue-500" aria-hidden />
      ))}
      <div aria-hidden className="shrink-0 snap-center w-4 sm:w-36" />
    </div>
  );
}

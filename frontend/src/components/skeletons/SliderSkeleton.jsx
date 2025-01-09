const SliderSkeleton = () => (
  <div className="p-4 space-y-4">
    {[1, 2, 3, 4, 5].map((index) => (
      <div
        key={index}
        className="flex items-center space-x-3 p-3 animate-pulse"
      >
        <div className="size-12 rounded-full bg-gray-200"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </div>
    ))}
  </div>
);

export default SliderSkeleton;

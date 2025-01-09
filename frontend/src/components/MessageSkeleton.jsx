const MessageSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`flex flex-col w-fit p-3 max-w-[80%] max-sm:max-w-[85%] ${
              i % 2 === 0
                ? "ml-auto bg-gray-200 rounded-tl-lg rounded-bl-lg rounded-tr-sm"
                : "mr-auto bg-gray-100 rounded-tr-lg rounded-br-lg rounded-tl-sm"
            }`}
          >
            <div className="h-4 w-[200px] max-sm:w-[160px] bg-gray-300 rounded animate-pulse"></div>
            <div className="h-2 w-12 bg-gray-300 rounded mt-2 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;

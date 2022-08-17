const LoadingSpinner = () => {
  return (
    <div className="w-full text-center">
      <span className="relative inline-block w-12 h-12 border-4 border-white border-b-red-700 rounded-[50%] animate-spin" />
    </div>
  );
};

export default LoadingSpinner;

type Percentage = { percentage: number };

const ProgressBar = ({ percentage }: Percentage) => {
  return (
    <div
      style={{
        background:
          percentage < 50
            ? `conic-gradient(#ef4444 ${percentage * 3.6}deg, #fca5a5 ${
                percentage * 3.6
              }deg)`
            : percentage > 50 && percentage < 70
            ? `conic-gradient(#fde047 ${percentage * 3.6}deg, #fef9c3 ${
                percentage * 3.6
              }deg)`
            : `conic-gradient(#22c55e ${percentage * 3.6}deg, #86efac ${
                percentage * 3.6
              }deg)`,
      }}
      className="relative w-16 h-16 rounded-[50%] sm:p-3 sm:text-sm"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] h-[88%] flex items-center justify-center text-xl bg-black rounded-[50%]">
        <p>{percentage}%</p>
      </div>
    </div>
  );
};

export default ProgressBar;

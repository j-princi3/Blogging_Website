const LoadingSpinner = () => {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="relative">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary" />
      </div>
    </div>
  );
};

export default LoadingSpinner;

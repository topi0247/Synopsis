export const ErrorMessage = ({ error }: { error: string[] }) => {
  if (error.length === 0) return null;
  return (
    <p className="bg-red-400 bg-opacity-40 p-3 rounded border border-red-600 text-center text-gray-700 my-2">
      {error.map((e) => {
        return e;
      })}
    </p>
  );
};

import { Loader } from "lucide-react";

export default function Component() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Loader
          className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400"
          size={64}
        />
        <p className="text-gray-500 dark:text-gray-400 flex items-center space-x-2">
          Loading
        </p>
      </div>
    </div>
  );
}

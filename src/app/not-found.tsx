import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <FileQuestion className="w-24 h-24 text-gray-200 mb-8" />
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Page Not Found</h2>
            <p className="text-gray-500 text-lg mb-8 max-w-md">
                Could not find the requested resource. It might have been moved, deleted, or never existed.
            </p>
            <Link
                href="/"
                className="inline-flex items-center justify-center rounded-md bg-black px-8 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
            >
                Return Home
            </Link>
        </div>
    );
}

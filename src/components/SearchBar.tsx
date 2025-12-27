import { Search } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = 'Search...' }: SearchBarProps) => {
    return (
        <div className="relative w-full max-w-xl">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-2xl border border-border/50 bg-background/50 py-4 pl-12 pr-4 text-base shadow-sm backdrop-blur-sm transition-all placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:outline-none focus:ring-4 focus:ring-primary/10"
                placeholder={placeholder}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <div className="hidden rounded-lg bg-muted px-2 py-1 text-xs font-medium text-muted-foreground sm:block">
                    CMD + K
                </div>
            </div>
        </div>
    );
};

export default SearchBar;

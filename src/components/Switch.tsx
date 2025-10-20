interface SwitchProps {
    id?: string;
    label: string;
    onToggle: () => void;
    toggled: boolean;
}

export const Switch = ({ id = 'switch-toggle', label, onToggle, toggled }: SwitchProps) => {
    return (
        <div className="flex items-center gap-3">
            <input type="checkbox" className="sr-only peer" id={id} onChange={onToggle} />
            <label
                htmlFor={id}
                className={`cursor-pointer h-5 w-10 inline-flex shrink-0 items-center border border-black dark:border-none rounded-full ${
                    toggled && 'bg-green-500'
                }`}
            >
                <span
                    className={`inline-block h-5 w-5 scale-[0.8] bg-black dark:bg-gray-300 rounded-full transition-all duration-300 ease-in-out ${
                        toggled
                            ? 'translate-x-5 shadow-[0_2px_4px_rgba(0,0,0,1)] inset-shadow-[0_0_1px_rgba(0,0,0,1)]'
                            : 'translate-x-0'
                    }`}
                ></span>
            </label>
            <label htmlFor={id} className="text-gray-800 dark:text-gray-200 text-sm md:text-md lg:text-lg">
                {label}
            </label>
        </div>
    );
};

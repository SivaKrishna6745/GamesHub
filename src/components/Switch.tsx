interface SwitchProps {
    id?: string;
    label: string;
    onToggle: () => void;
    toggled: boolean;
}

export const Switch = ({ id = 'switch-toggle', label, onToggle, toggled }: SwitchProps) => {
    return (
        <div className="flex items-center gap-4">
            <input type="checkbox" className="sr-only peer" id={id} onChange={onToggle} />
            <label
                htmlFor={id}
                className="cursor-pointer h-6 w-10 inline-flex items-center border border-black dark:border-white rounded-full"
            >
                <span
                    className={`inline-block  h-4 w-4 bg-black dark:bg-white rounded-full transition-all duration-300 ease-in-out ${
                        toggled ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                ></span>
            </label>
            <label htmlFor={id} className="text-gray-800 dark:text-gray-200">
                {label}
            </label>
        </div>
    );
};

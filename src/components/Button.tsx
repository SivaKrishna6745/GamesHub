interface ButtonProps {
    label: string;
    onClick: () => void;
}

export const Button = ({ label, onClick }: ButtonProps) => {
    return (
        <button
            type="button"
            className="border-none outline-none cursor-pointer hover:underline focus:font-bold"
            onClick={onClick}
        >
            {label}
        </button>
    );
};

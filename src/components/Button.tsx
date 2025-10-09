interface ButtonProps {
    label: string;
}

export const Button = ({ label }: ButtonProps) => {
    return (
        <button type="button" className="border-none outline-none cursor-pointer hover:underline">
            {label}
        </button>
    );
};

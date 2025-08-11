interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function PrimaryButton({ children, onClick, className }: ButtonProps) {
    return <button onClick={onClick} className={`btn ${className}`}>
        {children}
    </button>;
}



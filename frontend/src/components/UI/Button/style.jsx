const variants = {
    neoBrutalism: {
        animated: "font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all",
        static: "font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    }
}

const buttonSize ={
    "sm": "px-4 py-2 text-sm",
    "md": "px-6 py-3 text-base",
    "lg": "px-8 py-4 text-lg",
    "xl": "px-10 py-5 text-xl",
}


export const Button = ({
    children,
    className,
    type="button",
    variant="neoBrutalism",
    backgroundColor="white",
    textColor="black",
    size="md",
    disabled=false,
    animated=true,
    ...props
}) => {
    return (
        <button 
            className={`${animated ? variants[variant].animated : variants[variant].static} ${className} ${buttonSize[size]} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
            type={type}
            style={{
                backgroundColor,
                color: textColor,
            }}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}
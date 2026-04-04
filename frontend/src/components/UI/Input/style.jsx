const variants = {
	neoBrutalism: "w-full px-4 py-3 text-lg font-bold border-2 border-black rounded-none bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none"
}

const sizes = {
	"sm": "px-2 py-1",
	"md": "px-4 py-2",
	"lg": "px-6 py-3",
	"xl": "px-8 py-4",
}

export const Input = ({
	variant = "neoBrutalism",
	size = "md",
	className = "",
	...props
}) => {
	return (
		<input className={`${variants[variant]} ${sizes[size]} ${className}`} {...props} />
	)
}
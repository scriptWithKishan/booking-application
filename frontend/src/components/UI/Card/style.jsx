const variants = {
	neoBrutalism: {
		static: "border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
		animated: "border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
	}
}

const cardSize = {
	"sm": "p-4",
	"md": "p-6",
	"lg": "p-8",
	"xl": "p-10",
}

export const Card = ({
	children,
	className,
	variant="neoBrutalism",
	size="md",
	backgroundColor="white",
	borderColor="black",
	shadowColor="black",
	shadowSize="8",
	animated=false,
}) => {
	return (
		<div 
			className={`${ animated ? variants[variant].animated : variants[variant].static} ${className} ${cardSize[size]}`}
			style={{
				backgroundColor,
				borderColor,
				boxShadow: `${shadowSize}px ${shadowSize}px 0px 0px ${shadowColor}`,
			}}
		>
			{children}
		</div>
	)
}
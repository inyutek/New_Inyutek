import { cn } from "@/lib/utils"

export function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("skeleton rounded-md bg-muted/10", className)}
            {...props}
        />
    )
}

import React from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface HintProps {
    label: string;
    children: React.ReactNode;
    asChild?: boolean;
    side?: 'top' | 'bottom' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
}

export const Hint: React.FC<HintProps> = ({
    label,
    children,
    asChild,
    side,
    align
}: HintProps) => {
    return (
        <TooltipProvider >
            <Tooltip delayDuration={0} >
                <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
                <TooltipContent className='text-[#b28228]  bg-black border-none '
                side={side}
                align={align}>
                    <div className=' border-[#b28228] border-l-2 p-2 rounded-sm'>
                    <p className='font-semibold'>{label}</p>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

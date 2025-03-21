import { ArrowUpIcon } from 'lucide-react'
import React from 'react'

interface ScrollToTopButtonProps {
    show: boolean
    onClick: () => void
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
    show,
    onClick,
}) => {
    if (!show) return null

    return (
        <button
            onClick={onClick}
            className="fixed bottom-4 right-4 z-10 rounded-full bg-blue-500 p-3 text-white shadow-lg dark:bg-blue-700"
        >
            <ArrowUpIcon size={24} />
        </button>
    )
}

export default ScrollToTopButton

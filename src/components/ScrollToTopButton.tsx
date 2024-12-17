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
            className="fixed bottom-4 right-4 rounded-full bg-blue-500 p-3 text-white shadow-lg"
        >
            <ArrowUpIcon size={24} />
        </button>
    )
}

export default ScrollToTopButton

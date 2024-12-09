import React from 'react'
import { ArrowUpIcon } from 'lucide-react'

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
            className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg"
        >
            <ArrowUpIcon size={24} />
        </button>
    )
}

export default ScrollToTopButton

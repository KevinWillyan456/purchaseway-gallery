import {
    CopyIcon,
    EditIcon,
    ExternalLinkIcon,
    Maximize2Icon,
    Trash2Icon,
} from 'lucide-react'
import React from 'react'
import { animated } from 'react-spring'
import { CardTypes } from '../types'

interface CardProps {
    card: CardTypes
    style: React.CSSProperties
    onOpenImage: (imgUrl: string) => void
    onConfirmRemove: (id: string) => void
    onCopyToClipboard: (url: string) => void
    onOpenInNewTab: (url: string) => void
    onOpenEditModal: (id: string, url: string) => void
}

const Card: React.FC<CardProps> = ({
    card,
    style,
    onOpenImage,
    onConfirmRemove,
    onCopyToClipboard,
    onOpenInNewTab,
    onOpenEditModal,
}) => {
    return (
        <animated.div
            key={card.id}
            style={style}
            className="group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-md"
            onClick={() => onOpenImage(card.imgUrl)}
        >
            <div className="relative h-48 w-full">
                <img
                    src={card.imgUrl}
                    alt="Imagem"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="absolute right-2 top-2 flex space-x-2 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onOpenImage(card.imgUrl)
                    }}
                    className="rounded bg-blue-500 p-2 text-white"
                >
                    <Maximize2Icon size={16} />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onConfirmRemove(card.id)
                    }}
                    className="rounded bg-red-500 p-2 text-white"
                >
                    <Trash2Icon size={16} />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onCopyToClipboard(card.imgUrl)
                    }}
                    className="rounded bg-yellow-500 p-2 text-white"
                >
                    <CopyIcon size={16} />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onOpenInNewTab(card.imgUrl)
                    }}
                    className="rounded bg-purple-500 p-2 text-white"
                >
                    <ExternalLinkIcon size={16} />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onOpenEditModal(card.id, card.imgUrl)
                    }}
                    className="rounded bg-green-500 p-2 text-white"
                >
                    <EditIcon size={16} />
                </button>
            </div>
        </animated.div>
    )
}

export default Card

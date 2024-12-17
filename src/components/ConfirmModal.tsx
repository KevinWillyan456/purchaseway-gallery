import React from 'react'
import { animated, useSpring } from 'react-spring'

interface ConfirmModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    message?: string
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    message = 'Tem certeza de que deseja excluir esta imagem?',
}) => {
    const modalAnimation = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'scale(1)' : 'scale(0.95)',
        config: { duration: 200 },
    })

    if (!isOpen) return null

    return (
        <animated.div
            style={modalAnimation}
            className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 dark:bg-opacity-90"
            onClick={onClose}
        >
            <div
                className="scale-95 transform rounded bg-white p-6 shadow-lg transition-all duration-200 dark:bg-gray-800"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="mb-4 text-xl font-bold dark:text-white">
                    Confirmar Exclusão
                </h2>
                <p className="mb-4 dark:text-white">{message}</p>
                <div className="flex justify-end">
                    <button
                        onClick={onConfirm}
                        className="mr-2 rounded bg-red-500 p-2 text-white dark:bg-red-700"
                    >
                        Excluir
                    </button>
                    <button
                        onClick={onClose}
                        className="rounded bg-gray-500 p-2 text-white dark:bg-gray-700"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </animated.div>
    )
}

export default ConfirmModal

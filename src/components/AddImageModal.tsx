import React, { useEffect, useRef, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import useImageValidation from '../hooks/useImageValidation'

interface AddImageModalProps {
    isOpen: boolean
    onClose: () => void
    onAddImage: (url: string) => void
    validateImageUrl: (url: string) => void
    isValidImage: boolean
}

const AddImageModal: React.FC<AddImageModalProps> = ({
    isOpen,
    onClose,
    onAddImage,
}) => {
    const [newImageUrl, setNewImageUrl] = useState<string>('')
    const { isValidImage, validateImageUrl } = useImageValidation()
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus()
        }
    }, [isOpen])

    const modalAnimation = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateY(0)' : 'translateY(-20px)',
        config: { duration: 300 },
    })

    const handleAddImage = (e?: React.FormEvent) => {
        e?.preventDefault()
        onAddImage(newImageUrl)
        setNewImageUrl('')
    }

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 dark:bg-opacity-90"
            onClick={onClose}
        >
            <animated.div
                style={modalAnimation}
                className="rounded bg-white p-6 shadow-lg transition-all duration-300 dark:bg-gray-800"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="mb-4 text-xl font-bold dark:text-white">
                    Adicionar URL da Imagem
                </h2>
                <form onSubmit={handleAddImage}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={newImageUrl}
                        onChange={(e) => {
                            setNewImageUrl(e.target.value)
                            validateImageUrl(e.target.value)
                        }}
                        className="mb-4 w-full border p-2 dark:bg-gray-700 dark:text-white"
                        placeholder="Digite a URL da imagem"
                    />
                    {newImageUrl && isValidImage && (
                        <div className="mb-4">
                            <img
                                src={newImageUrl}
                                alt="Preview"
                                className="mb-2 h-48 w-full object-cover"
                            />
                            <p className="text-green-500">
                                Imagem válida, pronta para salvar
                            </p>
                        </div>
                    )}
                    {!isValidImage && newImageUrl && (
                        <p className="mb-4 text-red-500">
                            URL da imagem inválida
                        </p>
                    )}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="mr-2 rounded bg-blue-500 p-2 text-white dark:bg-blue-700"
                            disabled={
                                !isValidImage || newImageUrl.trim() === ''
                            }
                        >
                            Adicionar
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded bg-red-500 p-2 text-white dark:bg-red-700"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </animated.div>
        </div>
    )
}

export default AddImageModal

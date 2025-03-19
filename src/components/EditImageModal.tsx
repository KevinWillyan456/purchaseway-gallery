import React, { useEffect, useRef, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import useImageValidation from '../hooks/useImageValidation'

interface EditImageModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (url: string) => void
    initialUrl: string
}

const EditImageModal: React.FC<EditImageModalProps> = ({
    isOpen,
    onClose,
    onSave,
    initialUrl,
}) => {
    const [urlToEdit, setUrlToEdit] = useState<string>(initialUrl)
    const { isValidImage, validateImageUrl } = useImageValidation()
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setUrlToEdit(initialUrl)
        if (isOpen) {
            inputRef.current?.focus()
        }
    }, [initialUrl, isOpen])

    const modalAnimation = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateY(0)' : 'translateY(-20px)',
        config: { duration: 300 },
    })

    const handleSave = (e?: React.FormEvent) => {
        e?.preventDefault()
        onSave(urlToEdit)
    }

    if (!isOpen) return null

    return (
        <animated.div
            style={modalAnimation}
            className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 dark:bg-opacity-90"
            onClick={onClose}
        >
            <div
                className="rounded bg-white p-6 shadow-lg transition-all duration-300 dark:bg-gray-800"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="mb-4 text-xl font-bold dark:text-white">
                    Editar URL da Imagem
                </h2>
                <form onSubmit={handleSave}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={urlToEdit}
                        onChange={(e) => {
                            setUrlToEdit(e.target.value)
                            validateImageUrl(e.target.value)
                        }}
                        className="mb-4 w-full border p-2 dark:bg-gray-700 dark:text-white"
                        placeholder="Digite a nova URL da imagem"
                    />
                    {urlToEdit && isValidImage && (
                        <div className="mb-4">
                            <img
                                src={urlToEdit}
                                alt="Preview"
                                className="mb-2 h-48 w-full object-cover"
                            />
                            <p className="text-green-500">
                                Imagem válida, pronta para salvar
                            </p>
                        </div>
                    )}
                    {!isValidImage && urlToEdit && (
                        <p className="mb-4 text-red-500">
                            URL da imagem inválida
                        </p>
                    )}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="mr-2 rounded bg-blue-500 p-2 text-white dark:bg-blue-700"
                            disabled={!isValidImage || urlToEdit.trim() === ''}
                        >
                            Salvar
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
            </div>
        </animated.div>
    )
}

export default EditImageModal

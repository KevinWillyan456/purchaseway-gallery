import { PlusIcon, SlidersIcon, Trash2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { v4 as uuid } from 'uuid'
import Header from './components/Header'
import useCardSprings from './hooks/useCardSprings'
import useImageValidation from './hooks/useImageValidation'
import { CardTypes } from './types'

import 'react-toastify/dist/ReactToastify.css'
import AddImageModal from './components/AddImageModal'
import Card from './components/Card'
import ConfirmModal from './components/ConfirmModal'
import EditImageModal from './components/EditImageModal'
import ImageModal from './components/ImageModal'
import ScrollToTopButton from './components/ScrollToTopButton'
import Slideshow from './components/Slideshow'

function App() {
    const [cards, setCards] = useState<CardTypes[]>(() => {
        const savedCards = localStorage.getItem('cards')
        return savedCards ? JSON.parse(savedCards) : []
    })
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [cardToRemove, setCardToRemove] = useState<string | null>(null)
    const [isImageOpen, setIsImageOpen] = useState(false)
    const [imageToOpen, setImageToOpen] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [urlToEdit, setUrlToEdit] = useState<string | null>(null)
    const [cardToEdit, setCardToEdit] = useState<string | null>(null)
    const [showScrollToTop, setShowScrollToTop] = useState(false)
    const [isConfirmDeleteAllOpen, setIsConfirmDeleteAllOpen] = useState(false)
    const [isSlideshowOpen, setIsSlideshowOpen] = useState(false)
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const [slideTransition, setSlideTransition] = useState('opacity-0')
    const springs = useCardSprings(cards)
    const { isValidImage, validateImageUrl } = useImageValidation()

    useEffect(() => {
        const savedCards = localStorage.getItem('cards')
        if (savedCards) {
            setCards(JSON.parse(savedCards))
        }
        setIsLoading(false)
    }, [])

    useEffect(() => {
        localStorage.setItem('cards', JSON.stringify(cards))
    }, [cards])

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollToTop(window.scrollY > 300)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const notify = (message: string, type: 'success' | 'error' = 'success') => {
        toast(message, { type })
    }

    const handleAddImage = async (url: string) => {
        const isValid = await validateImageUrl(url)
        if (isValid && url.trim() !== '') {
            const newCard = {
                id: uuid(),
                imgUrl: url,
                createdAt: new Date().toISOString(),
            }
            setCards([...cards, newCard])
            setIsModalOpen(false)
            notify('Imagem adicionada com sucesso!')
        } else {
            notify('URL da imagem inválida ou vazia', 'error')
        }
    }

    const confirmRemoveCard = (id: string) => {
        setCardToRemove(id)
        setIsConfirmOpen(true)
    }

    const removeCard = () => {
        if (cardToRemove) {
            setCards(cards.filter((card) => card.id !== cardToRemove))
            setCardToRemove(null)
            setIsConfirmOpen(false)
            notify('Imagem removida com sucesso!')
        }
    }

    const removeAllCards = () => {
        setCards([])
        setIsConfirmDeleteAllOpen(false)
        notify('Todas as imagens foram removidas com sucesso!')
    }

    const openImage = (imgUrl: string) => {
        setImageToOpen(imgUrl)
        setIsImageOpen(true)
    }

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url)
        notify('URL copiada para a área de transferência')
    }

    const openInNewTab = (url: string) => {
        window.open(url, '_blank')
    }

    const openEditModal = (id: string, url: string) => {
        setCardToEdit(id)
        setUrlToEdit(url)
        setIsEditModalOpen(true)
    }

    const handleSaveEditedUrl = async (url: string) => {
        const isValid = await validateImageUrl(url)
        if (cardToEdit && isValid && url.trim() !== '') {
            setCards(
                cards.map((card) =>
                    card.id === cardToEdit ? { ...card, imgUrl: url } : card,
                ),
            )
            setIsEditModalOpen(false)
            setCardToEdit(null)
            setUrlToEdit(null)
            notify('URL da imagem editada com sucesso!')
        } else {
            notify('URL da imagem inválida ou vazia', 'error')
        }
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const startSlideshow = () => {
        if (cards.length === 0) {
            notify('Não há imagens para exibir no slideshow', 'error')
            return
        }
        setCurrentSlideIndex(0)
        setIsSlideshowOpen(true)
        setSlideTransition('opacity-100')
    }

    const closeSlideshow = () => {
        setIsSlideshowOpen(false)
        setSlideTransition('opacity-0')
    }

    const nextSlide = () => {
        setSlideTransition('opacity-0')
        setTimeout(() => {
            setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % cards.length)
            setSlideTransition('opacity-100')
        }, 300)
    }

    const prevSlide = () => {
        setSlideTransition('opacity-0')
        setTimeout(() => {
            setCurrentSlideIndex(
                (prevIndex) => (prevIndex - 1 + cards.length) % cards.length,
            )
            setSlideTransition('opacity-100')
        }, 300)
    }

    return (
        <>
            <ToastContainer
                theme={
                    matchMedia('(prefers-color-scheme: dark)').matches
                        ? 'dark'
                        : 'light'
                }
            />
            <Header />
            <div className="flex flex-col items-center justify-between space-y-2 p-4 sm:flex-row sm:space-x-2 sm:space-y-0">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex w-full items-center justify-center rounded bg-green-500 p-2 text-white sm:w-auto dark:bg-green-700"
                >
                    <PlusIcon size={16} className="mr-2" />
                    Adicionar Imagem
                </button>
                <button
                    onClick={startSlideshow}
                    className="flex w-full items-center justify-center rounded bg-purple-500 p-2 text-white sm:w-auto dark:bg-purple-700"
                >
                    <SlidersIcon size={16} className="mr-2" />
                    Iniciar Slideshow
                </button>
                <button
                    onClick={() => setIsConfirmDeleteAllOpen(true)}
                    className="flex w-full items-center justify-center rounded bg-red-500 p-2 text-white sm:w-auto dark:bg-red-700"
                >
                    <Trash2Icon size={16} className="mr-2" />
                    Apagar Todas as Imagens
                </button>
            </div>
            <div className="mx-auto max-w-screen-xl">
                <section className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {isLoading ? (
                        <p className="col-span-full text-center text-gray-500 dark:text-gray-300">
                            Carregando imagens...
                        </p>
                    ) : cards.length === 0 ? (
                        <p className="col-span-full text-center text-gray-500 dark:text-gray-300">
                            Nenhuma imagem disponível
                        </p>
                    ) : (
                        cards.map((card, index) => {
                            const props = springs[index]
                            return (
                                <Card
                                    key={card.id}
                                    card={card}
                                    style={
                                        props as unknown as React.CSSProperties
                                    }
                                    onOpenImage={openImage}
                                    onConfirmRemove={confirmRemoveCard}
                                    onCopyToClipboard={copyToClipboard}
                                    onOpenInNewTab={openInNewTab}
                                    onOpenEditModal={openEditModal}
                                />
                            )
                        })
                    )}
                </section>
            </div>
            {isModalOpen && (
                <AddImageModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAddImage={handleAddImage}
                    validateImageUrl={validateImageUrl}
                    isValidImage={isValidImage}
                />
            )}
            {isConfirmOpen && (
                <ConfirmModal
                    isOpen={isConfirmOpen}
                    onClose={() => setIsConfirmOpen(false)}
                    onConfirm={removeCard}
                />
            )}
            {isConfirmDeleteAllOpen && (
                <ConfirmModal
                    isOpen={isConfirmDeleteAllOpen}
                    onClose={() => setIsConfirmDeleteAllOpen(false)}
                    onConfirm={removeAllCards}
                />
            )}
            {isImageOpen && imageToOpen && (
                <ImageModal
                    imageUrl={imageToOpen}
                    onClose={() => setIsImageOpen(false)}
                />
            )}
            {isEditModalOpen && (
                <EditImageModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleSaveEditedUrl}
                    initialUrl={urlToEdit || ''}
                />
            )}
            <ScrollToTopButton show={showScrollToTop} onClick={scrollToTop} />
            <Slideshow
                isOpen={isSlideshowOpen}
                cards={cards}
                currentSlideIndex={currentSlideIndex}
                slideTransition={slideTransition}
                onClose={closeSlideshow}
                onNext={nextSlide}
                onPrev={prevSlide}
            />
        </>
    )
}

export default App

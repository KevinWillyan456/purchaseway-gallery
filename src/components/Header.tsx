import { ImageIcon } from 'lucide-react'
import React from 'react'

const Header: React.FC = () => {
    return (
        <header className="flex items-center bg-blue-500 p-4 text-white">
            <ImageIcon size={26} className="mr-2 inline-block" />
            <h1 className="text-2xl font-bold">Purchaseway Gallery</h1>
        </header>
    )
}

export default Header

import { ImageIcon } from 'lucide-react'
import React from 'react'

const Header: React.FC = () => {
    return (
        <header className="bg-blue-500 text-white p-4 flex items-center">
            <ImageIcon size={26} className="inline-block mr-2" />
            <h1 className="text-2xl font-bold">Purchaseway Gallery</h1>
        </header>
    )
}

export default Header

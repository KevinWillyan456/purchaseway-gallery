import { useSprings } from 'react-spring'
import { CardTypes } from '../types'

function useCardSprings(cards: CardTypes[]) {
    return useSprings(
        cards.length,
        cards.map((_, index) => ({
            opacity: 1,
            transform: 'translateY(0)',
            from: { opacity: 0, transform: 'translateY(20px)' },
            delay: index * 100,
        }))
    )
}

export default useCardSprings

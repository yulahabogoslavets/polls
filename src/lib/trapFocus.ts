export function trapFocus(
    modalRef: React.RefObject<HTMLDivElement>,
    onClose: () => void
) {
    if (!modalRef.current) return () => {}

    const focusableSelectors =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    const focusableElements =
        modalRef.current?.querySelectorAll<HTMLElement>(focusableSelectors)
    const firstElement = focusableElements?.[0]
    const lastElement = focusableElements?.[focusableElements.length - 1]

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onClose()
        }

        if (event.key === 'Tab' && focusableElements) {
            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault()
                lastElement?.focus()
            } else if (
                !event.shiftKey &&
                document.activeElement === lastElement
            ) {
                event.preventDefault()
                firstElement?.focus()
            }
        }
    }

    const handleFocus = () => {
        firstElement?.focus()
    }

    document.addEventListener('keydown', handleKeyDown)
    modalRef.current?.addEventListener('focus', handleFocus)

    return () => {
        document.removeEventListener('keydown', handleKeyDown)
        modalRef.current?.removeEventListener('focus', handleFocus)
    }
}

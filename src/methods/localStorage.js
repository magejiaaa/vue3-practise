export function getLocalStorage() {
    if (typeof window === 'undefined') {
        return null
    }
    const localStorage = window.localStorage
    if (!localStorage) {
        return null
    }
    return localStorage
}
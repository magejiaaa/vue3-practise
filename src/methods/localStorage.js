export function getLocalStorage() {
    // 判斷是不是瀏覽器環境
    if (typeof window === 'undefined') {
        return null
    }
    const localStorage = window.localStorage
    // 沒有本地儲存返回null
    if (!localStorage) {
        return null
    }
    return localStorage
}
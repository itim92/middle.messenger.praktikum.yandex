export function debounce(callback, timeoutMs) {
    let timeoutId;

    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => callback.apply(this, args), timeoutMs);
    };
}

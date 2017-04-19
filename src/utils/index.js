export function noTouch() {
    const ua = window.navigator.userAgent;
    const ios = ua.includes('iPad') || ua.includes('iPhone');
    const android = ua.includes('Android');

    if (!ios && !android) {
        document.body.classList.add('no-touch');
    }
}

export function plural(str) {
    return [
        str,
        /s$/.test(str) && 'e',
        's'
    ].filter(Boolean).join('');
}

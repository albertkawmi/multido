export function noTouch() {
    const ua = window.navigator.userAgent;
    const ios = ua.includes('iPad') || ua.includes('iPhone');
    const android = ua.includes('Android');

    if (!ios && !android) {
        document.body.classList.add('no-touch');
    }
}

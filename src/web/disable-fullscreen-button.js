(function() {
    const styleId = 'jmp-kiosk-hide-fullscreen-style';
    const selector = '.btnFullscreen, #btn-fullscreen';

    function lockFullscreenEnabled() {
        return window.jmpInfo?.settings?.main?.lockFullscreen === true;
    }

    function ensureStyle() {
        if (!lockFullscreenEnabled()) return;
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = selector + '{display:none !important;}';
        (document.head || document.documentElement).appendChild(style);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ensureStyle, { once: true });
    } else {
        ensureStyle();
    }

    const observer = new MutationObserver(ensureStyle);
    observer.observe(document.documentElement, { childList: true, subtree: true });
})();

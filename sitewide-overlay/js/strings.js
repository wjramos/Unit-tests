module.exports = {
    selector : {
        defaultId     : 'sitewide-overlay',
        backdrop      : '.backdrop',
        closeTriggers : '.backdrop, .close, .close-overlay'
    },
    effect : {
        hidden    : 'hidden',
        blur      : 'blur',
        appear    : 'appear',
        fadeOut   : 'fade out',
        fadeIn    : 'fade in'
    },
    data          : { shown: 'data-shown' },
    viewOverlay   : { interstitialModal: true },
    viewNoOverlay : { interstitialModal: false },
    regex         : { crawlerPattern: /bot|crawl|slurp|spider/i },
    event : {
        domReady  : 'DOMContentLoaded',
        click     : 'click'
    },
    cookieName    : 'seenCampaign'
}
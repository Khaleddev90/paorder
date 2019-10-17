/* eslint-disable no-undef */
import germanStrings from 'react-timeago/lib/language-strings/de'
import englishStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

export function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string

    if (dataURI instanceof Blob) {
        return dataURI
    }
    const byteString = atob(dataURI.split(',')[1])

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    const arrayBuffer = new ArrayBuffer(byteString.length)
    const _ia = new Uint8Array(arrayBuffer)
    for (let i = 0; i < byteString.length; i++) {
        _ia[i] = byteString.charCodeAt(i)
    }

    const dataView = new DataView(arrayBuffer)
    const blob = new Blob([dataView], { type: mimeString })
    return blob
}

export function getLocalFormatter() {
    if (localStorage.getItem('currentLanguage') && localStorage.getItem('currentLanguage') === 'DE') {
        return buildFormatter(germanStrings)
    } else {
        return buildFormatter(englishStrings)
    }
}

export function getBrowserType() {
    // Opera 8.0+
    const isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0

    if (isOpera) {
        return 'Opera'
    }
    // Firefox 1.0+
    const isFirefox = typeof InstallTrigger !== 'undefined'

    if (isFirefox) {
        return 'Firefox'
    }
    // Safari 3.0+ "[object HTMLElementConstructor]" 
    const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification))

    if (isSafari) {
        return 'Safari'
    }
    // Internet Explorer 6-11
    const isIE = /*@cc_on!@*/false || !!document.documentMode

    if (isIE) {
        return 'IE'
    }
    // Edge 20+
    const isEdge = !isIE && !!window.StyleMedia

    if (isEdge) {
        return 'Edge'
    }
    // Chrome 1 - 71
    const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)

    if (isChrome) {
        return 'Chrome'
    }
    // Blink engine detection
    const isBlink = (isChrome || isOpera) && !!window.CSS

    if (isBlink) {
        return 'Blink'
    }
}

import i18n from 'i18next'
import en from './languages/en'
import de from './languages/de'

class I18nService {
    static init() {
        return i18n.init({
            debug: false,
            fallbackLng: 'en',
            lng: localStorage.getItem('currentLanguage') ? localStorage.getItem('currentLanguage').toLowerCase() : 'en',
            resources: {
                en: en,
                de: de,
            },
            react: {
                wait: false,
                withRef: false,
                bindI18n: 'languageChanged loaded',
                bindStore: 'added removed',
                nsMode: 'default',
            },
        })
    }
}

export default I18nService

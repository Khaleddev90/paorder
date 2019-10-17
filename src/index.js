import React from 'react'
import ReactDOM from 'react-dom'    
import {Provider} from 'react-redux'    
import {I18nextProvider} from 'react-i18next'    
import I18nService from './i18n/I18nService'    
import AppContainer from './containers/AppContainer'    
import registerServiceWorker from './registerServiceWorker'    
import {store} from './store'

ReactDOM.render(
    <Provider store={ store }>
        <I18nextProvider i18n={ I18nService.init() }>
            <AppContainer/>
        </I18nextProvider>
    </Provider>
    , document.getElementById('root'))    
registerServiceWorker()    

import React from 'react'
import {withNamespaces} from 'react-i18next'
import packageJson from '../../../package.json'

const Footer = ({ t }) => {
    return (
        <div className="footer main">
            <div className="float-right">
                {t('footer.version') + packageJson.version}
            </div>
            <div dangerouslySetInnerHTML={ {__html: t('footer.poweredBy')} }/>
        </div>
    )
}

export default withNamespaces()(Footer)

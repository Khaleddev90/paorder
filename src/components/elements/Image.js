import React, {Component} from 'react'
import {store} from 'store'
import Loader from 'components/elements/Loader'

export default class Image extends Component {
    state = {
        pic: null,
        imageData: null,
        loading: false,
    }

    componentDidMount() {

        this.urlFetch(process.env.REACT_APP_API_ENDPOINT + '/pictures/' + this.props.pic)
        
    }

    componentWillReceiveProps(nextProps) {

        this.urlFetch(process.env.REACT_APP_API_ENDPOINT + '/pictures/' + nextProps.pic)
        
    }

    urlFetch(data) {
        
        this.setState({loading: true})
        fetch(data, {
            headers: new Headers({
                'authorization': `Bearer ${store.getState().user.token}`,
                'Content-Type': 'application/json',
            }),
        })
            .then(response => response.blob())
            .then(images => {
                // Then create a local URL for that image and print it 
                const imageData = URL.createObjectURL(images)
                this.setState({imageData: imageData, loading: false})
            })
    }

    render() {
        return (
            <div className={ this.props.showGallery ? 'full-gallery': 'slider' }>
                <Loader loading={ this.state.loading } />
                {this.state.imageData 
                    ? <img className={ this.props.showGallery ? 'full-gallery': 'slider' } alt='none' src={ this.state.imageData } /> : ''}
            </div>
        )
    }
}

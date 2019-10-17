import React from 'react'
import { ScaleLoader } from 'react-spinners'

const Loader = ({
    loading,
}) => {
    return (
        <div className="myloader" style={ {display: !loading ? 'none': 'flex'} }>
            <ScaleLoader height={ 35 } width={ 4 } margin={ '2px' } radius={ 2 } loading={ loading } color={ 'rgb(54, 215, 183)' }/>
        </div>
    )
}

export default Loader

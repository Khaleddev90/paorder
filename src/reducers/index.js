import { combineReducers } from 'redux'
import userReducer from './userReducer'
import partnerOrder from './partnerOrder'
import partnerUser from './partnerUser'

const papayaRepairAppPartner = combineReducers({
    user: userReducer,
    order: partnerOrder,
    partnerUser: partnerUser,
})

export default function (state, action) {
    return papayaRepairAppPartner(state, action)
}

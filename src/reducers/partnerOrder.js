import { handleActions } from 'redux-actions'

const defaultState = {
    id: null,
    fulfilmentOrderId: null,
    fulfilmentOrders: [],
    fulfilmentOrder: null,
    repairOrders: [],
    loading: false,
    uploading: false,
    lastLoadedAt: null,
    error: null,
    tags: [],
    tagsData: [],
    searchType : 'ALL',
    sort: 'nqf',
    currentlyEdit: 'none',
}

export default handleActions({

    HIDE_LOADING: (state) => ({
        ...state,
        loading: false,
    }),

    RESET_APP_REQUEST: (state) => ({
        ...state,
        id: null,
        fulfilmentOrderId: null,
        fulfilmentOrders: [],
        fulfilmentOrder: null,
        repairOrders: [],
        loading: false,
        uploading: false,
        lastLoadedAt: null,
        error: null,
        tags: [],
        searchType : 'ALL',
        sort: 'nqf',
    }),

    ADD_ITEM_REQUEST: (state) => ({
        ...state,
    }),

    ADD_ITEM_SUCCESS: (state, { payload: { data }}) => ({
        ...state,
    }),

    ADD_ITEM_FAILURE: (state, {error}) => ({
        ...state,
        error: error,
    }),

    PARTNER_LOAD_REQUEST: (state) => ({
        ...state,
    }),

    SUPPLIER_LOAD_REQUEST: (state) => ({
        ...state,
    }),

    PARTNER_LOAD_SUCCESS: (state, { payload: { data }}) => ({
        ...state,
        fulfilmentOrders: data,
        lastLoadedAt: new Date(),
    }),

    PARTNER_LOAD_FAILURE: (state, {error}) => ({
        ...state,
        error: error,

    }),

    UPDATE_DELIVERY_ADDRESS_SUCCESS: (state, { payload: { data }}) => ({
        ...state,
        error: null,
        currentlyEdit: 'none',
    }),

    UPDATE_DELIVERY_ADDRESS_FAILURE: (state, {error}) => ({
        ...state,
        error: error,

    }),

    UPDATE_TAGBYID_FAILURE: (state, { payload }) => ({
        ...state,
        error: payload,
    }),

    UPDATE_TAGBYID_REQUEST: (state) => ({
        ...state,
        error: null,
    }),

    SUPPLIER_LOAD_SUCCESS: (state, { payload: { data }}) => ({
        ...state,
        id: data.id,
        fulfilmentOrders: data,
        lastLoadedAt: new Date(),
    }),

    SUPPLIER_LOAD_FAILURE: (state, {error}) => ({
        ...state,
        error: error,

    }),
    
    CREATE_ORDER_REQUEST: state => ({
        ...state,
    }),

    CREATE_ORDER_SUCCESS: (state, { payload: { data }}) => ({
        ...state,
        fulfilmentOrderId: data.fulfilmentOrderId,
    }),

    CREATE_ORDER_FAILURE: (state, { payload: { message }}) => ({
        ...state,
        error: message,

    }),

    LOAD_ORDER_BY_QRCODE_SUCCESS: (state, { payload: { data }}) => ({
        ...state,
        fulfilmentOrder: data,
    }),

    UPLOAD_PICTURE_REQUEST: (state) => ({
        ...state,
        uploading: true,
    }),

    UPLOAD_PICTURE_FAILURE: (state) => ({
        ...state,
        uploading: false,
    }),

    UPLOAD_PICTURE_SUCCESS: (state) => ({
        ...state,
        uploading: false,
    }),

    ADD_TRACKING_NUMBER_REQUEST: (state) => ({
        ...state,
    }),

    ADD_TRACKING_NUMBER_SUCCESS: (state) => ({
        ...state,
    }),

    ADD_TRACKING_NUMBER_FAILURE: (state) => ({
        ...state,
    }),

    LOADING_FINISH: (state) => ({
        ...state,
        loading: false,
    }),

    LOADING_START: (state) => ({
        ...state,
        loading: true,
    }),

    GET_TAGS_SUCCESS: (state, { payload: { tags, data }}) => ({
        ...state,
        tags: tags,
        tagsData: data,
    }),

    SET_SEARCH_TYPE: (state, { payload: { type }}) => ({
        ...state,
        searchType: type,
    }),

    SET_SORT_TYPE: (state, { payload: { sort }}) => ({
        ...state,
        sort: sort,
    }),

    SET_CURRENTLY_EDIT: (state, { payload: { edit }}) => ({
        ...state,
        currentlyEdit: edit,
        error: null,
    }),

}, defaultState)

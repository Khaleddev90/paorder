import React, {Component} from 'react'
import {withNamespaces} from 'react-i18next'
import uuid from 'uuid/v4'
import FormSubmit from 'components/elements/FormSubmit'
import TopNavContainer from 'containers/elements/TopNavContainer'

class CreateOrderPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            model: {
                externalReference: 'abcd1234',
                fulfilmentPartnerId: 33,
                fulfilmentOrderTypeId: 1,
                dueDate: Date(),
                maxCosts: '100',
                note: 'This is test note',
                damage: {
                    typeId: 1,
                    description: 'Scren broken',
                    incidentDate: Date(),
                    incidentPlace: 'this is good',
                },
                device: {
                    uuid: uuid(),
                    label: 'iPhone',
                    supplier: 'Apple',
                    model: 'iphonex2781',
                    serialnumber: '014473261285798',
                },
                customer: {
                    salutation: 'w',
                    firstname: 'Jose',
                    lastname: 'Huffman',
                    company: 'MOSIA',
                    language: 'en',
                    phone: '123456789',
                    email: 'huffman@gmail.com',
                },
                address: {
                    addressType: 'customer',
                    country: 'DE',
                    city: 'Lederberg',
                    street: 'Ollenhauer Str.48',
                    zip: '70619',
                },
                delivery: {
                    salutation: 'w',
                    firstname: 'Max',
                    lastname: 'Jenkins',
                    company: 'Micor',
                    street: 'Ollenhauer Str.50',
                    city: 'Lederberg',
                    country: 'DE',
                    zip: '70619',
                    typeId: 5,
                },
            },
        }
    }

    componentWillReceiveProps(nextProps) {
        
    }

    handleChangeModel = (parentFieldName, subFieldName, value) => {
        if (parentFieldName === '') {
            this.setState(prevState => {
                const model = prevState.model
                if (model[subFieldName] === value) {
                    // do nothing if model hasn't changed
                    return {}
                }
                model[subFieldName] = value
                return { model: model}
            })
        } else {
            this.setState(prevState => {
                const model = prevState.model
                if (model[parentFieldName][subFieldName] === value) {
                    // do nothing if model hasn't changed
                    return {}
                }
                model[parentFieldName][subFieldName] = value
                return { model: model}
            })
        }
    }

    //submit
    handleCreateOrder = (e) => {
        this.props.createOrder(this.state.model)
    }

    render() {
        const {t} = this.props
        const { model } = this.state
        
        const error = (this.props.order.loading || !this.props.order.error) ? '' : <div className="alert alert-danger"> { this.props.order.error } </div>
        return (
            <div id="wrapper"><div id="page-wrapper"><TopNavContainer/><div className="wrapper wrapper-content"><div className="container">
                <div className="OverviewPage">

                    <div className="form-group row">
                        <div className="col-lg-3">
                            <label className="col-form-label">{t('order.external_reference')}</label>
                            <input value={ model.externalReference } onChange={ (e) => this.handleChangeModel('', 'externalReference', e.target.value) } type="text" 
                                placeholder="external reference" className="form-control" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-lg-4">
                            <label className="col-form-label">{t('order.fulfilment_partner')}</label>
                            <select value={ model.fulfilmentPartnerId } onChange={ (e) => this.handleChangeModel('', 'fulfilmentPartnerId', e.target.value) } className="form-control m-b" >
                                <option value='1'>fulfilment1</option>
                            </select>
                        </div>

                        <div className="col-lg-8">
                            <label className="col-form-label">{t('order.fulfilment_order')}</label>
                            <select value={ model.fulfilmentOrderTypeId } onChange={ (e) => this.handleChangeModel('', 'fulfilmentOrderTypeId', e.target.value) } className="form-control m-b" >
                                <option value="1">{t('order.repair')}</option>
                                <option value="5">{t('order.warranty')}</option>
                                <option value="10">{t('order.replace')}</option>
                                <option value="15">{t('order.swap')}</option>
                                <option value="20">{t('order.swap_after')}</option>
                            </select>    
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-lg-4">
                            <label className="col-form-label">{t('order.due_date')}</label>
                            <input value={ model.dueDate } onChange={ (e) => this.handleChangeModel('', 'dueDate', e.target.value) } type="date" placeholder="07/22/2018" className="form-control" />
                        </div>

                        <div className="col-lg-8">
                            <label className="col-form-label">{t('order.max_costs')}</label>
                            <input value={ model.maxCosts } onChange={ (e) => this.handleChangeModel('', 'maxCosts', e.target.value) } type="number" placeholder="0.00" className="form-control" />   
                        </div>
                    </div>                

                    <div className="form-group row">
                        <div className="col-lg-12">
                            <label className="col-form-label">{t('order.note')}</label>
                            <textarea value={ model.note } onChange={ (e) => this.handleChangeModel('', 'note', e.target.value) } rows="5" className="form-control" />
                        </div>
                    </div>

                    <div className="ibox">
                        <div className="ibox-title">
                            <h5>{t('order.damage')}</h5>
                        </div>
                        <div className="ibox-content">
                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <label className="col-form-label">{t('order.type')}</label>
                                    <select value={ model.damage.typeId } onChange={ (e) => this.handleChangeModel('damage', 'typeId', e.target.value) } className="form-control m-b">
                                        <option value="1">Type 1</option>
                                    </select>
                                </div>

                                <div className="col-lg-8">
                                    <label className="col-form-label">{t('order.incident_date')}</label>
                                    <input value={ model.damage.incidentDate } onChange={ (e) => this.handleChangeModel('damage', 'incidentDate', e.target.value) } type="date" 
                                        placeholder="07/22/2018" className="form-control" />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <label className="col-form-label">{t('order.incident_place')}</label>
                                    <input value={ model.damage.incidentPlace } onChange={ (e) => this.handleChangeModel('damage', 'incidentPlace', e.target.value) } type="text" 
                                        placeholder="At my home in the garden" className="form-control" />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <label className="col-form-label">{t('order.description')}</label>
                                    <textarea value={ model.damage.description } onChange={ (e) => this.handleChangeModel('damage', 'description', e.target.value) } name="note" rows="5" className="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ibox">
                        <div className="ibox-title">
                            <h5>{t('order.device')}</h5>
                        </div>
                        <div className="ibox-content">
                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <label className="col-form-label">{t('order.uuid')}</label>
                                    <input value={ model.device.uuid } onChange={ (e) => this.handleChangeModel('device', 'uuid', e.target.value) } type="text" placeholder="Device UUID" className="form-control" />
                                </div>

                                <div className="col-lg-8">
                                    <label className="col-form-label">{t('order.label')}</label>
                                    <input value={ model.device.label } onChange={ (e) => this.handleChangeModel('device', 'label', e.target.value) } type="text" placeholder="iPhone X" className="form-control" />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <label className="col-form-label">{t('order.supplier')}</label>
                                    <input value={ model.device.supplier } onChange={ (e) => this.handleChangeModel('device', 'supplier', e.target.value) } type="text" placeholder="Apple" className="form-control" />
                                </div>

                                <div className="col-lg-8">
                                    <label className="col-form-label">{t('order.model')}</label>
                                    <input value={ model.device.model } onChange={ (e) => this.handleChangeModel('device', 'model', e.target.value) } type="text" placeholder="iPhone X" className="form-control" />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <label className="col-form-label">{t('order.serial_number')}</label>
                                    <input value={ model.device.serialnumber } onChange={ (e) => this.handleChangeModel('device', 'serialnumber', e.target.value) } type="text" 
                                        placeholder="303139463810499" className="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ibox">
                        <div className="ibox-title">
                            <h5>{t('order.customer')}</h5>
                        </div>
                        <div className="ibox-content">
                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <label className="col-form-label">{t('order.salutation')}</label>
                                    <select value={ model.customer.salutation } onChange={ (e) => this.handleChangeModel('customer', 'salutation', e.target.value) } className="form-control m-b" name="language">
                                        <option value="m">{t('order.man')}</option>
                                        <option value="w">{t('order.woman')}</option>
                                    </select> 
                                </div>
                            </div>
                            
                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <label className="col-form-label">{t('order.first_name')}</label>
                                    <input value={ model.customer.firstname } onChange={ (e) => this.handleChangeModel('customer', 'firstname', e.target.value) } type="text" placeholder="Jane" className="form-control" />
                                </div>

                                <div className="col-lg-8">
                                    <label className="col-form-label">{t('order.last_name')}</label>
                                    <input value={ model.customer.lastname } onChange={ (e) => this.handleChangeModel('customer', 'lastname', e.target.value) } type="text" placeholder="Doe" className="form-control" />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <label className="col-form-label">{t('order.company')}</label>
                                    <input value={ model.customer.company } onChange={ (e) => this.handleChangeModel('customer', 'company', e.target.value) } type="text" placeholder="MicroFly" className="form-control" />
                                </div>

                                <div className="col-lg-8">
                                    <label className="col-form-label">{t('order.language')}</label>
                                    <select value={ model.customer.language } onChange={ (e) => this.handleChangeModel('customer', 'language', e.target.value) } className="form-control m-b" name="language">
                                        <option value="en">{t('order.english')}</option>
                                        <option value="de">{t('order.german')}</option>
                                    </select> 
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <label className="col-form-label">{t('order.phone')}</label>
                                    <input value={ model.customer.phone } onChange={ (e) => this.handleChangeModel('customer', 'phone', e.target.value) } type="text" placeholder="07162804656" className="form-control" />
                                </div>

                                <div className="col-lg-8">
                                    <label className="col-form-label">{t('order.email')}</label>
                                    <input value={ model.customer.email } onChange={ (e) => this.handleChangeModel('customer', 'email', e.target.value) } type="text" 
                                        placeholder="janedoe@gmail.com" className="form-control" />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="ibox">
                        <div className="ibox-title">
                            <h5>{t('order.supplier')}</h5>
                        </div>
                        <div className="ibox-content">
                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <label className="col-form-label">{t('order.address_type')}</label>
                                    <select value={ model.address.addressType } onChange={ (e) => this.handleChangeModel('address', 'addressType', e.target.value) } className="form-control m-b" name="language">
                                        <option value="customer">customer</option>
                                    </select> 
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <label className="col-form-label">{t('order.country')}</label>
                                    <select value={ model.address.country } onChange={ (e) => this.handleChangeModel('address', 'country', e.target.value) } className="form-control m-b" name="country">
                                        <option value="de">German</option>
                                        <option value="en">Turkey</option>
                                    </select> 
                                </div>

                                <div className="col-lg-8">
                                    <label className="col-form-label">{t('order.city')}</label>
                                    <input value={ model.address.city } onChange={ (e) => this.handleChangeModel('address', 'city', e.target.value) } type="text" placeholder="Potsdam" className="form-control" />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <label className="col-form-label">{t('order.street')}</label>
                                    <input value={ model.address.street } onChange={ (e) => this.handleChangeModel('address', 'street', e.target.value) } type="text" 
                                        placeholder="Fugger Strasse 18" className="form-control" />
                                </div>

                                <div className="col-lg-8">
                                    <label className="col-form-label">{t('order.zip')}</label>
                                    <input value={ model.address.zip } onChange={ (e) => this.handleChangeModel('address', 'zip', e.target.value) } type="text" placeholder="67294" className="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ibox">
                        <div className="ibox-title">
                            <h5>{t('order.delivery')}</h5>
                        </div>
                        <div className="ibox-content">
                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <label className="col-form-label">{t('order.type')}</label>
                                    <select value={ model.delivery.typeId } onChange={ (e) => this.handleChangeModel('delivery', 'typeId', e.target.value) } className="form-control m-b" name="language">
                                        <option value="1">Type 1</option>
                                        <option value="5">Type 5</option>
                                    </select> 
                                </div>
                                <div className="col-lg-8">
                                    <label className="col-form-label">{t('order.salutation')}</label>
                                    <select value={ model.delivery.salutation } onChange={ (e) => this.handleChangeModel('delivery', 'salutation', e.target.value) } className="form-control m-b" name="language">
                                        <option value="m">{t('order.man')}</option>
                                        <option value="w">{t('order.woman')}</option>
                                    </select> 
                                </div>
                            </div>
                            
                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <label className="col-form-label">{t('order.first_name')}</label>
                                    <input value={ model.delivery.firstname } onChange={ (e) => this.handleChangeModel('delivery', 'firstname', e.target.value) } type="text" placeholder="Jane" className="form-control" />
                                </div>

                                <div className="col-lg-8">
                                    <label className="col-form-label">{t('order.last_name')}</label>
                                    <input value={ model.delivery.lastname } onChange={ (e) => this.handleChangeModel('delivery', 'lastname', e.target.value) } type="text" placeholder="Doe" className="form-control" />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <label className="col-form-label">{t('order.company')}</label>
                                    <input value={ model.delivery.company } onChange={ (e) => this.handleChangeModel('delivery', 'company', e.target.value) } type="text" placeholder="MicroFly" className="form-control" />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <label className="col-form-label">{t('order.country')}</label>
                                    <select value={ model.delivery.country } onChange={ (e) => this.handleChangeModel('delivery', 'country', e.target.value) } className="form-control m-b" name="country">
                                        <option value="DE">German</option>
                                        <option value="EN">Turkey</option>
                                    </select> 
                                </div>

                                <div className="col-lg-8">
                                    <label className="col-form-label">{t('order.city')}</label>
                                    <input value={ model.delivery.city } onChange={ (e) => this.handleChangeModel('delivery', 'city', e.target.value) } type="text" placeholder="Potsdam" className="form-control" />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-4">
                                    <label className="col-form-label">{t('order.street')}</label>
                                    <input value={ model.delivery.street } onChange={ (e) => this.handleChangeModel('delivery', 'street', e.target.value) } type="text" 
                                        placeholder="Fugger Strasse 18" className="form-control" />
                                </div>

                                <div className="col-lg-8">
                                    <label className="col-form-label">{t('order.zip')}</label>
                                    <input value={ model.delivery.zip } onChange={ (e) => this.handleChangeModel('delivery', 'zip', e.target.value) } type="text" placeholder="67294" className="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-lg-12">
                            {error}
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-lg-12">
                            <FormSubmit text={ t('login.submit') } loading={ this.props.order.loading } right
                                onClickHandler={ this.handleCreateOrder }/>
                        </div>
                    </div>
                </div>
            </div></div></div></div>
        )
    }
}

export default withNamespaces()(CreateOrderPage)

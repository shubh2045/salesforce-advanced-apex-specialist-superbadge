import { LightningElement, track, wire } from 'lwc';
import  createAccount  from '@salesforce/apex/DataController.createAccount';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT from '@salesforce/schema/Account';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class FormWarnings extends LightningElement {
    
    value = 'initial value';
    @track account = {};
    industryFieldValues
    @wire (getPicklistValues, { recordTypeId: '012000000000000AAA', fieldApiName: INDUSTRY_FIELD })
    wirehandler({data, error}){
        if(data){
            this.industryFieldValues = data
            console.log('data', data)
        }
        if(error){
            console.error(error)
        }
    }
    
    setAccountData(event){
        let target = event.target;
        this.account[target.dataset.fieldname] = target.value;
    }
    handleSubmit(evt) {
        console.log('Current value of the input: ' + evt.target.value);


        console.log('account ',this.account);
        createAccount({account:this.account})
        .then(result=>{
            alert('Account created successfully.')
        })
        .catch(error=>{
            alert('Error occured.')
        })
    }


    handleClick(evt) {
        console.log('Current value of the input: ' + evt.target.value);

        const allValid = [
            ...this.template.querySelectorAll('lightning-input'),
        ].reduce((validSoFar, inputCmp) => {
            inputCmp.reportValidity();
            return validSoFar && inputCmp.checkValidity();
        }, true);
        if (allValid) {
            alert('All form entries look valid. Ready to submit!');
        } else {
            alert('Please update the invalid form entries and try again.');
        }
    }


}
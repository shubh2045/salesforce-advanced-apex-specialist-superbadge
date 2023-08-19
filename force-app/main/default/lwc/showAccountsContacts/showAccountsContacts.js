import { LightningElement, wire } from 'lwc';
// import ACCOUNT_OBJ from '@salesforce/schema/Account';
// import {showAccounts, showContacts} from '@salesforce/apex/DataController.showAccounts';
// import {showContacts} from '@salesforce/apex/DataController.showContacts';

import showAccounts from '@salesforce/apex/DataController.showAccounts';
import showContacts from '@salesforce/apex/DataController.showContacts';
import getAccountsWithContactsName from '@salesforce/apex/DataController.getAccountsWithContactsName';
import ContactMobile from '@salesforce/schema/Case.ContactMobile';


export default class ShowAccountsContacts extends LightningElement {
    accounts = null
    contacts = null
    accConMap
    accNames
    error
    accId
    connectedCallback(){
        console.log('Connected Callback invoked.');
    }
    @wire(showAccounts)
    wireHandler({data, error}){
        console.log('wire service invoked.');
        if(data){
            this.accounts = data;
            console.log(this.accounts);
        }
        if(error){
            console.error(error)
        }
    }
    handleClick(event){
        //alert(event.target.dataset.id);
        this.accId = event.target.dataset.id;
        showContacts({accId:this.accId}).then(result => {
            this.contacts = result;
        })
        .catch(error => {
            this.error = error;
        });
        //alert(JSON.stringify(this.contacts));
    }

    accountClick(event){
        this.accId = event.target.dataset.value;
        console.log('@@',this.accId);
        showContacts({accId:this.accId}).then(result => {
            this.contacts = result;
        })
        .catch(error => {
            this.error = error;
        });
    }

    // @wire(getAccountsWithContactsName)
    // wireHandler({data, error}){
    //     if(data){
    //         this.accConMap = data;
    //         this.accConMap.forEach(function(currentItem){
    //             this.accNames.add(currentItem);
    //         })
    //         console.log(this.accounts);
    //     }
    //     if(error){
    //         console.error(error)
    //     }
    // }

}
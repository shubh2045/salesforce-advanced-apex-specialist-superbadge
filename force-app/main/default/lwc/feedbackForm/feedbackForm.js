import { LightningElement, api, track } from 'lwc';
import FEEDBACK_OBJECT from '@salesforce/schema/Feedback__c';
import NAME_FIELD from '@salesforce/schema/Feedback__c.Name';
import AOI_FIELD from '@salesforce/schema/Feedback__c.Areas_of_improvement__c';
import PHONE_FIELD from '@salesforce/schema/Feedback__c.Phone__c';
import EMAIL_FIELD from '@salesforce/schema/Feedback__c.Email__c';
import LAY_FIELD from '@salesforce/schema/Feedback__c.Liked_about_You__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'

export default class FeedbackForm extends LightningElement {

    isShow = false
    message
    title
    objectName = FEEDBACK_OBJECT;
    fields = {
        layField: LAY_FIELD,
        nameField: NAME_FIELD,
        aoiField: AOI_FIELD,
        phoneField: PHONE_FIELD,
        emailField: EMAIL_FIELD
    }

    handleReset() {
        const fields = this.template.querySelectorAll('lightning-input-field');
        Array.from(fields).forEach(element => {
            element.reset();

        });

    }


    handleSubmit(event) {
        event.preventDefault();
        const fields = event.detail.fields;

        this.template.querySelector('lightning-record-edit-form').submit(fields);
        this.isShow = true;
        this.title = "Thank You !!";
        this.message="Your feedback has been submitted.";
        setTimeout(()=>{
            this.isShow=false;
            this.handleReset();
        },4000)
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(evt);
    }

    handleClick(){
        this.isShow = false;
    }
}
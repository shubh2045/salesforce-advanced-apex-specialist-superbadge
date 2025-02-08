import { LightningElement, track, api } from 'lwc';
export default class QuickNavigation extends LightningElement {

    @track isExpanded = false;
    selectedAction;
    @api recId;
    //caseUrl = 'https://idfcfirstbank29-dev-ed.develop.lightning.force.com/lightning/action/quick/Account.New_Case?objectApiName=Case&context=RECORD_DETAIL&recordId='+this.recId+'&backgroundContext=%2Flightning%2Fr%2FAccount%2F'+this.recId+'%2Fview';

    expandedOptions = [];

    connectedCallback() {
        //code
        this.expandedOptions = [
            // { id: 3, label: 'Log a call', url: '/lightning/o/Task/new?count=1' },
            { id: 1, label: 'Google', url: 'https://www.google.com/' },
            { id: 2, label: 'Mergely', url: 'https://editor.mergely.com/' },
            { id: 3, label: 'Trailhead', url: 'https://trailhead.salesforce.com/' },
            { id: 4, label: 'New Case' },
            { id: 5, label: 'New Case 1', url: 'https://idfcfirstbank29-dev-ed.develop.lightning.force.com/lightning/action/quick/Account.New_Case?objectApiName=Case&context=RECORD_DETAIL&recordId=' + this.recId + '&backgroundContext=%2Flightning%2Fr%2FAccount%2F' + this.recId + '%2Fview' }
        ];
    }

    handleMouseOver() {
        this.isExpanded = true;
    }

    handleMouseOut() {
        this.isExpanded = false;
    }

    get panelClass() {
        return this.isExpanded ? 'side-panel expanded' : 'side-panel';
    }

    handleLinkClick(event) {
        console.log('$$$ record id', this.recId);
        this.selectedAction = event.target.dataset.label;
        const selectedEvent = new CustomEvent('select', {
            detail: {
                data: this.selectedAction
            }
        });
        console.log('selected action ', this.selectedAction);
        this.dispatchEvent(selectedEvent);
    }
}
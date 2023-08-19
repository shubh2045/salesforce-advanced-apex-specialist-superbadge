({  
    /**
     * @Name:           utilCreateRecord
     * @Description     Opens a modal to create a new record and redirects to it after saving
     */
    utilCreateRecord : function(component, recordDetails){
        recordDetails.defaultFieldValues = component.find("pageRefUtils").encodeDefaultFieldValues(recordDetails.defaultFieldValues);
        let pageReference = {
            type: 'standard__objectPage',
            attributes: {
                objectApiName: recordDetails.sObjectType,
                actionName: 'new'
            },
            state: {
                defaultFieldValues: recordDetails.defaultFieldValues
            }
        };
        
        let navService = component.find("navService");
        navService.navigate(pageReference, true);
    },
    
    /**
     * @Name:           utilGetURLParameters
     * @Description     Fetches the URL parameters and puts them in an object
     */
    utilGetURLParameters : function(){
        let urlSearchParams = {};
        let stringSearchParams = decodeURIComponent(window.location.search).slice(1); //slice() removes ?
        if(stringSearchParams !== ''){
            let arraySearchParams = stringSearchParams.split('&');
            for(let i=0; i<arraySearchParams.length; i++){
                let arrayTempParam = arraySearchParams[i].split('=');
                arrayTempParam[0] = decodeURIComponent(arrayTempParam[0]);
                arrayTempParam[1] = decodeURIComponent(arrayTempParam[1]);
                urlSearchParams[arrayTempParam[0]] = arrayTempParam[1];
            }
        }
        
        return urlSearchParams;
    },
    
    /**
     * @name        utilHandleErrors
     * @description Display errors on the component
     */
    utilHandleErrors : function(errors) {
        // Configure error toast
        let toastParams = {
            title: "Error",
            message: "Unknown error", // Default error message
            type: "error"
        };
        // Pass the error message if any
        if (errors && Array.isArray(errors) && errors.length > 0) {
            toastParams.message = errors[0].message;
        }else if (!Array.isArray(errors) ){
            toastParams.message = errors;
        }
        // Fire error toast
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams(toastParams);
        toastEvent.fire();
    },
    
    /**
     * @Name:           utilHandleSort
     * @Description     Method called to handle the sort feature
     */
    utilHandleSort : function(component, event){
        //Returns the field which has to be sorted
        var sortBy = event.getParam("fieldName");
        //returns the direction of sorting like asc or desc
        var sortDirection = event.getParam("sortDirection");
        //Set the sortBy and SortDirection attributes
        component.set("v.sortBy", sortBy);
        component.set("v.sortDirection", sortDirection);
        // call sortData helper function
        return this.utilSortData(component, sortBy, sortDirection);
    },
    
    /**
     * @Name:           utilNavigateToRecord
     * @Description     Navigate to a record
     */
    utilNavigateToRecord : function(component, recordAttributes){
        let pageReference = {
            type: 'standard__recordPage',
            attributes: recordAttributes
        };
        let navService = component.find('navService');
        navService.navigate(pageReference, true);
    },
    
    /**
     * @Name:           utilSortData
     * @Description     Sort algorithm
     */
    utilSortData : function(component, fieldName, sortDirection){
        component.set('v.boolContinueflowDisabled', true);
        var data = component.get("v.searchResultData");
        //function to return the value stored in the field
        var key = function(a) { return a[fieldName]; } 
        var reverse = sortDirection == 'asc' ? 1: -1;
        
        // to handle text type fields 
        data.sort(function(a, b){ 
            var a = key(a) ? key(a).toLowerCase() : '';//To handle null values , uppercase records during sorting
            var b = key(b) ? key(b).toLowerCase() : '';
            return reverse * ((a>b) - (b>a));
        });
        
        //set sorted data to accountData attribute
        return data;
    },
    
    /**
     * @Name:           utilPromise
     * @Description     Returns a Promise for an action passed in parameter
     */
    utilPromise : function(component, action) {
        return new Promise( $A.getCallback( function(resolve, reject) {
            action.setCallback(
                this,
                function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        resolve(response);
                    } else {
                        reject(response.getError());
                    }
                }
            ); 
            $A.enqueueAction(action);
        }));
    },
})
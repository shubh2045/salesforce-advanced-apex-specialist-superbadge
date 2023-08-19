({
	handleEvent : function(component, event, helper) {
		var searchParam = event.getParam('searchText');
        var action = component.get('c.getRecordList');
        action.setParams({
            ObjectName 		: component.get('v.objName'),
            searchText 		: searchParam,
            fieldInSearch 	: component.get('v.fieldName')
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            //alert(state);
            if(state === 'SUCCESS' || state === 'DRAFT'){
                var resposeVal = response.getReturnValue();
                console.log(resposeVal);
                component.set('v.recordList', resposeVal);
            }
        });
        $A.enqueueAction(action);
        
	}
})
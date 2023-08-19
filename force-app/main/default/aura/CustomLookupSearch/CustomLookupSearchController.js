({
	handleKeyUp : function(component, event, helper) {
		var searchText = component.find('enter-search').get('v.value');
        //alert(searchText);
        var event = component.getEvent("LookupEvt");
        event.setParams({
            searchText : searchText
        });
        event.fire();
	}
})
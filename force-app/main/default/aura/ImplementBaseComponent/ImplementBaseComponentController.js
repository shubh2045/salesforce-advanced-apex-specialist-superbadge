({
    doInit : function(component, event, helper) {
        console.log('Before Promise starts');
        var action1 = component.get("c.getAccount");
        action1.setParams({
            accName : 'United'
        });
        var action2 = component.get("c.getContact");
        action2.setParams({
            conName : 'John'
        });
        
        helper.utilPromise(component, action1).then(
            // resolve handler
            $A.getCallback(function(response) {
                let result = response.getReturnValue();
                console.log('action1 result '+result);
                component.set("v.accountList", result);
                return helper.utilPromise(component, action2);
            }),
            
            // reject handler
            $A.getCallback(function(error) {
                console.error("Promise was rejected: ", error);
                helper.utilHandleErrors(err);
            })
            
        ).then(
            // resolve handler
            $A.getCallback(function(response) {
                let result = response.getReturnValue();
                console.log('action2 result '+result);
                component.set("v.contactList", result);
                //return helper.utilPromise(component,action3);
            }),
            
            // reject handler
            $A.getCallback(function(error) {
                console.error("Promise was rejected: ", error);
                helper.utilHandleErrors(err);
            })
        ).catch(
            function(error) {
                $A.reportError("error message here", error);
            });
    }
})
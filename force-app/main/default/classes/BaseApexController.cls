public with sharing class BaseApexController {
    public BaseApexController() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccount(String accName) {
        // your code here
        String subQuery = '%' + accName + '%';

        //String strQuery = '[SELECT Id, Name FROM Account WHERE Name LIKE' + ;
        return [SELECT Id, Name FROM Account WHERE Name LIKE :subQuery LIMIT 5];
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContact(String conName) {
        // your code here
        String subQuery = '%' + conName + '%';

        return [SELECT Id, FirstName, LastName FROM Contact WHERE FirstName LIKE :subQuery LIMIT 5];
    }
}
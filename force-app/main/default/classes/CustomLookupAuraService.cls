public class CustomLookupAuraService {
    @AuraEnabled
    public static List<sObject> getRecordList(String ObjectName, String searchText,String fieldInSearch){
        String searchKey = '%' + searchText + '%';
        String Query = 'SELECT Id, '+fieldInSearch;
        Query+=' FROM '+ObjectName;
        Query+=' WHERE '+fieldInSearch+' LIKE : searchKey';
        List<sObject> sObjectList = Database.query(Query);
        System.debug(' #### sObjectList '+sObjectList);
        return sObjectList;
    }
}
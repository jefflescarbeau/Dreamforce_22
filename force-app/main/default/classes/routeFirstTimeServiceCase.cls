public class routeFirstTimeServiceCase {

    @InvocableMethod(label='Route First Time Service Case' description='returns a list of users who should own this case')
    public static List<MyFancyResults> getRoutedUsers(List<MyFancyRequest> requestRecords) {
        User u = [Select Id, username from User where LastName = 'Lescarbeau' LIMIT 1];
        MyFancyResults fancypants = new MyFancyResults(u);
        
        List<MyFancyResults> resultsList = new List<MyFancyResults>();
        resultsList.add(fancypants);
        return resultsList;

    }

    public class MyFancyRequest{
        @InvocableVariable(label='case record ID' description='Case record Id' required=true)
        public Id caseId;

        @InvocableVariable(label='case type' description='Case type' required=true)
        public String caseType;
    }

    public class MyFancyResults{
        @InvocableVariable(label='A user Id to route to' description='This is a user ID' required=true)
        public Id userId;
        @InvocableVariable(label='A user name to route to' description='This is a user name' required=true)
        public String username;

        public MyFancyResults(User recievedUser){
            userId = recievedUser.Id;
            username = recievedUser.Username;
        }
    }
}

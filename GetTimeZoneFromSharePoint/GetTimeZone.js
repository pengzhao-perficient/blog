var spTimeZoneId;
// Get SPS-TimeZone property from user profile
SP.SOD.executeFunc('SP.js', 'SP.ClientContext', function () {
    SP.SOD.executeFunc('userprofile', 'SP.UserProfiles.PeopleManager', function () {

        var clientContext = new SP.ClientContext.get_current();
        var peopleManager = new SP.UserProfiles.PeopleManager(clientContext);
        var web = clientContext.get_web();
        var siteTimeZone = web.get_regionalSettings().get_timeZone();
        var personProperties = peopleManager.getMyProperties();
        clientContext.load(siteTimeZone);
        clientContext.load(personProperties);
        clientContext.executeQueryAsync(
            Function.createDelegate(this,
                function () {
                    console.log("Site Time Zone :" + siteTimeZone.get_description());

                    var userTimeZoneValue = personProperties.get_userProfileProperties()['SPS-TimeZone'];
                    console.log("User Time Zone :" + userTimeZoneValue);

                    if (userTimeZoneValue) {
                        // use the time zone setting from user proifle 
                        spTimeZoneId = SPTimeZoneNameToSPTimeZoneId[userTimeZoneValue];

                    } else {
                        // Use site time zone setting 
                        spTimeZoneId = SPTimeZoneNameToSPTimeZoneId[siteTimeZone.get_description()];
                    }

                }),
            Function.createDelegate(this,
                function (sender, args) {
                    console.log(args.get_message());
                })
        );

    }); // end of Ensure userprofile
}); //end of Ensure SP.js


Parse.initialize("mpuTWZgtQanqfCdO8IWJEJbHTZoQq97h6pG2qhGT", "2Xpjqqtz71ab31Hp9jHRARW7t7jaaBjjnZRJy77o");
function myFacebookLogout()
{
        console.log(Parse.User.current());
        alert("myFacebookLogout");
        Parse.User.logOut();
        $("#user_id").html("");
        $("#kmdn_login").show();
        $("#kmdn_logout").hide();

}
function myFacebookLogin()
{
        alert("myFacebookLogin");
        Parse.FacebookUtils.logIn("email", {
                success: function(user) {
                        if (!user.existed()) 
                        {
                                alert("User signed up and logged in through Facebook!");
                        } 
                        else 
                        {
                                alert("User logged in through Facebook!");
                                console.log(Parse.User.current());
                        }
                        if (typeof(user.get("points")) == "undefined")
                        {
                                user.set("points", 0);
                        }
                        FB.api('/me', function(me) {
                                user.set("displayName", me.name);
                                /*
                                user.set("email", me.email);
                                */
                                user.save();
                                console.log("/me response", me);
                                $("#user_id").html(user.get("displayName") + " " + "(" + user.get("points") + ")");
                        });
                        console.log(user);
                        console.log(user.id);
                        console.log(user.get("points"));
                        $("#kmdn_login").hide();
                        $("#kmdn_logout").show();
                },
                error: function(user, error) {
                        alert("User cancelled the Facebook login or did not fully authorize.");
                }
        });
}
window.fbAsyncInit = function() {
        Parse.FacebookUtils.init({ // this line replaces FB.init({
                appId      : '846091538840474', // Facebook App ID
                status     : true,  // check Facebook Login status
                cookie     : true,  // enable cookies to allow Parse to access the session
                xfbml      : true,  // initialize Facebook social plugins on the page
                version    : 'v2.5' // point to the latest Facebook Graph API version
        });

        // Run code after the Facebook SDK is loaded.
        };

        (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

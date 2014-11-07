// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

AV.Cloud.beforeSave("_User", function(request, response) {
    var email = request.object.get("email");
    var len = email.length;
    var suffix = email.SubString(email.IndexOf('@'), len - 1);
    AV.Cloud.run("checkEmail", {emailSuffix: 'suffix'}, {
        success:function(data) {        
        },
        error:function(err) {
            request.object.set("email", null);
        }
    });
});

AV.Cloud.define("checkEmail", function(request, response) {
    //response.success("success!");
    var query = new AV.Query("Top500Email");
    query.whereEqualTo("emailSuffix", request.params.emailSuffix);
    query.find({
        success:function(results) {
            response.success("You are in TOP 500!");
        },
        error:function(error) {
            response.error("You are not in TOP 500, sorry!");
        }
    }); 
});

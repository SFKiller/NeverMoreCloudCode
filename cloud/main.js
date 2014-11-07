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
    var query = new AV.Query("Top500Email");
    query.equalTo("emailSuffix", request.params.suffix);
    query.find({
        success:function() {
            response.success("You are in TOP 500!");
        },
        error:function() {
            response.error("You are not in TOP 500, sorry!");
        }
    }); 
});

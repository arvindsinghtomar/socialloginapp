var http = require("http");
var request = require("request");
var configureStrategies = require("./configureStrategies");
function getJSON(rpt, onResult) {
    console.log("-----------IN JSON---------");
    var options = {
        method: 'POST',
        url: 'https://ce-dev.gluu.org/identity/seam/resource/restv1/passportconfig/',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: {
            access_token: rpt
        }
    };
    console.log("Final request: ", options);
    request(options, function (error, response, body) {
        if (error) {
            return onResult(error, null);
        }

        console.log("Final response", body);
        configureStrategies.setConfiguratins(JSON.parse(body));
        return onResult(null, body);

    });
}

exports.getATT = function (callback) {

    console.log("-----------IN ATT---------");
    var username = "@!5A58.AE0D.D383.1E46!0001!E38B.7DBE!0008!BB95.73E1";
    var password = "passport";
    var toEncode = username.concat(":",password);
    console.log("toEncode: ", toEncode);
    var basicToken = new Buffer(toEncode).toString('base64');
    var options = {
        method: 'POST',
        url: 'https://ce-dev.gluu.org/oxauth/seam/resource/restv1/oxauth/token',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            authorization: 'Basic'.concat(" ", basicToken)
        },
        form: {
            grant_type: 'client_credentials',
            scope: 'uma_authorization'
        }
    };
    console.log("ATT request: ", options);
    request(options, function (error, response, body) {
        if (error) {
            return callback(error, null);
        }
        console.log("ATT response: ",body);
        var ATTDetails = JSON.parse(body);
        getGAT(ATTDetails, function (err, data) {
            if(err){
                return callback(err, null);
            }
            return callback(null, data);
        });
    });
}

function getGAT(ATTDetails, callback) {
    console.log("-----------IN GAT---------");

    console.log("ATT details: ", ATTDetails);
    var accessToken = ATTDetails.access_token;
    var options = {
        method: 'POST',
        url: 'https://ce-dev.gluu.org/oxauth/seam/resource/restv1/requester/gat',
        headers:
        {
            'content-type': 'application/json',
            gat: 'true',
            authorization: 'Bearer '.concat(accessToken)
        },
        body: {
            scopes: [ 'uma_authorization' ]
        },
        json: true
    };
    console.log("GAT request: ", options);
    request(options, function (error, response, body) {
        if (error) {
            return callback(error, null);
        }
        console.log("GAT response: ",body);

        console.log("Get rpt before parsing: ", body.rpt);
        var rpt = body.rpt;
        getJSON(rpt, function (err, data) {
            if(err){
                return callback(err, null);
            }
            return callback(null, data);
        });
    });
}
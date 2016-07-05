from org.jboss.seam.security import Identity
from org.xdi.model.custom.script.type.auth import PersonAuthenticationType
from org.xdi.oxauth.service import UserService, ClientService, AuthenticationService
from org.xdi.oxauth.model.common import User
from org.xdi.util import StringHelper
from org.xdi.oxauth.util import ServerUtil
try:
    #from twte import Api
    import twitter
    print("import successfully")
except Exception,err:
    print(" error occure while import twitter pakeage "+str(err))
import java


class PersonAuthentication(PersonAuthenticationType):
    def __init__(self, currentTimeMillis):
        self.currentTimeMillis = currentTimeMillis

    def init(self, configurationAttributes):
        print "Basic. Initialization init method call ^&"
        print "Basic. Initialized successfully"
        return True   

    def destroy(self, configurationAttributes):
        print "Basic. Destroy destroy method call ^&"
        print "Basic. Destroyed successfully"
        return True

    def getApiVersion(self):
        return 1

    def isValidAuthenticationMethod(self, usageType, configurationAttributes):
        return True

    def getAlternativeAuthenticationMethod(self, usageType, configurationAttributes):
        return None

    def authenticate(self, configurationAttributes, requestParameters, step):
        try:
            enrollment_mode = ServerUtil.getFirstValue(requestParameters, "loginForm:token")
            print("before fatching request parameter")
            print("success "+str(type(enrollment_mode)))
            patht = enrollment_mode.decode('utf-8')
            print (patht)
            try:
                api = twitter.Api(consumer_key='iObC2FyT9385PweLYRXMoGvrF',consumer_secret='ROgNGXq1k6fAY9sWFI0hyEGYHHiwbzEk11Lkjs3Pc7LZFID8Cp',access_token_key='4767926599-pDtpzPxFqVE32Ufb8oVPgJTlIYUbxs6Yw3StyWI',access_token_secret='LRJB7cK1cnGhlN3NDERzxzejODzEcwm8PH43Kwenf4PM9')
                print(api.VerifyCredentials())
            except Exception,err:
                print ("twitter api Error "+str(err))

            try:
                userService = UserService.instance()
                authenticationService = AuthenticationService.instance()
                foundUser = userService.getUserByAttribute("oxExternalUid", "twitter:" + patht)
                print("Found user Log "+str(foundUser))
                print("user id "+str(type(foundUser.getUserId())))
                if (foundUser == None):
                    noby=User()
                    noby.setAttribute("oxExternalUid","twitter:"+patht)
                    foundUser = userService.addUser(noby, True)
                    print("success")
                    return True
                foundUserName = foundUser.getUserId()
                print("this is user id "+str(foundUserName))
                userAuthenticated = authenticationService.authenticate(foundUserName)
                return True
            except Exception,err:
                print ("Error while adding new user ")
                print ("error "+str(err))
            #print (" error occure during request parameter fatching outside "+enrollment_mode['name'])
        except Exception,err:
            print ("error occure during request parameter fatching "+str(err))
        if (step == 1):
            print "Basic. Authenticate for step 1 method call ^&"

            credentials = Identity.instance().getCredentials()
            user_name = credentials.getUsername()
            user_password = credentials.getPassword()

            logged_in = False
            if (StringHelper.isNotEmptyString(user_name) and StringHelper.isNotEmptyString(user_password)):
                userService = UserService.instance()
                logged_in = userService.authenticate(user_name, user_password)

            if (not logged_in):
                return False

            return True
        else:
            print ("Else part of step1 ")
            return False

    def prepareForStep(self, configurationAttributes, requestParameters, step):
        if (step == 1):
            print "Basic. Prepare for Step 1 method call ^&"
            return True
        else:
            return False

    def getExtraParametersForStep(self, configurationAttributes, step):
        return None

    def getCountAuthenticationSteps(self, configurationAttributes):
        return 1

    def getPageForStep(self, configurationAttributes, step):
        if (step == 1):
            return "/auth/twitter/twitterlogin.xhtml"

        return "/auth/twitter/twitterpostlogin.xhtml"

    def logout(self, configurationAttributes, requestParameters):
        return True 

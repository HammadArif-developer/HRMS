class userClass {
    user = {
      userID: "",
      userType: "",
    };
    setID = (uID) => {
      this.user.userID = uID;
    };
    setType = (uT) => {
      this.user.userType = uT;
    };
    returnUser() {
      return this.user;
    }
    returnUserID() {
        return this.user.userID;
    }
  }
  
const userclass = new userClass();
export default userclass;
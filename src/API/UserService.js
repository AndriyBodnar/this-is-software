import axios from "axios";

export default class UserService {
  static async getUsers(result = 10) {
    const params = {
      results: result,
      inc: "gender,name,location,picture,email",
    };

    const response = await axios.get("https://randomuser.me/api", {
      params,
    });
    return response;
  }
}

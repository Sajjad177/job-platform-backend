import config from "../config";
import { USER_ROLE } from "../modules/user/user.constant";
import { User } from "../modules/user/user.model";

const admin = {
  name: {
    firstName: "Nishat",
    middleName: "al",
    lastName: "Rahman",
  },
  email: config.admin.adminEmail,
  password: config.admin.adminPassword,
  role: USER_ROLE.ADMIN,
  isDeleted: false,
};

const createAdmin = async () => {
  const isAdminExist = await User.findOne({ role: USER_ROLE.ADMIN });
  if (!isAdminExist) {
    await User.create(admin);
  }
};

export default createAdmin;

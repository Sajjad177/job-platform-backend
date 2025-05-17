import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { TCompany } from "./company.interface";
import { Company } from "./company.model";
import { User } from "../user/user.model";
import { TUser } from "../user/user.interface";

const createCompanyInDB = async (payload: TCompany) => {
  const existingCompanies = await Company.find({
    employees: { $in: payload.employees },
  }).populate<{ employees: TUser[] }>("employees", "name email");

  // check if any employee is already assigned to a company
  if (existingCompanies.length > 0) {
    const conflictMessages: string[] = [];

    for (const company of existingCompanies) {
      for (const employee of company.employees) {
        if (
          payload.employees
            .map((e) => e.toString())
            .includes(employee._id.toString())
        ) {
          const fullName = `${employee?.name?.firstName} ${employee?.name?.lastName}`;
          conflictMessages.push(
            `${fullName} already assigned to ${company.name}`
          );
        }
      }
    }

    throw new AppError(conflictMessages.join(", "), StatusCodes.CONFLICT);
  }

  // Check roles of employees before assigning
  const assignedUsers = await User.find({ _id: { $in: payload.employees } });

  const invalidRoleUsers = assignedUsers.filter(
    (user) => user.role !== "employee"
  );

  if (invalidRoleUsers.length > 0) {
    const roleErrors = invalidRoleUsers.map(
      (user) => `${user.name?.firstName} which is not allowed`
    );

    throw new AppError(
      `Only employees allowed, ${roleErrors.join(", ")}`,
      StatusCodes.BAD_REQUEST
    );
  }

  const company = await Company.create(payload);
  await company.populate("employees");
  return company;
};

export const companyService = {
  createCompanyInDB,
};

import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { TCompany } from "./company.interface";
import { Company } from "./company.model";
import { User } from "../user/user.model";
import { TUser } from "../user/user.interface";

const createCompanyInDB = async (payload: TCompany) => {
  const existingCompany = await Company.findOne({
    name: payload.name,
  }).populate<{ employees: TUser[] }>("employees", "name email");

  // check if employees are already assigned elsewhere
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

  // check if all employees are employees
  const users = await User.find({ _id: { $in: payload.employees } });
  const invalidRoleUsers = users.filter((user) => user.role !== "employee");

  if (invalidRoleUsers.length > 0) {
    const roleErrors = invalidRoleUsers.map(
      (user) => `${user.name?.firstName} which is not allowed`
    );
    throw new AppError(
      `Only employees allowed, ${roleErrors.join(", ")}`,
      StatusCodes.BAD_REQUEST
    );
  }

  let company;

  // chcecking if company already exists
  if (existingCompany) {
    const newEmployees = payload.employees.filter(
      (id) =>
        !existingCompany.employees.some(
          (emp) => emp._id.toString() === id.toString()
        )
    );

    // update existing company and add new employees
    company = await Company.findByIdAndUpdate(
      existingCompany._id,
      { $addToSet: { employees: { $each: newEmployees } } },
      { new: true }
    ).populate("employees");
  } else {
    company = (await Company.create(payload)).populate("employees");
  }
  return company;
};

const getAllCompanyFromDB = async () => {
  const result = await Company.find({ isDeleted: false }).populate("employees");
  return result;
};

export const companyService = {
  createCompanyInDB,
  getAllCompanyFromDB,
};

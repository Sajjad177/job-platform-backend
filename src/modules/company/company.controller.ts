import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResonse from "../../utils/sendResponse";
import { companyService } from "./company.service";

const createCompany = catchAsync(async (req, res) => {
  const result = await companyService.createCompanyInDB(req.body);

  sendResonse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Company created successfully",
    data: result,
  });
});

const getAllCompany = catchAsync(async (req, res) => {
  const result = await companyService.getAllCompanyFromDB();

  sendResonse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Company fetched successfully",
    data: result,
  });
});

export const companyController = {
  createCompany,
  getAllCompany,
};

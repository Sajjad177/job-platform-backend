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

export const companyController = {
  createCompany,
};

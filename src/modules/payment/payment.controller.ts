import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResonse from "../../utils/sendResponse";
import { paymentService } from "./payment.service";

const initiatePayment = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await paymentService.initiatePayment(userId, req.body);

  sendResonse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Payment successfully",
    data: result,
  });
});

export const paymentController = {
  initiatePayment,
};

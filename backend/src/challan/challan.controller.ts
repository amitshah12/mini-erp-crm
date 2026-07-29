import { NextFunction, Request, Response } from "express";
import challanService from "./challan.service";
import { ApiResponse } from "../utils/ApiResponse";
import {
  listChallanSchema,
  updateChallanStatusSchema,
  challanIdParamSchema,
} from "./challan.validation";


export class ChallanController {
    create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const challan = await challanService.create(
                req.body,
                req.user!.id
            );

            res.status(201).json(
                ApiResponse.success(
                    "Challan created successfully",
                    challan
                )
            );
        } catch (error) {
            next(error);
        }
    };

    findAll = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const query = listChallanSchema.parse(req.query);

            const challans = await challanService.findAll(query);

            res.json(
                ApiResponse.success(
                    "Challans fetched successfully",
                    challans
                )
            );
        } catch (error) {
            next(error);
        }
    };

    findById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { id } = challanIdParamSchema.parse(req.params);

            const challan = await challanService.findById(id);

            res.json(
                ApiResponse.success(
                    "Challan fetched successfully",
                    challan
                )
            );
        } catch (error) {
            next(error);
        }
    };

    cancel = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { status } = updateChallanStatusSchema.parse(
                req.body
            );

            if (status !== "CANCELLED") {
                throw new Error(
                    "Only cancellation is supported."
                );
            }

            const { id } = challanIdParamSchema.parse(req.params);

            const challan = await challanService.cancel(
                id,
                req.user!.id
            );

            res.json(
                ApiResponse.success(
                    "Challan cancelled successfully",
                    challan
                )
            );
        } catch (error) {
            next(error);
        }
    };
}
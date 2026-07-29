import { Request, Response } from "express";
import inventoryService from "./inventory.service";
import { ApiResponse } from "../utils/ApiResponse";
import {
  stockHistorySchema,
  StockHistoryInput,
} from "./inventory.validation";

export class InventoryController {
  stockIn = async (req: Request, res: Response) => {
    const result = await inventoryService.stockIn(
      req.body,
      req.user!.id
    );

    res.status(200).json(
      ApiResponse.success("Stock added successfully", result)
    );
  };

  stockOut = async (req: Request, res: Response) => {
    const result = await inventoryService.stockOut(
      req.body,
      req.user!.id
    );

    res.status(200).json(
      ApiResponse.success("Stock removed successfully", result)
    );
  };

  getStockHistory = async (req: Request, res: Response) => {
    const query = stockHistorySchema.parse(
      req.query
    ) as StockHistoryInput;

    const result = await inventoryService.getStockHistory(
      query
    );

    res.status(200).json(
      ApiResponse.success("Stock history fetched successfully", result)
    );
  };
}
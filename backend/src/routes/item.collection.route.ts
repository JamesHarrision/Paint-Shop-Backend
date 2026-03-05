import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { ItemCollectionController } from "../controllers/item.collection.controller";

const router = Router({ mergeParams: true });
const itemCollectionController = new ItemCollectionController();

router.post("/", authenticate, itemCollectionController.addItem);
router.delete("/:productId", authenticate, itemCollectionController.removeItem)


export default router;
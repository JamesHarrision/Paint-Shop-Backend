import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { ItemCollectionController } from "../controllers/item.collection.controller";

const router = Router({ mergeParams: true });
const itemCollectionController = new ItemCollectionController();

// Tất cả các route thao tác với item trong collection đều cần đăng nhập
router.use(authenticate);

router.post("/", itemCollectionController.addItem);
router.delete("/:productId", itemCollectionController.removeItem);

export default router;
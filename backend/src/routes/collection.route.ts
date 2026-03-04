import { CollectionController } from "../controllers/collectionController";
import { Router } from "express";
import { cloudinaryUpload } from "../services/cloudinaryService";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();
const collectionController = new CollectionController();

router.post('/', authenticate ,cloudinaryUpload.single('thumbnail'), collectionController.createCollection);
router.get('/', authenticate, collectionController.getMyCollections);
router.get('/:id', authenticate, collectionController.getCollectionById);

export default router;
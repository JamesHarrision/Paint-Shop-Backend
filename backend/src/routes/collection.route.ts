import { CollectionController } from "../controllers/collectionController";
import { Router } from "express";
import { cloudinaryUpload } from "../services/cloudinaryService";
import { authenticate } from "../middlewares/authMiddleware";
import itemCollectionRoute from './item.collection.route'

const router = Router();
const collectionController = new CollectionController();

router.post('/', authenticate, cloudinaryUpload.single('thumbnail'), collectionController.createCollection);
router.get('/', authenticate, collectionController.getMyCollections);
router.get('/:id', authenticate, collectionController.getCollectionById);

router.put("/:id", authenticate, cloudinaryUpload.single("thumbnail"), collectionController.updateCollectionById);
router.delete('/:id', authenticate, collectionController.deleteCollectionById);

router.use("/:collectionId/items", itemCollectionRoute);

export default router;
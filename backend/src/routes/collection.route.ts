import { CollectionController } from "../controllers/collection.controller";
import { Router } from "express";
import { cloudinaryUpload } from "../services/cloudinary.service";
import { authenticate } from "../middlewares/auth.middleware";
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
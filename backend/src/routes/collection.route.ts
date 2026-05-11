import { CollectionController } from "../controllers/collection.controller";
import { Router } from "express";
import { cloudinaryUpload } from "../services/cloudinary.service";
import { authenticate } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createCollectionSchema, updateCollectionSchema } from "../validators/collection.validator";
import itemCollectionRoute from './item.collection.route';

const router = Router();
const collectionController = new CollectionController();

router.post(
  '/', 
  authenticate, 
  cloudinaryUpload.single('thumbnail'), 
  validate(createCollectionSchema),
  collectionController.createCollection
);

router.get(
  '/public',
  collectionController.getPublicCollections
);

router.get(
  '/admin',
  authenticate,
  requireAdmin,
  collectionController.getAllCollectionsForAdmin
);

router.get(
  '/', 
  authenticate, 
  collectionController.getMyCollections
);

router.get(
  '/:id', 
  collectionController.getCollectionById
);

router.put(
  "/:id", 
  authenticate, 
  cloudinaryUpload.single("thumbnail"), 
  validate(updateCollectionSchema),
  collectionController.updateCollectionById
);

router.delete(
  '/:id', 
  authenticate, 
  collectionController.deleteCollectionById
);

router.use("/:collectionId/items", itemCollectionRoute);

export default router;
import express from 'express';
import { ListHolderController } from './list.controller'
import { ReadHolderController } from './get.controller';
import { CreateHolderController } from './post.controller'
import { PatchHolderController } from './patch.controller';
import { DeleteHolderController } from './delete.controller'
const router = express.Router();

router.get('/', ListHolderController);
router.post('/', CreateHolderController);
router.get('/:address', ReadHolderController);
// patch & delete moeten nog gedaan worden
router.patch('/:address', PatchHolderController);
router.delete('/:address', DeleteHolderController);

export default router;

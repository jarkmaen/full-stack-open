import express from 'express';

const router = express.Router();

import diagnoseService from '../services/diagnoseService';

router.get('/', (_req, res) => {
  res.send(diagnoseService.getDiagnoses());
});

export default router;

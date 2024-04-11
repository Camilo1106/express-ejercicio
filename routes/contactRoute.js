import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('contact');
});

router.post('/', (req, res) => {
  const { message } = req.body;
  res.send(`Message received: ${message}`);
});

export default router;

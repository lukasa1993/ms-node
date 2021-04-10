import { Router } from 'express';

const router = Router({ mergeParams: true });

router.get('/', function (req, res) {
  const context            = {};
  context.layout           = null;
  context.title            = 'API Response Home Document';
  context.external_api_url = 'https://api.froyo.io';
  context.base_url         = req.protocol + '://' + req.headers.host;

  return res.json(context);

});

export default router;

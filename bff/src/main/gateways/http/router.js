const apiController = require('./apiController');

module.exports = (router) => {
  router.get('/pokemon/:model', async (req, res) => {
    await apiController.getPokemons(req, res, req.params['model']);
  });

  router.post('/insert', async (req, res) => {
    await apiController.insertPersonal(req, res);
  });
  
  router.delete('/delete/:id', async (req, res) => {
    await apiController.deletePersonal(req, res, req.params['id']);
  });

  router.put('/update/:id', async (req, res) => {
    await apiController.updatePersonal(req, res, req.params['id']);
  });

  router.get('/pokemon/:model/:id', async (req, res) => {
    await apiController.getDetail(req, res, req.params['model'], req.params['id']);
   });

  return router;
};

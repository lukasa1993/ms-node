import Users from '../../../modules/users/index.js';

const model = new Users();

export const getUsers = async function (req, res) {

  let userRows = {};
  try {
    userRows = await model.getUsers();
  } catch (err) {
    let msg = 'Database Error: ' + err.message;
    if (err.message.match(/ER_NO_SUCH_TABLE/)) {
      msg = 'Database hasn\'t been set up.';
    }
    return res.status(500).send(msg);
  }

  let response      = {};
  response.users    = userRows;
  response['h:ref'] = {
    'self': '/users'
  };

  res.json(response);
};

export const addUser = async function (req, res) {
  const response = { 'status': 'ok' };
  response.req   = req.body;
  res.json(response);
};

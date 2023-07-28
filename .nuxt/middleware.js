const middleware = {}

middleware['auth'] = require('../middleware/auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['unAuth'] = require('../middleware/unAuth.js')
middleware['unAuth'] = middleware['unAuth'].default || middleware['unAuth']

export default middleware

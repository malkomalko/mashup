fs:    require 'fs'
path:  require 'path'
sys:   require 'sys'
utils: require 'express/utils'
inspect: (item) -> sys.puts(sys.inspect(item))
Faker: require 'Faker'

mongoose: require('mongoose').Mongoose
db: mongoose.connect 'mongodb://localhost/starter_project'

models: {}

fs.readdirSync('./models').map (file) ->
  model: path.basename file, '.coffee'
  require '../models/' + model
  models[model]: db.static model

fs.readdirSync('./controllers').map (file) ->
  controller: path.basename file, '.coffee'
  require '../controllers/' + controller

exports.fs:      fs
exports.path:    path
exports.sys:     sys
exports.utils:   utils
exports.inspect: inspect
exports.models:  models
exports.Faker:   Faker

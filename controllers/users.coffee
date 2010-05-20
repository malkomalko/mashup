app: require '../lib/boot'

get '/users/get', ->
  app.models.User.homePage(@)

post '/users/post', ->
  @contentType 'json'
  new app.models.User(@params.post).save()
  @respond(200)

post '/users/seed', ->
  app.models.User.seeds.defaults(@)
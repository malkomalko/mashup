get '/', ->
  @render 'front.html.haml'

get '/style.css', ->
  @render 'style.css.sass', { layout: no }

get '/favicon.ico', ->
  @respond

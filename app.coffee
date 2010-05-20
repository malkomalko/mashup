# mashup
require 'express'
require 'express/plugins'
require './lib/boot'

configure ->
  use MethodOverride
  use ContentLength
  use Cookie
  use Session
  use Flash
  use Logger
  use Static
  set 'root', __dirname

run(4000)

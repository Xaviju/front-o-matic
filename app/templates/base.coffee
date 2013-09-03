class View extends Backbone.View
class Model extends Backbone.Model
class Router extends Backbone.Router
@View = View
@Model = Model
@Router = Router

#global <%= _.camelize(appName) %>, $
window.<%= _.camelize(appName) %> =
    Models: {}
    Collections: {}
    Views: {}
    Routers: {}
    init:->
        'use strict'
        console.log 'Hello from Backbone!'

<%= _.camelize(appName) %>.init()

##########################################################
# MAIN VIEW
##########################################################

class MainView extends View
    el: 'body'

    initialize: ->
        console.log 'Hello from Main'

##########################################################
# EXAMPLE SUB VIEW
##########################################################

#class <%= _.camelize(appName) %>.Views.{Name}View extends View

######################################################
# EXAMPLE SUB MODEL
######################################################

# class <%= _.camelize(appName) %>.Models.{Name}Model extends Model

######################################################
# EXAMPLE SUB ROUTER
######################################################

#class <%= _.camelize(appName) %>.Routers.{Name}Router extends Router

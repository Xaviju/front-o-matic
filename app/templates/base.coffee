class View extends Backbone.View
class Model extends Backbone.Model
@View = View
@Model = Model

#Add a data-view attribute to your pages body an it will create and initialize a view for it (optional)
$ ->
    view = $("body").data('view')
    if (view)
        viewCls = app.views[view]
        if (viewCls)
            app.main = new viewCls()

#Change 'App' for your application name (optional)
class App extends View
    el: $('body')
    models: {}
    collections: {}
    views: {}

@app = new App()

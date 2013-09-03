##########################################################
# global require
##########################################################

'use strict'

require.config({
    paths: {
        base: '../scripts/base'
        html5shiv: '../bower_components/html5shiv/html5shiv'
        jquery: '../bower_components/jquery/jquery'
        underscore: '../bower_components/underscore/underscore'
        backbone: '../bower_components/backbone/backbone'
    }
    shim: {
        backbone: {
            deps: [
                'jquery'
                'underscore'
            ]
            exports: 'Backbone'
        }
    }
})

require(['base', 'html5shiv', 'backbone'], (base, html5shiv, Backbone) ->
    'use strict'
)

requirejs.config({

    config: {

        'app/c': {

            size: 'large'

        },

        'app/d': {

            color: 'blue'

        }

    }

});

require(['app/c'],function(c){

         console.log(c);

});

require(['app/d'],function(dss){

         console.log(d);

});



define(['Class'], function($Class){
  var Index = $Class.create({
    home: function(){
      return ['home', 'nav'];
    },
    nav:[]
  });


  return new Index();
});

define(['Class'], function($Class){

  var Test = $Class.create({
    home: function(){
      return ['home'];
    }
  });


  return new Test();

});



define(['container', 'Class'], function(container, $Class){
  var Home = $Class.create({
    show: function(){
      container.emptyAll();
      container.Header.append('<div>' +
        '' +
        '' +
        '<a href="#test/home">' +
        '去测试' +
        '' +
        '</a>' +
        '</div>');

      console.log('主页');
    }
  });

  return new Home();


});
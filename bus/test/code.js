
define(['container', 'Class'], function(container, $Class){

  var Code = $Class.create({
    show: function(){
      container.emptyAll();

      container.Header.append('<div>' +
        '' +
        '' +
        '<a href="#index/home">' +
        '去主页' +
        '' +
        '</a>' +
        '</div>');

      container.Content.append('<div>' +
        '' +
        '内容' +
        '</div>');

      container.Footer.append('<div>' +
        '' +
        '底部' +
        '' +
        '</div>');
    }
  });

  return new Code();
});
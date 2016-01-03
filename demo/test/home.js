
define(['container', 'Class', 'text!./../common/header.html', 'text!./../common/footer.html','text!./content.html'], function(container, $Class, header, footer, content){

  var Code = $Class.create({
    show: function(){
      container.emptyAll();
      container.Header.append(header);
      container.Footer.append(footer);
      container.Content.append(content);

      container.Header.append('<a href="#!index/home" style="position:relative;top:-30px;color:#FFF;left:10px;display: block;">' +
        'back' +
        '</a>');
    }
  });

  return new Code();
});
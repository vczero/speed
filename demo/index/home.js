

define(['container', 'Class', 'text!./../common/header.html', 'text!./../common/footer.html', 'text!./content.html'], function(container, $Class, header, footer, content){
  var Home = $Class.create({
    show: function(){
      container.emptyAll();
      container.Header.append(header);
      container.Footer.append(footer);
      container.Content.append(content);

    }
  });

  return new Home();

});
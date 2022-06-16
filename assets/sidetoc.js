window.addEventListener('load', function () {
  var path = window.location.pathname;
  if (path.endsWith('/print.html')) {
    return;
  }

  var pagetoc = document.getElementsByClassName('pagetoc')[0];
  var elements = document.getElementsByClassName('header');

  // Genrate page toc
  Array.prototype.forEach.call(elements, function (el) {
    var link = document.createElement('a');

    // Indent shows hierarchy
    var indent =
      { H3: '20px', H4: '40px' }[el.parentElement.tagName.toUpperCase()] || '';

    link.appendChild(document.createTextNode(el.text));
    link.style.paddingLeft = indent;
    link.href = el.href;

    link.addEventListener('click', function () {
      // Un-active everything when you click it
      Array.prototype.forEach.call(pagetoc.children, function (el) {
        el.classList.remove('active');
      });
      el.classList.add('active');
    });

    pagetoc.appendChild(link);
  });

  var updateFunction = function () {
    var id = null;
    Array.prototype.forEach.call(elements, function (el) {
      if (window.pageYOffset >= el.offsetTop) id = el;
    });

    Array.prototype.forEach.call(pagetoc.children, function (el) {
      if (id !== null && id.href.localeCompare(el.href) == 0) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  };

  updateFunction.call();
  // Handle active elements on scroll
  window.addEventListener('scroll', updateFunction);
});

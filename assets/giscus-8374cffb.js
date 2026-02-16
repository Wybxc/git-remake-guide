window.addEventListener('load', function () {
  function setGiscusTheme(giscusTheme) {
    var iframe = document.querySelector('.giscus-frame');
    if (!iframe) return;
    var msg = {
      setConfig: { theme: giscusTheme },
    };
    iframe.contentWindow.postMessage({ giscus: msg }, 'https://giscus.app');
  }

  var theme = 'transparent_dark';
  const themeClass = document.getElementsByTagName('html')[0].className;
  if (themeClass.indexOf('light') != -1 || themeClass.indexOf('rust') != -1) {
    theme = 'light';
  }

  document.getElementById('theme-list').addEventListener('click', function (e) {
    var theme = e.target.className === 'theme' ? e.target.id : null;
    var giscusTheme =
      theme === 'light' || theme === 'rust' ? 'light' : 'transparent_dark';
    setGiscusTheme(giscusTheme);
  });

  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://giscus.app/client.js';
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.setAttribute('data-repo', 'Wybxc/git-remake-guide');
  script.setAttribute('data-repo-id', 'R_kgDOHg1_Zg');
  script.setAttribute('data-category', 'Giscus 评论');
  script.setAttribute('data-category-id', 'DIC_kwDOHg1_Zs4CPta9');
  script.setAttribute('data-mapping', 'pathname');
  script.setAttribute('data-reactions-enabled', '1');
  script.setAttribute('data-emit-metadata', '0');
  script.setAttribute('data-input-position', 'top');
  script.setAttribute('data-theme', theme);
  script.setAttribute('data-lang', 'zh-CN');
  document.head.appendChild(script);
});

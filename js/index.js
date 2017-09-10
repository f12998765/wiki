url = window.location.search.substr(1)

if (url == null)
  url = "README.md"

var rendererMD = new marked.Renderer();
marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});
marked.setOptions({
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  }
});

fetch("./" + url)
  .then(function(response) {
    if (response.status != 200)
      window.location.href='./'
    else {
      return response.text()
    }

  }).then(function(data) {
    document.getElementById('con').innerHTML = marked(data)
  })

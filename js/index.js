url = window.location.search.substr(1)

if (url == null || url.indexOf("/"))
  url = "README"

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

fetch("./" + url + ".md")
  .then(function(response) {
    if (response.status != 200)
      document.getElementById('con').innerHTML = marked("# 404")
    else {
      return response.text()
    }

  }).then(function(data) {
    document.getElementById('con').innerHTML = marked(data)
  })

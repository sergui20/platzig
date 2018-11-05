var yo = require('yo-yo');
var translate = require('../translate');

var el = yo`<footer class="site-footer">
  <div class="container">
    <div class="row">
      <div class="col s12 l3 center-align idioma"><a class="dropdown-trigger2 btn btn-flat" href="#" data-target="dropdown2">${translate.message('language')}</a>
        <ul class="dropdown-content" id="dropdown2">
          <li><a href="#!" onclick=${lang.bind(null, 'es')}>${translate.message('spanish')}</a></li>
          <li><a href="#!" onclick=${lang.bind(null, 'en-US')}>${translate.message('english')}</a></li>
        </ul>
      </div>
      <div class="col s12 l3 push-l6 center-align">© 2018 Platzigram</div>
    </div>
  </div>
</footer>`;

function lang(locale) {
  if(localStorage.locale != locale){
    localStorage.locale = locale
    location.reload()
    return false
  }
}

document.body.appendChild(el);
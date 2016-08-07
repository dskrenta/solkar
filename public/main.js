import riot from 'riot';

import './components/sample.tag';
import './components/app.tag';

riot.route.stop();
riot.route.start();

var currentPage = null;

const routes = {
  home: (action, id) => {
    var currentPage = riot.mount('#app', 'app');
  },
  sample: (action, id) => {
    var currentPage = riot.mount('#sample', 'sample');
  }
};

function handler (collection, id, action) {
  if (currentPage) currentPage.unmount(true);

  const fn = routes[collection || 'home'];
  return fn ? fn(id, action) : console.error('no route found: ', collection, id, action);
}

riot.route(handler);
riot.route.exec(handler);

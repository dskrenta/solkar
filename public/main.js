import riot from 'riot';
import './components/app.tag';
import './components/login.tag';
import './components/mapview.tag';
import './components/earnings.tag';
import './components/article-table.tag';
import './components/dash-header.tag';
import './components/dropdown.tag';
import './components/modal-large.tag';
import './components/editor.tag';

riot.mount('app');
riot.route.start(true);
riot.route.exec();

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
import './components/earningsv2.tag';
import './components/report.tag';
import './components/bmo.tag';
import './components/amc.tag';
import './components/tns.tag';
import './components/time-icon.tag';
<<<<<<< HEAD
import './components/tracker.tag';
=======
import './components/option-calculator.tag';
import './components/option.tag';
>>>>>>> d34f28d2a23b43ce69a23038f7a1369a1ed819b6

riot.mount('app');
riot.route.start(true);
riot.route.exec();

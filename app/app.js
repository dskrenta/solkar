'use strict';
import { remote } from 'electron';
import * as riot from 'riot';
import * as lib from './lib/lib.js';
import './components/components.js';

lib.hello();
lib.hellos()
  .then(res => {
    console.log(res);
  });

riot.mount('main');

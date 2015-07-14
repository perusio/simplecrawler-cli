#!/usr/bin/env node
// crawl_site.js --- Simple wrapper around the Simple Crawler node
//                   module: https://github.com/cgiffard/node-simplecrawler.

// Copyright (C) 2015 António P. P. Almeida <appa@perusio.net>

// Author: António P. P. Almeida <appa@perusio.net>

// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// Except as contained in this notice, the name(s) of the above copyright
// holders shall not be used in advertising or otherwise to promote the sale,
// use or other dealings in this Software without prior written authorization.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
// THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

// Load command line handling library.
var Cmdline = require('commander');

/* Couldn't get the simple option for coercion in commander to work.
   So this callback was added. It's basically a placeholder for parseInt. */
function getint(x) {
  return parseInt(x);
}

// Defining the command line options.
Cmdline
  .version('0.1')
  .usage('[options] <URL>')
  .option('-a, --agent <User Agent string>', 'User Agent of the crawler', 'NodeSimpleCrawler')
  .option('-d, --depth <integer>', 'Link depth when crawling [default: 1]', getint, 1)
  .option('-i, --interval <milliseconds>', 'Value in milliseconds between crawler runs [default: 250 ms]', getint, 250)
  .option('-p, --parallel <integer>', 'Concurrent threads [default: 1]', getint, 1)
  .option('-s, --silent', 'Crawl silently without output')
.parse(process.argv);

// If no command is given display help.
if (!process.argv.slice(2).length) {
  Cmdline.outputHelp();
  process.exit(1);
}

// Load the URI processing library.
var URI = require('URIjs');

// Load the simple crawler library.
var Crawler = require('simplecrawler');

// Get the URL.
var url = URI(Cmdline.args[0]);

// If either the protocol, path, or hostname are unset, we can't really
// do much. Die with error.
if (!url.protocol())
  throw new Error('Can\'t crawl with unspecified protocol.');
if (!url.hostname())
  throw new Error('Can\'t crawl with unspecified hostname.');
if (!url.path())
  throw new Error('Can\'t crawl with unspecified path.');

// Get the current_port.
var current_port = url.protocol() === 'https' ? 443 : 80;
if (url.port())
  current_port = url.port();

// Instantiate a crawler.
crawler = new Crawler(url.hostname(), url.path(), current_port);

// Crawler settings.
crawler.interval = Cmdline.interval;
crawler.maxConcurrency = Cmdline.parallel;
crawler.maxDepth = Cmdline.depth;
crawler.userAgent = Cmdline.agent;

// Check if we're in silent mode or if we print out information about
// the crawling process.
if (typeof Cmdline.silent == 'undefined') {
crawler.on('crawlstart', function() {
  console.log('Crawl starting');
});
crawler.on('fetchstart', function(queueItem) {
  console.log('fetchStart', queueItem);
});

crawler.on('fetchcomplete', function(queueItem) {
  console.log('fetchcomplete', queueItem);
});

crawler.on('complete', function() {
  console.log('Finished!');
});
}

// Launch the crawler.
crawler.start();

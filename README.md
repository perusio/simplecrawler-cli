# Command Line wrapper for the simplecrawler node module

## Introduction

This is a simple command line wrapper for the
[Node Simple Crawler](https://github.com/cgiffard/node-simplecrawler)
nodeJS module.

It relies on a couple of other modules.

 * [URI.js](https://medialize.github.io/URI.js/).
 * [commander.js](https://github.com/tj/commander.js).

## Installation

 1. git clone this repository.
 2. Install Node Simple Crawler:
 
        npm install simplecrawler
 3. Install commander.js:
    
        npm install commander.js
 4. Install URi.js:
    
        npm install URI.js

## Usage

Issuing `./crawl_site.js` will display help on the script usage.

    ./crawl_site.js [-a, --agent <User Agent>] [-d, --depth <depth>]
    [-i, --interval <interval>] [-p, --parallel <threads>]
    [-s, --silent] <URL>

where:
 * `<User Agent>`: the value of the `User-Agent` HTTP header (default:
   `NodeSimpleCrawler`).
 * `<depth>`: integer representing the level of recursion when
   crawling the site. One means only follow the links one level down,
   `n` means **n levels** down (default: 1).
 * `<interval>`: interval in milliseconds when traversing site,
   between successive hits (default: `250`).
 * `<threads>`: the number of concurrent requests to issue when
   crawling the site (default: 1).
 * `-s, --silent` is a an argument that when present will make the
   crawling be silent without anyhting printed in the terminal.

### Example

    ./crawl_iste.js -d 3 -p 10 -s https://example.com/foobar

Crawl the `https://example.com` iste starting at path `/foobar`
recursively following links up to **three** levels with 10 concurrent
requests and wihtout printing anything in the terminal.

## Cache warming

Note that the
[events](https://github.com/cgiffard/node-simplecrawler#events) made
available by simplecrawler are supposed to be used for processing the
requests and responses as you wish. This simple script just prints out
what's happening in the terminal. It is particularly useful as a
crawler to warm up a site cache.

You can use the
[queue](https://github.com/cgiffard/node-simplecrawler#adding-to-the-queue)
queue up as many resources as you wish to be fetched via the crawler
and you can filter the resources to fetch using
[fetch conditions](https://github.com/cgiffard/node-simplecrawler#adding-a-fetch-condition).

## TODO

Add dockerfile (registry) entry for simplecrawler and the script.

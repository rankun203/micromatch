'use strict';

var assert = require('assert');
var mini = require('minimatch');
var mm = require('..');

describe('issue-related tests', function() {
  // https://github.com/micromatch/micromatch/issues/108
  it('issue micromatch#108', function() {
    var fixture = './css/foo{.css,**/*.css}';
    assert(mm.isMatch('./css/foo/bar.css', fixture));
    assert.deepEqual(mm(['./css/foo/bar.css'], fixture), ['css/foo/bar.css']);

    assert(mm.isMatch('.\\css\\foo\\bar.css', fixture, {unixify: true}));
    assert.deepEqual(mm(['.\\css\\foo\\bar.css'], fixture, {unixify: true}), ['css/foo/bar.css']);
  });

  // see https://github.com/jonschlinkert/micromatch/issues/15
  it('issue #15', function() {
    assert(mm.isMatch('a/b-c/d/e/z.js', 'a/b-*/**/z.js'));
    assert(mm.isMatch('z.js', 'z*'));
    assert(mm.isMatch('z.js', '**/z*'));
    assert(mm.isMatch('z.js', '**/z*.js'));
    assert(mm.isMatch('z.js', '**/*.js'));
    assert(mm.isMatch('foo', '**/foo'));
  });

  // see https://github.com/jonschlinkert/micromatch/issues/23
  it('issue #23', function() {
    assert(!mm.isMatch('zzjs', 'z*.js'));
    assert(!mm.isMatch('zzjs', '*z.js'));
  });

  // see https://github.com/jonschlinkert/micromatch/issues/24
  it('issue #24', function() {
    assert(!mm.isMatch('a', 'a/**'));
    assert(!mm.isMatch('a/b/c/d/', 'a/b/**/f'));
    assert(mm.isMatch('a', '**'));
    assert(mm.isMatch('a/', '**'));
    assert(mm.isMatch('a/b/c/d', '**'));
    assert(mm.isMatch('a/b/c/d/', '**'));
    assert(mm.isMatch('a/b/c/d/', '**/**'));
    assert(mm.isMatch('a/b/c/d/', '**/b/**'));
    assert(mm.isMatch('a/b/c/d/', 'a/b/**'));
    assert(mm.isMatch('a/b/c/d/', 'a/b/**/'));
    assert(mm.isMatch('a/b/c/d/e.f', 'a/b/**/**/*.*'));
    assert(mm.isMatch('a/b/c/d/e.f', 'a/b/**/*.*'));
    assert(mm.isMatch('a/b/c/d/g/e.f', 'a/b/**/d/**/*.*'));
    assert(mm.isMatch('a/b/c/d/g/g/e.f', 'a/b/**/d/**/*.*'));
  });

  // see https://github.com/jonschlinkert/micromatch/issues/59
  it('should only match nested directories when `**` is the only thing in a segment', function() {
    assert(!mm.isMatch('a/b/c', 'a/b**'));
    assert(!mm.isMatch('a/c/b', 'a/**b'));
  });

  // see https://github.com/jonschlinkert/micromatch/issues/63
  it('issue #63', function() {
    assert(mm.isMatch('/aaa/bbb/foo', '/aaa/bbb/**'));
    assert(mm.isMatch('/aaa/bbb/', '/aaa/bbb/**'));
    assert(mm.isMatch('/aaa/bbb/foo.git', '/aaa/bbb/**'));
    assert(!mm.isMatch('/aaa/bbb/.git', '/aaa/bbb/**'));
    assert(!mm.isMatch('aaa/bbb/.git', 'aaa/bbb/**'));
    assert(!mm.isMatch('/aaa/bbb/ccc/.git', '/aaa/bbb/**'));
    assert(!mm.isMatch('/aaa/.git/foo', '/aaa/**/*'));
    assert(mm.isMatch('/aaa/.git/foo', '/aaa/**/*', {dot: true}));
    assert(mm.isMatch('/aaa/bbb/.git', '/aaa/bbb/*', {dot: true}));
    assert(mm.isMatch('aaa/bbb/.git', 'aaa/bbb/**', {dot: true}));
    assert(mm.isMatch('/aaa/bbb/.git', '/aaa/bbb/**', {dot: true}));
    assert(mm.isMatch('/aaa/bbb/ccc/.git', '/aaa/bbb/**', {dot: true}));
  });

  // see https://github.com/jonschlinkert/micromatch/issues/83
  it('issue #83', function() {
    assert(mini('Incl/qqq.log', '**/Incl/**', {matchBase: true}));
    assert(mm.isMatch('Incl/qqq.log', '**/Incl/**', {matchBase: true}));
  });
});

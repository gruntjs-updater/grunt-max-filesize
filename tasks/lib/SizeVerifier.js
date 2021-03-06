/*
 * grunt-max-filesize
 * https://github.com/alexcorre/grunt-max-filesize
 *
 * Copyright (c) 2014 Alex Corre
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var grunt = require('grunt');
var _ = require('underscore');

/**
 * @module SizeVerifier
 *
 * The SizeVerifier module reads grunt config and verifies that all
 * files are under the max size specified in the config.
 *
 * @type {Object}
 */
var SizeVerifier = {

  /**
   * Simple filter function to return true if file is under the given size
   * in bytes.
   *
   * @param {Number} maxBytes - the maximum allowed size, in bytes.
   * @param {String} filePath - the path to the file in question.
   */
  fileOverBytes: function(maxBytes, filePath) {
    var stats = fs.statSync(filePath);
    return stats.size > maxBytes;
  },

  /**
   * Verifies that all files in the files list are under the maxSize in bytes
   *
   * @param maxSize {number} - number of bytes that the file size must be less than
   *    or equal to.
   * @param files {array} - array of file paths
   */
  verifyFiles: function(maxBytes, files) {
    var badFiles = files.filter(_.partial(SizeVerifier.fileOverBytes, maxBytes));

    if (badFiles.length > 0) {
      grunt.log.error('Some files are over [' + maxBytes + '] bytes.');
      badFiles.forEach(function(badFile) {
        grunt.log.writeln(badFile);
      });
      grunt.fail.fatal('Please ensure files are no larger than [' + maxBytes + '] bytes.');
    }

    grunt.log.oklns('All files ok.');
  }

};

module.exports = SizeVerifier;


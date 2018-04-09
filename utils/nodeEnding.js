function noOp() {};

exports.nodeEndingCode = function nodeEndingCode(callback) {

  callback = callback || noOp;
  process.on('cleanup',callback);

  process.on('exit', function () {
    process.emit('cleanup');
  });

  process.on('SIGINT', function () {
    process.exit(2);
  });

  process.on('uncaughtException', function(e) {
    console.log('Uncaught Exception...'.red);
    console.log(e.stack);
    process.exit(99);
  });
};
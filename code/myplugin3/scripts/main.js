$(document).ready(function() {
   var nclicks = 0;
   $('#hello').click(function() {
      var batch = new Batch(ParallelBatch, function(data) {
         // All actions in the batch have completed
         // In this example we only launch one action (foo_bar) but you may want to launch multiple actions
         // and get notified when they have all complete.
         // Notice the 'ParallelBatch' that will launch multiple actions in parallel (4 by default). Use
         // SequentialBatch for actions that must be executed sequentially (e.g., multiple actions touching the same file)
         // Note: Sequential and Parallel Batchs operate on a global level, i.e.,
         // var batch1 = new Batch(SequentialBatch);
         // var batch2 = new Batch(SequentialBatch);
         // ...
         // batch1.launch();
         // batch2.launch(); // will only execute once batch1 has completed its action(s).
      }, null);
      batch.get({action:'myplugin.foo_bar', clicks:++nclicks}, function(data) {
         // will call /pages/myplugin/index.php?action=foo_bar&amp;clicks=nclicks&amp;custom_security_variables
         // that will automatically execute the fooBarAction() function of the index.php file
         $('#res').append(data.foo);
      });
      batch.launch(); // Always call that after adding an action to a batch
   });
});


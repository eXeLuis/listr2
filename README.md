# Fork of listr2

This is a fork of the listr2 package that I modified to fit my needs.

- Added a `waitFor(action)` function that accepts an async function as argument and waits for it to return before continuing.
  This is the same behavior that the `pause(ms)` function provides just without a fixed time.
- Added a timeout argument to the retry-functionality. In my use-case a lot of timeouts are necessary and already in place. To not have to rewrite
  all my tools I simply added a `timeout: number` property that extends the task-option `retry`. E.g. `options: { retry: { delay: 5000, timeout: 60000 } }`
  One cannot use both `tries` and `timeout` properties.


If you're looking for the original project, you'll find it here [listr2](https://github.com/listr2/listr2). Or click on the "forked from ..." link above.

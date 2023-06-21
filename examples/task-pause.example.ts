import { delay, Listr, PRESET_TIMER, ListrLogger, ListrLogLevels } from 'listr2'

const logger = new ListrLogger({ useIcons: false })

logger.log(ListrLogLevels.STARTED, 'Example for pausing a task to execute a specific action.')

const task: Listr<any> = new Listr<any>(
  [
    {
      title: 'This task will execute.',
      task: async (_, task): Promise<void> => {
        await task.waitFor(async () => {
          await delay(5000)
          task.output = 'Output [1]'
          await delay(5000)
          task.output = 'Output [2]'
        })
        await delay(5000)
      },
      options: {}
    }
  ],
  { concurrent: false }
)

try {
  const context = await task.run()

  logger.log(ListrLogLevels.COMPLETED, [ 'ctx: %o', context ])
} catch (e: any) {
  logger.log(ListrLogLevels.FAILED, e)
}

// Derived from: https://github.com/sheerun/modern-node/blob/master/src/test.js

const path = require('path')
const fs = require('fs')
const jest = require('jest')
const codecov = require('codecov')

const argv = process.argv.slice(2)
if (process.env.TRAVIS) {
  argv.push('--coverage')
}
if (!process.env.CI && argv.indexOf('--watchAll') === -1 && argv.indexOf('--watchAll=false') === -1) {
  const hasGit = fs.existsSync(path.join(fs.realpathSync(process.cwd()), '.git'))
  argv.push(hasGit ? '--watch' : '--watchAll')
}

jest.run(argv).then(() => {
  if (process.env.TRAVIS) {
    codecov.upload({})
  }
})

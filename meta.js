const pkg = require('./package.json');
const templateVersion = pkg.version;
const {
  sortDependencies,
  installDependencies,
  printMessage,
} = require('./utils');

module.exports = {
  helpers: {
    if_or (v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this)
      }
      return options.inverse(this)
    },
    template_version () {
      return templateVersion
    }
  },
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Project name',
      default: 'my-project'
    },
    homepage: {
      type: 'string',
      required: false,
      message: 'homepage'
    },
    namespace: {
      type: 'string',
      required: true,
      message: 'namespace',
      default: 'maptalks'
    },
    version: {
      type: 'string',
      required: true,
      message: 'version',
      default: '0.0.1'
    },
    description: {
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'A plugin for maptalks'
    },
    author: {
      type: 'string',
      message: 'Author'
    },
    lint: {
      type: 'confirm',
      message: 'Use ESLint to lint your code?'
    },
    runner: {
      type: 'confirm',
      message: 'Use test runner?',
    },
    travis: {
      type: 'confirm',
      message: 'Use travis ci for your code?',
    },
    autoInstall: {
      type: 'list',
      message:
        'Should we run `npm install` for you after the project has been created? (recommended)',
      choices: [
        {
          name: 'Yes, use NPM',
          value: 'npm',
          short: 'npm'
        },
        {
          name: 'Yes, use Yarn',
          value: 'yarn',
          short: 'yarn'
        },
        {
          name: 'No, I will handle that myself',
          value: false,
          short: 'no'
        }
      ]
    }
  },
  filters: {
    '.eslintrc': 'lint',
    '.eslintignore': 'lint',
    '.travis.yml': 'travis',
    'test/**/*': 'unit',
    'test/index.js': 'runner',
    'karma.config.js': 'runner'
  },
  complete: function (data, {chalk}) {
    const green = chalk.green;
    sortDependencies(data, green);
    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)
    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  }
};

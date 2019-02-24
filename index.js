const isNode = typeof exports === 'object'
const isAMD = define !== undefined && typeof define === 'function' && define.amd; // eslint-disable-line
const isBrowser = !isNode && !isAMD
const isIE = isBrowser && ((window.ActiveXObject || 'ActiveXObject' in window) || !console);

((logr) => {
  this.settings = {
    mute: false,
    iemute: false,
    labels: [],
    project: 'logr'
  }

  const chalk = isNode ? require('chalk') : undefined

  const formatDate = () => {
    let now = new Date()
    return now.toISOString()
  }

  const formatStrings = (level, string) => {
    let now = formatDate()

    if (isIE && !this.settings.iemute) {
      alert(`${this.settings.project} [${level.toUpperCase()}] ${now} ${string}`); // eslint-disable-line
    } else if (isBrowser) {
      console.log(`%c${this.settings.project} %c${level.toUpperCase()} %c${now}`, 'color: #ce48cf', 'color: #3bc2ec', 'color: #777', `${string}`)
    } else {
      console.log(`${chalk.hex('#ce48cf')(this.settings.project)} [${chalk.hex('#3bc2ec')(level.toUpperCase())}] ${chalk.hex('#777')(now)} ${string}`)
    }
  }

  logr = (() => {
    this.config = (opts, callback) => {
      for (let key in opts) {
        if (key in this.settings) {
          this.settings[key] = opts[key]
        }
      }

      if (callback !== undefined) {
        callback()
      }
    }

    this.out = (...args) => {
      let str = ''
      if (this.settings.mute) return

      if (args.length > 1) {
        for (let i = 0; i < args.length; i++) {
          str += args[i] + ' '
        }

        str = str.substring(0, str.length - 1)
      }

      formatStrings('info', str)
    }

    this.warn = () => {

    }

    this.error = () => {

    }

    this.group = () => {

    }

    this.stack = () => {

    }

    return this
  })()

  if (isNode) {
    module.exports = logr
  } else if (isAMD) {
    define(() => (logr)); // eslint-disable-line
  } else if (isBrowser) {
    window.logr = logr
  }
})({})

const {getConfig} = require('./base.config');
const {MODE} = require('./consts');

function getTargets(isProd) {
    if (!isProd) {
        return [
            "Chrome >= 96"
        ]
    }

    return [
        "Chrome >= 80",
        "Firefox >= 74",
        "Opera >= 67",
        "Safari >= 12"
    ]
}

const configs = [];

const isProd = process.env.NODE_ENV === MODE.PRODUCTION;

configs.push(getConfig(isProd, getTargets(isProd)));

module.exports = configs;

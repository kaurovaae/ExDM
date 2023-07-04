import {getConfig}                  from './webpack.config';
import {MODE}                       from './webpack.consts';

function getTargets(isProd): string[] {
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

const configs: unknown[] = [];

const isProd = process.env.NODE_ENV === MODE.PRODUCTION;

configs.push(getConfig(isProd, getTargets(isProd)));

module.exports = configs;

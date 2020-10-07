"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEpisodeAudio = exports.parseImage = exports.parseEpisodeDescription = exports.parseEpisodeDate = exports.parseEpisodeTitle = exports.parseEpisodeGuid = exports.parseEpisode = exports.parsePodcastDescription = exports.parsePodcastDate = exports.getPodcastDate = exports.parsePodcastTitle = exports.parsePodcast = void 0;
const xml_js_1 = __importDefault(require("xml-js"));
const classes_1 = require("./classes");
const moment_1 = __importDefault(require("moment"));
function parsePodcast(text) {
    const podcastRss = xml_js_1.default.xml2js(text, { compact: true });
    const channel = podcastRss.rss.channel;
    const podcast = {
        title: parsePodcastTitle(channel),
        date: getPodcastDate(channel),
        description: parsePodcastDescription(channel),
        image: parseImage(channel),
        episodes: podcastRss.rss.channel.item.map(parseEpisode)
    };
    return podcast;
}
exports.parsePodcast = parsePodcast;
function parsePodcastTitle(channel) {
    if (channel.title) {
        return channel.title._text;
    }
    else {
        throw new classes_1.ParseError('Could not parse Podcast.title');
    }
}
exports.parsePodcastTitle = parsePodcastTitle;
function getPodcastDate(channel) {
    try {
        return moment_1.default.utc(parsePodcastDate(channel)).format();
    }
    catch (error) {
        return moment_1.default.utc().format();
    }
}
exports.getPodcastDate = getPodcastDate;
function parsePodcastDate(channel) {
    if (channel.pubDate) {
        return channel.pubDate._text;
    }
    else if (channel.lastBuildDate) {
        return channel.lastBuildDate._text;
    }
    else {
        throw new classes_1.ParseError('Could not parse Podcast.date');
    }
}
exports.parsePodcastDate = parsePodcastDate;
function parsePodcastDescription(channel) {
    if (channel.description) {
        return channel.description._text;
    }
    else {
        return '';
    }
}
exports.parsePodcastDescription = parsePodcastDescription;
function parseEpisode(item, index) {
    const episode = {
        index,
        guid: parseEpisodeGuid(item),
        title: parseEpisodeTitle(item),
        date: parseEpisodeDate(item),
        description: parseEpisodeDescription(item),
        image: parseImage(item),
        audio: parseEpisodeAudio(item)
    };
    return episode;
}
exports.parseEpisode = parseEpisode;
function parseEpisodeGuid(item) {
    if (item.guid && item.guid._cdata) {
        return item.guid._cdata;
    }
    else {
        return '';
    }
}
exports.parseEpisodeGuid = parseEpisodeGuid;
function parseEpisodeTitle(item) {
    if (item.title) {
        return item.title._text;
    }
    else {
        throw new classes_1.ParseError('Could not parse Episode.title');
    }
}
exports.parseEpisodeTitle = parseEpisodeTitle;
function parseEpisodeDate(item) {
    if (item.pubDate) {
        return moment_1.default.utc(item.pubDate._text).format();
    }
    else {
        return moment_1.default.utc().format();
    }
}
exports.parseEpisodeDate = parseEpisodeDate;
function parseEpisodeDescription(item) {
    if (item.description && item.description._cdata) {
        return item.description._cdata;
    }
    else if (item.description) {
        return item.description._text;
    }
    else {
        return '';
    }
}
exports.parseEpisodeDescription = parseEpisodeDescription;
function parseImage(item) {
    if (item['itunes:image'] && item['itunes:image']._attributes) {
        return item['itunes:image']._attributes.href;
    }
    else {
        return '';
    }
}
exports.parseImage = parseImage;
function parseEpisodeAudio(item) {
    if (item.enclosure && item.enclosure._attributes.url) {
        return item.enclosure._attributes.url;
    }
    else {
        throw new classes_1.ParseError('Could not parse Episode.audio');
    }
}
exports.parseEpisodeAudio = parseEpisodeAudio;

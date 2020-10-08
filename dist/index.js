"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePodcast = void 0;
const xml_js_1 = __importDefault(require("xml-js"));
const classes_1 = require("./classes");
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
function getPodcastDate(channel) {
    const dateStr = parsePodcastDate(channel);
    if (!dateStr)
        return;
    const date = new Date(dateStr);
    if (isValidDate(date)) {
        return date;
    }
}
function parsePodcastDate(channel) {
    if (channel.pubDate) {
        return channel.pubDate._text;
    }
    else if (channel.lastBuildDate) {
        return channel.lastBuildDate._text;
    }
}
function parsePodcastDescription(channel) {
    if (channel.description) {
        return channel.description._text;
    }
    else {
        return '';
    }
}
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
function parseEpisodeGuid(item) {
    if (item.guid) {
        return item.guid._cdata || item.guid._text;
    }
    else {
        return '';
    }
}
function parseEpisodeTitle(item) {
    if (item.title) {
        return item.title._text;
    }
    else {
        throw new classes_1.ParseError('Could not parse Episode.title');
    }
}
function parseEpisodeDate(item) {
    if (item.pubDate) {
        return new Date(item.pubDate._text);
    }
}
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
function parseImage(item) {
    if (item['itunes:image'] && item['itunes:image']._attributes) {
        return item['itunes:image']._attributes.href;
    }
    else {
        return '';
    }
}
function parseEpisodeAudio(item) {
    if (item.enclosure && item.enclosure._attributes.url) {
        return item.enclosure._attributes.url;
    }
    else {
        throw new classes_1.ParseError('Could not parse Episode.audio');
    }
}
function isValidDate(date) {
    return date instanceof Date && !isNaN(date.getTime());
}

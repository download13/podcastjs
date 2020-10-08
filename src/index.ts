import type { Podcast, Episode } from '..'
import xmlJs from 'xml-js'
import { ParseError } from './classes'

export function parsePodcast (text: string): Podcast {
  const podcastRss: any = xmlJs.xml2js(text, {compact: true});
  const channel = podcastRss.rss.channel

  const podcast: Podcast = {
    title: parsePodcastTitle(channel),
    date: getPodcastDate(channel),
    description: parsePodcastDescription(channel),
    image: parseImage(channel),
    episodes: podcastRss.rss.channel.item.map(parseEpisode)
  }

  return podcast
}

function parsePodcastTitle (channel: any): string {
  if (channel.title) {
    return channel.title._text
  } else {
    throw new ParseError('Could not parse Podcast.title')
  }
}

function getPodcastDate (channel: any): Date | undefined {
  const dateStr = parsePodcastDate(channel)
  if(!dateStr) return

  const date = new Date(dateStr)

  if(isValidDate(date)) {
    return date
  }
}

function parsePodcastDate (channel: any): string | undefined {
  if (channel.pubDate) {
    return channel.pubDate._text
  } else if (channel.lastBuildDate) {
    return channel.lastBuildDate._text
  }
}

function parsePodcastDescription (channel: any): string {
  if (channel.description) {
    return channel.description._text
  } else {
    return ''
  }
}

function parseEpisode (item: any, index: number): Episode {
  const episode: Episode = {
    index,
    guid: parseEpisodeGuid (item),
    title: parseEpisodeTitle(item),
    date: parseEpisodeDate(item),
    description: parseEpisodeDescription(item),
    image: parseImage(item),
    audio: parseEpisodeAudio(item)
  }
  return episode
}

function parseEpisodeGuid (item: any): string {
  if (item.guid) {
    return item.guid._cdata || item.guid._text
  } else {
    return ''
  }
}

function parseEpisodeTitle (item: any): string {
  if (item.title) {
    return item.title._text
  } else {
    throw new ParseError('Could not parse Episode.title')
  }
}

function parseEpisodeDate (item: any): Date | undefined {
  if (item.pubDate) {
    return new Date(item.pubDate._text)
  }
}

function parseEpisodeDescription (item: any): string {
  if (item.description && item.description._cdata) {
    return item.description._cdata
  } else if (item.description) {
    return item.description._text
  } else {
    return ''
  }
}

function parseImage (item: any): string {
  if (item['itunes:image'] && item['itunes:image']._attributes) {
    return item['itunes:image']._attributes.href
  } else {
    return ''
  }
}

function parseEpisodeAudio (item: any): string {
  if (item.enclosure && item.enclosure._attributes.url) {
    return item.enclosure._attributes.url
  } else {
    throw new ParseError('Could not parse Episode.audio')
  }
}

function isValidDate(date: unknown): date is Date {
  return date instanceof Date && !isNaN(date.getTime())
}
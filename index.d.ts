declare module 'podcastjs'

export default function fetchPodcast(url: string): Podcast

export function parsePodcast(text: string): Podcast

interface Podcast {
  title: string
  description: string
  episodes: Episode[]

  date?: Date
  url?: string
  image?: string
}

interface Episode {
  index: number
  title: string
  guid: string
  description: string
  audio: string

  date?: Date
  image?: string
}

interface ParseError extends Error {}

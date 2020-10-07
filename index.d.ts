declare module 'podcastjs'

export default function fetchPodcast(url: string): Podcast

export function parsePodcast(text: string): Podcast

interface Podcast {
  title: string
  date: string
  description: string
  episodes: Episode[]

  url?: string
  image?: string
}

interface Episode {
  index: number
  title: string
  guid: string
  date: string
  description: string
  audio: string

  image?: string
}

interface ParseError extends Error {}

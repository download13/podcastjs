# podcast.js

podcast.js fetches and parses podcast RSS fields so you don't have to!

Plus, it comes with TypeScript typings out of the box.

This is based on [justinvos version](https://github.com/justinvos/podcastjs), but uses a slightly different API which enables it to omit most of the dependencies. Also has bugfixes related to parsing guids.

## Install

### Yarn:
```
yarn add @download/podcastjs
```

### NPM:
```
npm install @download/podcastjs
```

## Getting Started

### Plain JavaScript:
```js
const { parsePodcast } = require('@download/podcastjs')

const serialRssUrl = 'http://feeds.serialpodcast.org/serialpodcast'

podcastJs.parsePodcast(serialRssUrl).then((podcast) => {
  console.log(podcast.title)
})
```

### TypeScript:
```ts
import { parsePodcast, Podcast } from '@download/podcastjs'

const res = await fetch('http://feeds.serialpodcast.org/serialpodcast')
const serialRss = await res.text()

parsePodcast(serialRss).then((podcast: Podcast) => {
  console.log(podcast.title)
})
```

## Documentation

### parsePodcast
Parse a string comprising an XML-RSS file.

`parsePodcast(rssFileContents)`

Parameters:

- `rssFileContents` - The podcast's RSS feed's contents

Returns a `Podcast` object (defined below)

### Podcast

#### Properties
- `title` - The title of the podcast e.g. `"Serial"`
- `description` - A description of the podcast e.g. `"Serial is a podcast from the creators of..."`
- `episodes` - A list of Episode objects associated with this Podcast (defined below)

Optional Properties:
- `date` - The publication date of the podcast feed as a Date object
- `url` - The URL of the podcast's RSS feed e.g. `"http://feeds.serialpodcast.org/serialpodcast"`
- `image` - The podcast's image e.g. `"https://serialpodcast.org/sites/all/modules/custom/serial/img/serial-itunes-logo.png"`

### Episode

#### Properties
- `title` - The title of the episode e.g. `"S01 Episode 01: The Alibi"`
- `description` - A description of the podcast e.g. `"It's Baltimore, 1999. Hae Min Lee, a popular high-sch..."`
- `audio` - The URL of the audio file for this episode e.g. `"https://dts.podtrac.com/redirect.mp3/dovetail.prxu.org/serial/d7f03a15-be26-4634-8884-5fadd404ad75/serial-s01-e01.mp3"`
- `index` - The physical ordering of this episode in the RSS feed e.g. `28`
- `guid` - A human-defined global identifier e.g. `s02-e11`

Optional Properties
- `date` - The publication date of the podcast feed as a Date object
- `image` - The podcast's image e.g. `"https://serialpodcast.org/sites/all/modules/custom/serial/img/serial-itunes-logo.png"`

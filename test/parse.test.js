const fs = require('fs/promises')
const { parsePodcast } = require('../dist')

test.concurrent('parse test - Hello Internet', async () => {
  const feed = await getFixture('hello_internet_rss.xml')
  const podcast = await parsePodcast(feed)

  expect(podcast.title).toBe('Hello Internet')
  expect(podcast.image).toBe('https://images.squarespace-cdn.com/content/52d66949e4b0a8cec3bcdd46/1391195775824-JVU9K0BX50LWOKG99BL5/Hello+Internet.003.png?content-type=image%2Fpng')

  const [ episode ] = podcast.episodes

  expect(episode.index).toBe(0)
  expect(episode.title).toBe('H.I. #136: Dog Bingo')
  expect(episode.guid).toBe('52d66949e4b0a8cec3bcdd46:52d67282e4b0cca8969714fa:5e58de8a37459e0d069efda0')
  expect(episode.date.getTime()).toBe(new Date('Fri, 28 Feb 2020 10:13:27 +0000').getTime())
  expect(episode.description.substr(0, 207)).toBe('<p>Grey and Brady discuss: The Mt Doom Edition, Dinosaurs Attack! randomness, YouTube videos from beyond the grave, betting on your weight, speedrunning, date formatting, the Space Force logo, and emoji.</p>')
  expect(episode.audio).toBe('http://traffic.libsyn.com/hellointernet/136FinalFinal.mp3')
  expect(episode.image).toBe('https://images.squarespace-cdn.com/content/v1/52d66949e4b0a8cec3bcdd46/1582882549057-1XW68A67UR858INW8IW5/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UbeDbaZv1s3QfpIA4TYnL5Qao8BosUKjCVjCf8TKewJIH3bqxw7fF48mhrq5Ulr0Hg/HI+slides.002.png?format=1500w')
})

test.concurrent('parse test - Cortex', async () => {
  const feed = await getFixture('cortex_rss.xml')
  const podcast = await parsePodcast(feed)
  expect(podcast.title).toBe('Cortex')

  expect(podcast.episodes[0].guid).toBe('http://relay.fm/cortex/106')
})

test.concurrent('parse test, title check and date format - Serial', async () => {
  const feed = await getFixture('serial_rss.xml')
  const podcast = await parsePodcast(feed)
  const firstEpisode = podcast.episodes.find(episode => episode.title === 'S01 Episode 01: The Alibi')
  expect(firstEpisode.date.getTime()).toBe(new Date('2014-10-03T13:45:00Z').getTime())
})

async function getFixture(name) {
  return await fs.readFile(__dirname + '/fixtures/' + name)
}
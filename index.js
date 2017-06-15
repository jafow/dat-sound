
const addSong = document.getElementById('add-sound')
const songTitle = document.getElementById('song-title')
const songTag = document.getElementById('song-tag')
const songFile = document.getElementById('song-file')
const reader = new FileReader()

var arch = DatArchive.create({
  title: 'p2p-mix',
  description: 'nice sounds'
})

reader.addEventListener('loadend', writeFileBlobXXX)

// addSong.addEventListener('click', setupDat)

async function setupDat(blob) {
  console.log('settig up dat');
  var arch = await DatArchive.create({
    title: 'p2p-mix',
    description: 'nice sounds'
  })

  await arch.writeFile('p2p-mix.mp3', reader.result, {encoding: 'binary'})
  console.log('after reading ', reader.result.toString())
}

async function writeFileBlobXXX (blob) {
  await arch.writeFile('p2p-mix.mp3', reader.result, {encoding: 'binary'})
  console.log('after reading ', reader.result.toString())
}

function handleFile(files) {
  reader.readAsArrayBuffer(files[0])
}


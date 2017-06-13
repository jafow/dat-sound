
const addSong = document.getElementById('add-sound')
const songTitle = document.getElementById('song-title')
const songTag = document.getElementById('song-tag')
const songFile = document.getElementById('song-file')
const reader = new FileReader()
var arch

reader.addEventListener('loadend', (blob) => {
  arch.writeFile('p2p-mix.mp3', reader.result, {encoding: 'binary'})
  console.log('after reading ', reader.result.toString())
})

addSong.addEventListener('click', (e) => {
  arch = DatArchive.create({
    title: 'p2p-mix',
    description: 'nice sounds'
  })

  console.log('create Dat')
})

function handleFile(files) {
  reader.readAsArrayBuffer(files[0])
}


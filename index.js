
const addSong = document.getElementById('add-sound')
const songTitle = document.getElementById('song-title')
const songTag = document.getElementById('song-tag')
const songFile = document.getElementById('song-file')
const reader = new FileReader()
var arch

reader.addEventListener('loadend', (blob) => {
  // arch.writeFile('~/Dat-Sounds/p2p-mix.mp3', blob, {encoding: 'binary'})
  console.log('written');
})

addSong.addEventListener('click', (e) => {
  arch = DatArchive.create({
    title: 'p2p-mix',
    description: 'nice sounds'
  })
  console.log('p2ppp')
})

function handleFile(obj) {

}


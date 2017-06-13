
const addSong = document.getElementById('add-song')
const songTitle = document.getElementById('song-title')
const songTag = document.getElementById('song-tag')

addSong.addEventListener('click', (e) => {
  var arch = DatArchive.create({
    title: songTitle.value || 'Untitled',
    description: songTag || ''
  })
  
})


const addSound = document.getElementById('add-sound')
const soundTitle = document.getElementById('sound-title')
const soundTag = document.getElementById('sound-tag')
const soundFile = document.getElementById('sound-file')
const reader = new FileReader()
var arch

reader.addEventListener('loadend', setupDat)
// document.addEventListener('DOMContentLoaded', makePlaylist)

async function setupDat(blob) {
  arch = await DatArchive.create({
    title: soundTitle.value || 'my dat sound',
    description: soundTag.value || 'my nice dat sounds'
  })

  await arch.writeFile(soundTitle.value, reader.result)
  arch.commit()
  makePlaylist(arch)
}

async function writeFileBlobXXX (blob) {
  console.log('after reading ', reader.result.toString())
}

async function handleFile(fileList) {
  reader.readAsArrayBuffer(fileList[0])
}

async function makePlaylist (archive) {
  var audioFiles = await archive.readdir('/')
  var playlist = document.getElementById('playlist')
  for (let a of audioFiles) {
    document.createElement('li')
  }
  return;
}

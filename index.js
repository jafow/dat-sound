/* global DatArchive, FileReader */
const soundTitle = document.getElementById('sound-title')
const soundTag = document.getElementById('sound-tag')
const addSoud = document.getElementById('add-sound')
const reader = new FileReader()
const yo = require('yo-yo')
var arch

reader.addEventListener('loadend', setupDat)
// document.addEventListener('DOMContentLoaded', makePlaylist)
addSoud.addEventListener('click', makePlaylist)

async function setupDat (blob) {
  arch = await DatArchive.create({
    title: soundTitle.value || 'my dat sound',
    description: soundTag.value || 'my nice dat sounds'
  })

  await arch.writeFile(soundTitle.value, reader.result)
  arch.commit()
  makePlaylist(arch)
}

async function handleFile (fileList) {
  reader.readAsArrayBuffer(fileList[0])
}

async function makePlaylist () {
  var audioFiles = await arch.readdir('/')
  // var audioFiles = await archive.readdir('/')
  var playlist = document.getElementById('playlist')
  return playlist.appendChild(list(audioFiles))
}

function addSoudHandler (e) {

}
function list (fileNames) {
  return yo`
      <div>
        <h3>List of Audio Files</h3>
          <ul>
            ${fileNames.map((file) => yo`<li class="playlist_files">${file}</li>`)}
          </ul>
      </div>
    `
}

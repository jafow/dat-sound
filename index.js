/* global DatArchive */
const yo = require('yo-yo')
const uploadElement = require('upload-element')
const createDat = document.getElementById('create-dat')
const filePicker = document.getElementById('file-picker')
const pickerTag = document.getElementById('file-picker-tag')
const playlistSection = document.getElementById('playlist')
const playlist = list([])

var arch

createDat.addEventListener('click', setupDat)
pickerTag.addEventListener('click', clickFilePicker)
document.addEventListener('DOMContentReady', popuplatePlaylist, {once: true})
async function setupDat () {
  arch = await DatArchive.create({
    title: '',
    description: ''
  })
}

async function addAudioFileToDat (err, file) {
  if (err) throw new Error(err)
  var fileName = cleanFileName(file[0].file.name)
  var buf = file[0].target.result
  debugger;
  await arch.writeFile(fileName, buf)
  arch.commit()
  makePlaylist(arch)
}

async function clickFilePicker (e) {
  if (e.target === filePicker) {
    e.stopPropagation()
    await uploadElement(filePicker, addAudioFileToDat)
  }
}

function cleanFileName (name) {
  // sanitize the file name according to
  // beaker web api
  return 'test' + String(Date.now())
}

async function makePlaylist (archive) {
  var audioFiles = await archive.readdir('/')
  console.log('updateing these audio files', audioFiles);
  yo.update(playlistSection, list(audioFiles)) // appendChild(list(audioFiles))
}

async function popuplatePlaylist () {
  if (typeof arch !== 'undefined') {
    var audioFiles = await arch.readdir('/')
    yo.update(playlistSection, list(audioFiles))
  } else {
    playlistSection.appendChild(playlist)
  }
}

function list (fileNames) {
  return yo`
        <div>
          <ul>
            ${fileNames.map((file) => yo`<li class="playlist_files"><div>${file}</div></li>`)}
          </ul>
        </div>
      `
}

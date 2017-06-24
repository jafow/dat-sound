/* global DatArchive, FileReader */
const soundTitle = document.getElementById('sound-title')
const soundTag = document.getElementById('sound-tag')
const reader = new FileReader()
const yo = require('yo-yo')
var arch

reader.addEventListener('loadend', setupDat)
// document.addEventListener('DOMContentLoaded', makePlaylist)

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

async function makePlaylist (archive) {
  var audioFiles = await archive.readdir('/')
  var playlist = document.getElementById('playlist')
  for (let a of audioFiles) {
    document.createElement('li')
  }
  return
}

import fs from "fs"

const baseDir = () => {
  if(process.env.SANDSTORM)
    return "/var"
  else if(process.env.VAGRANT)
    return `${process.env.HOME}/var`
  else
    return "./var"
}

export const dbDir = `${baseDir()}/db`

export const staticDir = `${baseDir()}/www`

if(!fs.existsSync(baseDir()))
  fs.mkdirSync(baseDir())

if(!fs.existsSync(dbDir))
  fs.mkdirSync(dbDir)

if(!fs.existsSync(staticDir))
  fs.mkdirSync(staticDir)

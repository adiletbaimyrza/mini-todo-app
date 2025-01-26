import { exec } from 'child_process'

const serveApplication = exec('npm run serve')

serveApplication.stdout.on('data', (data) => {
  console.log(data.toString())
})

serveApplication.stderr.on('data', (data) => {
  console.error(data.toString())
})

serveApplication.on('close', (code) => {
  console.log(`"npm run serve" exited with code ${code}`)
})

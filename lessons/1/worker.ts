import wt from 'worker_threads'

let result = []
let i = 0

function iLoop() {
  result = Array.from({ length: 1000 })
    .map((item) => 1)
    .filter((item) => Math.floor(item * Math.random() * 3) % 3 === 0)

  i++

  if (i < 50) {
      iLoop()
  } console.log(i)
}
iLoop()

if (wt.parentPort) {
   wt.parentPort.postMessage(String(result.length))
}


const memory = [];
const MAX_MEMORY = 10;

export function addMemory(entry) {
  memory.push({
    entry,
    ts: new Date().toISOString()
  });
  if (memory.length > MAX_MEMORY) {
    memory.shift();
  }
}

export function getMemory() {
  return [...memory];
}

export function clearMemory() {
  memory.length = 0;
}

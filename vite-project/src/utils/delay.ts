/**
 * Causes code execution to wait for a specified number of milliseconds
 * @param ms number of milliseconds to wait before executing new line
 * @returns promise that causes code execution to wait
 */
export default function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms))
}

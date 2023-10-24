import { IncomingMessage } from "http"
import { UAParser } from "ua-parser-js"

export const getUserAgent = () => new UAParser().getResult()

export default function isMobile(req: IncomingMessage) {
  let userAgent

  if (req) {
    // SSR request is present
    userAgent = UAParser(req.headers["user-agent"] || "")
  } else {
    userAgent = getUserAgent()
  }

  return userAgent?.device?.type === "mobile" || userAgent?.device?.type === "tablet"
}

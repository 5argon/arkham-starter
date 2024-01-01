import { createIntl, createIntlCache } from "react-intl"

const intlCache = createIntlCache()
const intl = createIntl({ locale: "en-US" }, intlCache)

export const t = intl.formatMessage

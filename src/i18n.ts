import { createI18n } from "vue-i18n";

import en from "@/locale/en";
import pl from "@/locale/pl";

export default createI18n({
  locale: "en",
  fallbackLocale: "en",
  legacy: false,
  messages: {
    en,
    pl,
  },
});

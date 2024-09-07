import { getContext, derived } from "svelte";

import { obsidianContext } from "../../constants";
import { settings } from "../../global-store/settings";
import type { ObsidianContext, UnscheduledTask } from "../../types";
import { getFirstLine } from "../../util/task-utils";

export function useColorOverride(task: UnscheduledTask) {
  const { isDarkMode } = getContext<ObsidianContext>(obsidianContext);

  return derived([settings, isDarkMode], ([$settings, $isDarkMode]) => {
    const colorOverride = $settings.colorOverrides.find((override) =>
      getFirstLine(task.text).includes(override.text),
    );

    if (colorOverride) {
      return $isDarkMode ? colorOverride?.darkModeColor : colorOverride?.color;
    }
  });
}

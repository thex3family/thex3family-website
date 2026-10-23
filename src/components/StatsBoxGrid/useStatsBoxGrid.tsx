import { useState } from "react"
import { useTranslation } from "next-i18next"

import type { MetricSection, StatsBoxMetric, StatsBoxState } from "@/lib/types"

import { RANGES } from "@/lib/constants"

import { RangeSelector } from "./RangeSelector"

// Real-time stats are not wired up yet, so each metric shows the figure the
// foundation publishes. Replace these with fetched values once a source exists.
const PUBLISHED_FIGURES: Record<MetricSection, StatsBoxState> = {
  totalImpact: { data: [], value: "100k+" },
  viewsToday: { data: [], value: "50k+" },
  downloadsToday: { data: [], value: "1k+" },
  activeMembers: { data: [], value: "500+" },
}

export const useStatsBoxGrid = (): StatsBoxMetric[] => {
  const { t } = useTranslation("page-index")

  const [selectedRanges, setSelectedRanges] = useState<
    Record<MetricSection, string>
  >({
    totalImpact: RANGES[0],
    viewsToday: RANGES[0],
    downloadsToday: RANGES[0],
    activeMembers: RANGES[0],
  })

  const metric = (
    key: MetricSection,
    position: 1 | 2 | 3 | 4,
    eventName: string
  ): StatsBoxMetric => ({
    title: t(`page-index-stats-${position}-title`),
    description: t(`page-index-stats-${position}-description`),
    buttonContainer: (
      <RangeSelector
        state={selectedRanges[key]}
        setState={(range: string) =>
          setSelectedRanges((prev) => ({ ...prev, [key]: range }))
        }
        matomo={{ eventCategory: "Stats", eventAction: "click", eventName }}
      />
    ),
    state: PUBLISHED_FIGURES[key],
    range: selectedRanges[key],
  })

  return [
    metric("totalImpact", 1, "total impact"),
    metric("viewsToday", 2, "views today"),
    metric("downloadsToday", 3, "downloads today"),
    metric("activeMembers", 4, "active members"),
  ]
}

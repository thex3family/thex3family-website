import { useTranslation } from "next-i18next"
import { Box, type BoxProps, Flex, useColorMode } from "@chakra-ui/react"
import Translation from "@/components/Translation"

import type { ChildOnlyProp } from "@/lib/types"

const Column = ({ children }: ChildOnlyProp) => (
  <Flex
    flexDirection="column-reverse"
    ms={{ base: 2, md: 4 }}
    _first={{ ms: 0 }}
  >
    {children}
  </Flex>
)

const Cell = ({ children, color, ...props }: BoxProps) => (
  <Box
    border="1px solid"
    borderColor={color || "text"}
    color={color || "text"}
    py="0.8rem"
    px={{ base: 2, md: "1.2rem" }}
    fontSize="0.9rem"
    fontWeight="bold"
    lineHeight="none"
    textAlign="center"
    _last={{
      borderTopStartRadius: "2xl",
      borderTopEndRadius: "2xl",
    }}
    sx={{
      "&:nth-child(-n + 2)": {
        borderBottomStartRadius: "2xl",
        borderBottomEndRadius: "2xl",
      },
    }}
    {...props}
  >
    {children}
  </Box>
)

const ColumnName = ({ children }: ChildOnlyProp) => (
  <Cell border="none" pt={6}>
    {children}
  </Cell>
)

const AdoptionChart = () => {
  const { t } = useTranslation("page-about-us")
  const { colorMode } = useColorMode()
  const isDark = colorMode === "dark"

  return (
    <Flex>
      <Column>
        <ColumnName>{t("page-about-us-history-chart-section-1-title")}</ColumnName>
        <Cell color={isDark ? "#FBF9A5" : "#95935B"}>
          {t("page-about-us-history-chart-card-1")}
        </Cell>
        <Cell color={isDark ? "#9EC885" : "#67954C"}>
          {t("page-about-us-history-chart-card-2")}
        </Cell>
        <Cell color={isDark ? "#E78F6E" : "#CB7C5E"}>
          {t("page-about-us-history-chart-card-3")}
        </Cell>
      </Column>

      <Column>
        <ColumnName>{t("page-about-us-history-chart-section-2-title")}</ColumnName>
        <Cell color={isDark ? "#FBF9A5" : "#95935B"}>
          {t("page-about-us-history-chart-card-1")}
        </Cell>
        <Cell color={isDark ? "#9EC885" : "#67954C"}>
          {t("page-about-us-history-chart-card-2")}
        </Cell>
        <Cell color={isDark ? "#E78F6E" : "#CB7C5E"}>
          {t("page-about-us-history-chart-card-3")}
        </Cell>
        <Cell color={isDark ? "#8EA8CA" : "#5E7492"}>
          {t("page-about-us-history-chart-card-4")}
        </Cell>
        <Cell color={isDark ? "#AC85C2" : "#88669B"}>
          {t("page-about-us-history-chart-card-5")}
        </Cell>
        <Cell color={isDark ? "#CA928E" : "#985955"}>
          {t("page-about-us-history-chart-card-6")}
        </Cell>
      </Column>

      <Column>
        <ColumnName>{t("page-about-us-history-chart-section-3-title")}</ColumnName>
        <Cell color={isDark ? "#FBF9A5" : "#95935B"}>
          {t("page-about-us-history-chart-card-1")}
        </Cell>
        <Cell color={isDark ? "#9EC885" : "#67954C"}>
          {t("page-about-us-history-chart-card-2")}
        </Cell>
        <Cell color={isDark ? "#E78F6E" : "#CB7C5E"}>
          {t("page-about-us-history-chart-card-3")}
        </Cell>
        <Cell color={isDark ? "#8EA8CA" : "#5E7492"}>
          {t("page-about-us-history-chart-card-4")}
        </Cell>
        <Cell color={isDark ? "#AC85C2" : "#88669B"}>
          {t("page-about-us-history-chart-card-5")}
        </Cell>
        <Cell color={isDark ? "#CA928E" : "#985955"}>
          {t("page-about-us-history-chart-card-6")}
        </Cell>
        <Cell color={isDark ? "#B9B9B9" : "#9E9E9E"}>
          {t("page-about-us-history-chart-card-7")}
        </Cell>
        <Cell color={isDark ? "#E2B79E" : "#E78A54"}>
          {t("page-about-us-history-chart-card-8")}
        </Cell>
      </Column>
    </Flex>
  )
}

export default AdoptionChart

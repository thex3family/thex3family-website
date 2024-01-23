// Libraries
import { useEffect, useState } from "react"
import { useTranslation } from "next-i18next"
import { Icon } from "@chakra-ui/react"

// Data
import frameworkFilterData from "../../../../data/framework/framework-filters"
import {
  BrowserIcon,
  BuyCryptoIcon,
  ConnectDappsIcon,
  DesktopIcon,
  EIP1559Icon,
  ENSSupportIcon,
  ERC20SupportIcon,
  GasFeeCustomizationIcon,
  HardwareIcon,
  HardwareSupportIcon,
  Layer2Icon,
  MobileIcon,
  MultisigIcon,
  NFTSupportIcon,
  NonCustodialIcon,
  OpenSourceWalletIcon,
  RPCImportingIcon,
  SocialRecoverIcon,
  StakingIcon,
  SwapIcon,
  WalletConnectIcon,
  WithdrawCryptoIcon,
} from "../../../icons/wallets"

import { FrameworkFilterFeatureProps } from "."

type FilterOptionType = {
  title: string
  items: Array<{
    title: string
    icon: typeof Icon
    description: string
    filterKey: string | undefined
    showOptions: boolean | undefined
    options:
      | Array<{
          name: string
          filterKey?: string
          inputType: "checkbox"
        }>
      | []
  }>
}

export const useFrameworkFilterFeature = ({
  resetFrameworkFilter,
  filters,
  updateFilterOptions,
}: Omit<FrameworkFilterFeatureProps, "updateFilterOption">) => {
  const { t } = useTranslation("page-frameworks-find-framework")
  const [filterOptions, setFilterOptions] = useState<FilterOptionType[]>([
    {
      title: t("page-find-framework-device"),
      items: [
        {
          title: t(frameworkFilterData.mobile.title),
          icon: MobileIcon,
          description: t(frameworkFilterData.mobile.description),
          filterKey: frameworkFilterData.mobile.filterKey,
          showOptions: filters.android || filters.ios ? true : false,
          options: [
            {
              name: t(frameworkFilterData.android.title),
              filterKey: frameworkFilterData.android.filterKey,
              inputType: "checkbox",
            },
            {
              name: t(frameworkFilterData.ios.title),
              filterKey: frameworkFilterData.ios.filterKey,
              inputType: "checkbox",
            },
          ],
        },
        {
          title: t(frameworkFilterData.desktop.title),
          icon: DesktopIcon,
          description: t(frameworkFilterData.desktop.description),
          filterKey: frameworkFilterData.desktop.filterKey,
          showOptions:
            filters.linux || filters.windows || filters.macOS ? true : false,
          options: [
            {
              name: t(frameworkFilterData.linux.title),
              filterKey: frameworkFilterData.linux.filterKey,
              inputType: "checkbox",
            },
            {
              name: t(frameworkFilterData.windows.title),
              filterKey: frameworkFilterData.windows.filterKey,
              inputType: "checkbox",
            },
            {
              name: t(frameworkFilterData.macos.title),
              filterKey: frameworkFilterData.macos.filterKey,
              inputType: "checkbox",
            },
          ],
        },
        {
          title: t(frameworkFilterData.browser.title),
          icon: BrowserIcon,
          description: t(frameworkFilterData.browser.description),
          filterKey: frameworkFilterData.browser.filterKey,
          showOptions: filters.firefox || filters.chrome ? true : false,
          options: [
            {
              name: t(frameworkFilterData.firefox.title),
              filterKey: frameworkFilterData.firefox.filterKey,
              inputType: "checkbox",
            },
            {
              name: t(frameworkFilterData.chromium.title),
              filterKey: frameworkFilterData.chromium.filterKey,
              inputType: "checkbox",
            },
          ],
        },
        {
          title: t(frameworkFilterData.hardware.title),
          icon: HardwareIcon,
          description: t(frameworkFilterData.hardware.description),
          filterKey: frameworkFilterData.hardware.filterKey,
          showOptions: undefined,
          options: [],
        },
      ],
    },
    {
      title: t("page-find-framework-security"),
      items: [
        {
          title: t(frameworkFilterData.open_source.title),
          icon: OpenSourceWalletIcon,
          description: t(frameworkFilterData.open_source.description),
          filterKey: frameworkFilterData.open_source.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(frameworkFilterData.non_custodial.title),
          icon: NonCustodialIcon,
          description: t(frameworkFilterData.non_custodial.description),
          filterKey: frameworkFilterData.non_custodial.filterKey,
          showOptions: undefined,
          options: [],
        },
      ],
    },
    {
      title: t("page-find-framework-features"),
      items: [
        {
          title: t(frameworkFilterData.hardware_support.title),
          icon: HardwareSupportIcon,
          description: t(frameworkFilterData.hardware_support.description),
          filterKey: frameworkFilterData.hardware_support.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(frameworkFilterData.walletconnect.title),
          icon: WalletConnectIcon,
          description: t(frameworkFilterData.walletconnect.description),
          filterKey: frameworkFilterData.walletconnect.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(frameworkFilterData.rpc_importing.title),
          icon: RPCImportingIcon,
          description: t(frameworkFilterData.rpc_importing.description),
          filterKey: frameworkFilterData.rpc_importing.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(frameworkFilterData.nft_support.title),
          icon: NFTSupportIcon,
          description: t(frameworkFilterData.nft_support.description),
          filterKey: frameworkFilterData.nft_support.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(frameworkFilterData.connect_to_dapps.title),
          icon: ConnectDappsIcon,
          description: t(frameworkFilterData.connect_to_dapps.description),
          filterKey: frameworkFilterData.connect_to_dapps.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(frameworkFilterData.staking.title),
          icon: StakingIcon,
          description: t(frameworkFilterData.staking.description),
          filterKey: frameworkFilterData.staking.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(frameworkFilterData.swaps.title),
          icon: SwapIcon,
          description: t(frameworkFilterData.swaps.description),
          filterKey: frameworkFilterData.swaps.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(frameworkFilterData.layer_2.title),
          icon: Layer2Icon,
          description: t(frameworkFilterData.layer_2.description),
          filterKey: frameworkFilterData.layer_2.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(frameworkFilterData.gas_fee_customization.title),
          icon: GasFeeCustomizationIcon,
          description: t(frameworkFilterData.gas_fee_customization.description),
          filterKey: frameworkFilterData.gas_fee_customization.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(frameworkFilterData.ens_support.title),
          icon: ENSSupportIcon,
          description: t(frameworkFilterData.ens_support.description),
          filterKey: frameworkFilterData.ens_support.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(frameworkFilterData.erc_20_support.title),
          icon: ERC20SupportIcon,
          description: t(frameworkFilterData.erc_20_support.description),
          filterKey: frameworkFilterData.erc_20_support.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(frameworkFilterData.eip_1559_support.title),
          icon: EIP1559Icon,
          description: t(frameworkFilterData.eip_1559_support.description),
          filterKey: frameworkFilterData.eip_1559_support.filterKey,
          showOptions: undefined,
          options: [],
        },
      ],
    },
    {
      title: `${t("page-find-framework-buy-crypto")} / ${t(
        "page-find-framework-sell-for-fiat"
      )}`,
      items: [
        {
          title: t(frameworkFilterData.buy_crypto.title),
          icon: BuyCryptoIcon,
          description: t(frameworkFilterData.buy_crypto.description),
          filterKey: frameworkFilterData.buy_crypto.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(frameworkFilterData.withdraw_crypto.title),
          icon: WithdrawCryptoIcon,
          description: t(frameworkFilterData.withdraw_crypto.description),
          filterKey: frameworkFilterData.withdraw_crypto.filterKey,
          showOptions: undefined,
          options: [],
        },
      ],
    },
    {
      title: t("page-find-framework-smart-contract"),
      items: [
        {
          title: t(frameworkFilterData.multisig.title),
          icon: MultisigIcon,
          description: t(frameworkFilterData.multisig.description),
          filterKey: frameworkFilterData.multisig.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(frameworkFilterData.social_recovery.title),
          icon: SocialRecoverIcon,
          description: t(frameworkFilterData.social_recovery.description),
          filterKey: frameworkFilterData.social_recovery.filterKey,
          showOptions: undefined,
          options: [],
        },
      ],
    },
  ])

  const setShowOptions = (idx, itemidx, value) => {
    const updatedFilterOptions = [...filterOptions]
    updatedFilterOptions[idx].items[itemidx].showOptions =
      !updatedFilterOptions[idx].items[itemidx].showOptions
    setFilterOptions(updatedFilterOptions)

    const keys = updatedFilterOptions[idx].items[itemidx].options.map(
      (item) => item.filterKey
    )
    updateFilterOptions(keys, value)
  }

  useEffect(() => {
    const resetFilters = () => {
      for (let filterItem of filterOptions) {
        for (let item of filterItem.items) {
          if (item.options.length > 0) {
            item.showOptions = false
          } else {
            item.showOptions = undefined
          }
        }
      }
    }
    resetFrameworkFilter.current = resetFilters
  }, [filterOptions, resetFrameworkFilter])

  return {
    setShowOptions,
    filterOptions,
  }
}

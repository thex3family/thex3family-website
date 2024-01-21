import * as React from "react"
import { Center, Flex, SimpleGrid, VStack } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import { HomeIcon } from "./HomeIcon"
import { FeedbackGlyphIcon } from "./FeedbackGlyphIcon"
import { FeedbackThumbsUpIcon } from "./FeedbackThumbsUpIcon"
import { HighlightDarkIcon } from "./HighlightDarkIcon"
import { HighlightIcon } from "./HighlightIcon"
import {
  CorrectIcon,
  IncorrectIcon,
  StarConfettiIcon,
  TrophyIcon,
} from "./quiz"
import {
  DappnodeIcon,
  DecentralizationEthGlyphIcon,
  DecentralizationGlyphIcon,
  DownloadGlyphIcon,
  EarthGlyphIcon,
  HardwareGlyphIcon,
  MegaphoneGlyphIcon,
  PrivacyGlyphIcon,
  SovereigntyGlyphIcon,
  VoteGlyphIcon,
} from "./run-a-node"
import {
  AbyssGlyphIcon,
  AllnodesGlyphIcon,
  AnkrGlyphIcon,
  AuditedIcon,
  AvadoGlyphIcon,
  BattleTestedIcon,
  BloxstakingGlyphIcon,
  BugBountyIcon,
  CautionProductGlyphIcon,
  DefaultOpenSourceGlyphIcon,
  DockerGlyphIcon,
  EconomicalIcon,
  EthpoolGlyphIcon,
  GreenCheckProductGlyphIcon,
  KilnGlyphIcon,
  LidoGlyphIcon,
  LiquidityTokenIcon,
  MultiClientIcon,
  OpenSourceStakingIcon,
  P2PGlyphIcon,
  PermissionlessIcon,
  RocketPoolGlyphIcon,
  RockXGlyphIcon,
  SelfCustodyIcon,
  StafiGlyphIcon,
  StakefishGlyphIcon,
  StakewiseGlyphIcon,
  StakingDappnodeGlyphIcon,
  StakingGlyphCentralizedIcon,
  StakingGlyphCloudIcon,
  StakingGlyphCPUIcon,
  StakingGlyphEtherCircleIcon,
  StakingGlyphTokenWalletIcon,
  StereumGlyphIcon,
  TrustlessIcon,
  UnknownProductGlyphIcon,
  WagyuGlyphIcon,
  WarningProductGlyphIcon,
} from "./staking"
import {
  BrowserIcon,
  BuyCryptoIcon,
  ConnectDappsIcon,
  DesktopIcon,
  EIP1559Icon,
  ENSSupportIcon,
  ERC20SupportIcon,
  FilterBurgerIcon,
  FrameIcon,
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
} from "./wallets"

export default {
  title: "Atoms / Media & Icons / Icons",
  component: VStack,
} satisfies Meta<typeof VStack>

const iconsDefinitions = [
  CorrectIcon,
  IncorrectIcon,
  StarConfettiIcon,
  TrophyIcon,
  DappnodeIcon,
  DecentralizationGlyphIcon,
  DecentralizationEthGlyphIcon,
  DownloadGlyphIcon,
  EarthGlyphIcon,
  HardwareGlyphIcon,
  MegaphoneGlyphIcon,
  PrivacyGlyphIcon,
  SovereigntyGlyphIcon,
  VoteGlyphIcon,
  AbyssGlyphIcon,
  AllnodesGlyphIcon,
  AnkrGlyphIcon,
  AuditedIcon,
  AvadoGlyphIcon,
  BattleTestedIcon,
  BloxstakingGlyphIcon,
  BugBountyIcon,
  CautionProductGlyphIcon,
  StakingDappnodeGlyphIcon,
  DefaultOpenSourceGlyphIcon,
  DockerGlyphIcon,
  EconomicalIcon,
  EthpoolGlyphIcon,
  GreenCheckProductGlyphIcon,
  P2PGlyphIcon,
  KilnGlyphIcon,
  LidoGlyphIcon,
  LiquidityTokenIcon,
  MultiClientIcon,
  OpenSourceStakingIcon,
  PermissionlessIcon,
  RocketPoolGlyphIcon,
  RockXGlyphIcon,
  SelfCustodyIcon,
  StafiGlyphIcon,
  StakefishGlyphIcon,
  StakewiseGlyphIcon,
  StakingGlyphCentralizedIcon,
  StakingGlyphCloudIcon,
  StakingGlyphCPUIcon,
  StakingGlyphEtherCircleIcon,
  StakingGlyphTokenWalletIcon,
  StereumGlyphIcon,
  TrustlessIcon,
  UnknownProductGlyphIcon,
  WagyuGlyphIcon,
  WarningProductGlyphIcon,
  BrowserIcon,
  BuyCryptoIcon,
  ConnectDappsIcon,
  DesktopIcon,
  EIP1559Icon,
  ENSSupportIcon,
  ERC20SupportIcon,
  FilterBurgerIcon,
  FrameIcon,
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
  HomeIcon,
  FeedbackGlyphIcon,
  FeedbackThumbsUpIcon,
  HighlightDarkIcon,
  HighlightIcon,
]

iconsDefinitions.sort((a, b) =>
  (a?.displayName || "") > (b?.displayName || "") ? 1 : -1
)
const items = iconsDefinitions.map((IconDef) => (
  <Flex
    key={IconDef.displayName}
    direction="column"
    gap={4}
    p={4}
    border="1px"
    borderStyle="solid"
    borderColor="background.highlight"
  >
    <Center>
      <IconDef w="50px" h="50px" />
    </Center>
    <Center>{IconDef.displayName}</Center>
  </Flex>
))

export const Icons: StoryObj<typeof VStack> = {
  render: () => {
    return <SimpleGrid columns={[2, 2, 3, 5]}>{items}</SimpleGrid>
  },
}

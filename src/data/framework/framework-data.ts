import { StaticImageData } from "next/image"

import OneInchWalletImage from "@/public/wallets/1inch.png"
import AirgapImage from "@/public/wallets/airgap.png"
import AktionariatImage from "@/public/wallets/aktionariat.png"
import AlphaWalletImage from "@/public/wallets/alpha.png"
import AmbireImage from "@/public/wallets/ambire.png"
import ApexImage from "@/public/wallets/apex.png"
import ArgentImage from "@/public/wallets/argent.png"
import BitcoindotcomImage from "@/public/wallets/bitcoindotcom.png"
import BitkeepImage from "@/public/wallets/bitkeep.png"
import BlockWalletImage from "@/public/wallets/blockwallet.png"
import BraveImage from "@/public/wallets/brave.png"
import BridgeWalletImage from "@/public/wallets/bridge.png"
import Coin98Image from "@/public/wallets/coin98.png"
import CoinbaseImage from "@/public/wallets/coinbase.png"
import CoinwalletImage from "@/public/wallets/coinwallet.png"
import EnkryptImage from "@/public/wallets/enkrypt.png"
import ExodusImage from "@/public/wallets/exodus.png"
import FoxWalletImage from "@/public/wallets/foxwallet.png"
import FrameImage from "@/public/wallets/frame.png"
import GridPlusImage from "@/public/wallets/gridplus.png"
import GuardaImage from "@/public/wallets/guarda.png"
import imTokenImage from "@/public/wallets/imtoken.png"
import InfinityWalletImage from "@/public/wallets/infinity_wallet.png"
import KeystoneImage from "@/public/wallets/keystone.png"
import LedgerImage from "@/public/wallets/ledger.png"
import LoopringImage from "@/public/wallets/loopring.png"
import MetaMaskImage from "@/public/wallets/metamask.png"
import MewImage from "@/public/wallets/mew.png"
import MyCryptoImage from "@/public/wallets/mycrypto.png"
import MyEtherWalletImage from "@/public/wallets/myetherwallet.png"
import NumioImage from "@/public/wallets/numio.png"
import OKXImage from "@/public/wallets/okx.jpeg"
import OneKeyImage from "@/public/wallets/onekey.png"
import OperaImage from "@/public/wallets/opera.png"
import PhantomImage from "@/public/wallets/phantom.png"
import PillarImage from "@/public/wallets/pillar.png"
import PortisImage from "@/public/wallets/portis.png"
import RabbyWalletImage from "@/public/wallets/rabbywallet.png"
import RainbowImage from "@/public/wallets/rainbow.png"
import SafeImage from "@/public/wallets/safe.png"
import SequenceImage from "@/public/wallets/sequence.png"
import ShapeShiftImage from "@/public/wallets/shapeshift.png"
import StatusImage from "@/public/wallets/status.png"
import TahoImage from "@/public/wallets/taho.png"
import TokenPocketImage from "@/public/wallets/tokenpocket.png"
import TorusImage from "@/public/wallets/torus.png"
import TrezorImage from "@/public/wallets/trezor.png"
import UnstoppableWalletImage from "@/public/wallets/unstoppable.png"
import Web3AuthImage from "@/public/wallets/web3auth.png"
import XDEFIImage from "@/public/wallets/xdefi.png"
import ZengoImage from "@/public/wallets/zengo.png"
import ZerionImage from "@/public/wallets/zerion.png"

export interface FrameworkData {
  last_updated: string
  name: string
  image: StaticImageData
  brand_color: string
  url: string
  wallet_live_date: string
  active_development_team: boolean
  languages_supported: string[]
  twitter: string
  discord: string
  reddit: string
  telegram: string
  ios: boolean
  android: boolean
  linux: boolean
  windows: boolean
  macOS: boolean
  firefox: boolean
  chromium: boolean
  hardware: boolean
  open_source: boolean
  repo_url: string
  non_custodial: boolean
  security_audit: string[]
  scam_protection: boolean
  hardware_support: boolean
  walletconnect: boolean
  rpc_importing: boolean
  nft_support: boolean
  connect_to_dapps: boolean
  staking: boolean
  swaps: boolean
  multichain?: boolean
  layer_2: boolean
  gas_fee_customization: boolean
  ens_support: boolean
  erc_20_support: boolean
  eip_1559_support: boolean
  buy_crypto: boolean
  withdraw_crypto: boolean
  multisig: boolean
  social_recovery: boolean
  onboard_documentation: string
  documentation: string
  mpc?: boolean
}

const frameworkData: FrameworkData[] = [
  {
    last_updated: "June 22, 2022",
    name: "Keystone",
    image: KeystoneImage,
    brand_color: "#ffffff",
    url: "https://keyst.one/",
    wallet_live_date: "Dec 2018",
    active_development_team: true,
    languages_supported: ["en", "zh", "es", "ko"],
    twitter: "https://twitter.com/KeystoneWallet",
    discord: "https://keyst.one/discord",
    reddit: "",
    telegram: "https://t.me/KeystoneWallet",
    ios: true,
    android: true,
    linux: false,
    windows: false,
    macOS: false,
    firefox: false,
    chromium: false,
    hardware: true,
    open_source: true,
    repo_url: "https://github.com/KeystoneHQ",
    non_custodial: true,
    security_audit: [
      "https://github.com/KeystoneHQ/Keystone-developer-hub/tree/main/audit-report",
      "https://keyst.one/bug-bounty-program",
    ],
    scam_protection: false,
    hardware_support: true,
    walletconnect: false,
    rpc_importing: false,
    nft_support: true,
    connect_to_dapps: true,
    staking: false,
    swaps: false,
    layer_2: true,
    gas_fee_customization: false,
    ens_support: true,
    erc_20_support: false,
    eip_1559_support: true,
    buy_crypto: false,
    withdraw_crypto: false,
    multisig: false,
    social_recovery: false,
    onboard_documentation: "https://support.keyst.one/",
    documentation: "",
  },
  {
    last_updated: "2023-08-29",
    name: "XDEFI Wallet",
    image: XDEFIImage,
    brand_color: "#2041E0",
    url: "https://www.xdefi.io",
    wallet_live_date: "2021-10-12",
    active_development_team: true,
    languages_supported: ["en", "fr", "de", "ru"],
    twitter: "https://twitter.com/xdefi_wallet",
    discord: "https://discord.gg/xdefiwallet",
    reddit: "",
    telegram: "https://t.me/xdefi_announcements",
    ios: false,
    android: false,
    linux: false,
    windows: false,
    macOS: false,
    firefox: false,
    chromium: true,
    hardware: false,
    open_source: false,
    repo_url: "https://github.com/XDeFi-tech",
    non_custodial: true,
    security_audit: [
      "https://www.xdefi.io/wp-content/uploads/2021/07/XDEFI_Audit_Report_Kudelski.pdf",
    ],
    scam_protection: false,
    hardware_support: true,
    walletconnect: true,
    rpc_importing: true,
    nft_support: true,
    connect_to_dapps: true,
    staking: false,
    swaps: true,
    multichain: true,
    layer_2: true,
    gas_fee_customization: true,
    ens_support: true,
    erc_20_support: true,
    eip_1559_support: true,
    buy_crypto: true,
    withdraw_crypto: false,
    multisig: false,
    social_recovery: false,
    onboard_documentation: "https://www.xdefi.io/support/",
    documentation:
      "https://docs.xdefi.io/xdefi-wallet-v2-draft/technical-docs/extension-integration",
  },
]

export default frameworkData
